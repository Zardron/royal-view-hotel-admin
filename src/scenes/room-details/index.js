import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import BounceLoader from "react-spinners/BounceLoader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.success,
}));

const RoomDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  console.log(loading);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/room/room-details/${id}`)
      .then((result) => {
        setData(result.data);
      });
  }, [id]);

  const refreshData = () => {
    axios
      .get(`http://localhost:5000/api/room/room-details/${id}`)
      .then((result) => {
        setData(result.data);
      });
  };

  const [multipleFiles, setMultipleFiles] = useState("");

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("images", multipleFiles[i]);
    }

    setLoading(true);

    const uploadImg = await axios.put(
      `http://localhost:5000/api/room/upload/${id}`,
      formData
    );

    if (uploadImg) {
      refreshData();
      setLoading(false);
    }
  };
  return (
    <Box m="10px">
      <Header title="ROOM DETAILS" subtitle="Manage your Room Details" />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingBottom={2}
      >
        <Grid item xs={6}>
          <Card style={{ maxHeight: 500, overflowY: "auto" }}>
            {loading ? (
              <Card
                style={{
                  height: 200,
                  overflowY: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BounceLoader color="#36d7b7" />
              </Card>
            ) : data?.images?.length === 0 ? (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingBottom={2}
                padding={2}
              >
                <Grid item xs={12}>
                  <Item>No Photos yet</Item>
                </Grid>
              </Grid>
            ) : (
              <ImageList
                sx={{ width: "100%", height: 450 }}
                cols={3}
                rowHeight={"auto"}
                style={{
                  maxHeight: 200,
                  overflowY: "auto",
                  paddingLeft: "18px",
                }}
              >
                {data?.images?.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading="lazy"
                      alt="images"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                paddingBottom={2}
              >
                {data?.roomName}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                Overview:
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingBottom={2}
              >
                {data?.roomDetails?.map((item) => (
                  <Grid item xs={3}>
                    <Item>{item.name}</Item>
                  </Grid>
                ))}
              </Grid>

              <Typography gutterBottom variant="h5" component="div">
                Room Size: {data?.roomSize} m<sup>2</sup>
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
                paddingBottom={2}
              >
                {data?.description}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                View:
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingBottom={2}
              >
                {data?.view?.map((item) => (
                  <Grid item xs={3}>
                    <Item>{item.name}</Item>
                  </Grid>
                ))}
              </Grid>

              <Typography gutterBottom variant="h5" component="div">
                in Bathroom:
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingBottom={2}
              >
                {data?.inBathroom?.map((item) => (
                  <Grid item xs={6}>
                    <Item>{item.name}</Item>
                  </Grid>
                ))}
              </Grid>

              <Typography gutterBottom variant="h5" component="div">
                Room Facilities:
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingBottom={2}
              >
                {data?.facilities?.map((item) => (
                  <>
                    <Grid item xs={6}>
                      <Item>{item.name}</Item>
                    </Grid>
                  </>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Box style={{ maxHeight: 500, overflowY: "auto" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
                gap: "10px",
              }}
            >
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                label="upload images"
                multiple
                style={{
                  width: "50%",
                }}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Upload Now
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Add Overview"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit Overview
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Add Room Size"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit Room Size
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Add Description"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit Description
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Add View"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit View
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Add Facilities"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit Facilities
              </Button>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid white",
                paddingHorizontal: "4px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <TextField
                label="Update Price"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => UploadMultipleFiles()}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDetails;
