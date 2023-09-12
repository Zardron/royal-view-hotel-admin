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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RoomDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/room/room-details/${id}`)
      .then((result) => {
        setData(result.data);
      });
  }, [id]);
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
          <Card style={{ maxHeight: 465, overflowY: "auto" }}>
            {data?.images?.length === 0 ? (
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
                sx={{ width: 500, height: 450 }}
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
                <Grid item xs={3}>
                  <Item>
                    25 m<sup>2</sup>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>Lake View</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>Mountain View</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>City View</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>Air Condition</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>Flatscreen TV</Item>
                </Grid>{" "}
                <Grid item xs={3}>
                  <Item>Minibar</Item>
                </Grid>
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
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              Add Photos:
            </Typography>
            <input type="file" multiple />

            <TextField
              label="Add Overview"
              style={{
                width: "100%",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              color="secondary"
              focused
            />

            <TextField
              label="Add Room Size"
              style={{ width: "100%", marginBottom: "20px" }}
              color="secondary"
              focused
            />

            <TextField
              label="Add Description"
              style={{ width: "100%", marginBottom: "20px" }}
              color="secondary"
              focused
            />

            <TextField
              label="Add View"
              style={{ width: "100%", marginBottom: "20px" }}
              color="secondary"
              focused
            />

            <TextField
              label="Add Facilities"
              style={{ width: "100%", marginBottom: "20px" }}
              color="secondary"
              focused
            />

            <Button
              type="submit"
              style={{
                backgroundColor: "#4cceac",
                color: "white",
                width: "100%",
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDetails;
