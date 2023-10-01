import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Switch,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.success,
}));

const RoomDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://rvh-backend.vercel.app/api/room/room-details/${id}`)
      .then((result) => {
        setData(result.data);
      });
  }, [id]);

  const refreshData = () => {
    axios
      .get(`https://rvh-backend.vercel.app/api/room/room-details/${id}`)
      .then((result) => {
        setData(result.data);
      });
  };

  const [imgUrl, setImageUrl] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const UploadMultipleFiles = () => {
    setLoading(true);

    axios
      .put(`https://rvh-backend.vercel.app/api/room/upload/${id}`, {
        photos: imgUrl,
      })
      .then((success) => {
        if (success) {
          setImageUrl("");
          refreshData();
          setLoading(false);
          toast.success("Image Successfully Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        setImageUrl("");
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
        setLoading(false);
      });
  };

  // const UploadMultipleFiles = async () => {
  //   const formData = new FormData();
  //   for (let i = 0; i < multipleFiles.length; i++) {
  //     formData.append("images", multipleFiles[i]);
  //   }

  //   setLoading(true);

  //   const uploadImg = await axios.put(
  //     `https://rvh-backend.vercel.app/api/room/upload/${id}`,
  //     formData
  //   );

  //   if (uploadImg) {
  //     refreshData();
  //     setLoading(false);
  //   }
  // };

  // const localUrl = "https://rvh-backend.vercel.app/api/room/";
  const prodUrl = "https://rvh-backend.vercel.app/api/room";

  // Adding Room Details
  const [details, setDetails] = useState("");

  const handleRoomDetails = () => {
    if (details === "") {
      toast.error("Please Add Overview", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/details/${id}`, {
          name: details,
        })
        .then((result) => {
          if (result) {
            toast.success("Overview Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Adding Room Size
  const [roomsize, setRoomSize] = useState("");

  const handleRoomSize = () => {
    if (roomsize === "") {
      toast.error("Please Add Room Size", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/room-size/${id}`, {
          name: roomsize,
        })
        .then((result) => {
          if (result) {
            toast.success("Room Size Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Adding Room Description
  const [roomDescription, setRoomDescription] = useState("");

  const handleRoomDescription = () => {
    if (roomDescription === "") {
      toast.error("Please Add Description", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/description/${id}`, {
          data: roomDescription,
        })
        .then((result) => {
          if (result) {
            toast.success("Description Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Adding Room View
  const [roomView, setRoomView] = useState("");

  const handleRoomView = () => {
    if (roomView === "") {
      toast.error("Please Add View", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/view/${id}`, {
          data: roomView,
        })
        .then((result) => {
          if (result) {
            toast.success("View Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Adding Room in Bathroom
  const [inbathroom, setInBathroom] = useState("");

  const handleInBathroom = () => {
    if (inbathroom === "") {
      toast.error("Please Add in Bathroom", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/bathroom/${id}`, {
          name: inbathroom,
        })
        .then((result) => {
          if (result) {
            toast.success("In Bathroom Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Adding Room Facilities
  const [roomFacilities, setRoomFacilities] = useState("");

  const handleFacilities = () => {
    if (roomFacilities === "") {
      toast.error("Please Add Facilities", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/facilities/${id}`, {
          name: roomFacilities,
        })
        .then((result) => {
          if (result) {
            toast.success("Facilities Successfully Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Update Room Price
  const [roomprice, setRoomPrice] = useState("");

  const handleRoomPrice = () => {
    if (roomprice === "") {
      toast.error("Please Add Room Price", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .put(`${prodUrl}/room-price/${id}`, {
          name: roomprice,
        })
        .then((result) => {
          if (result) {
            toast.success("Room Price Successfully Updated", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setData(result.data);
          }
        });
    }
  };

  // Delete Images
  const handleDeleteImg = (url) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/delete-image/${id}`, {
        url: url,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
  };

  // delete overview
  const handleDeleteOverview = (name) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/delete-overview/${id}`, {
        name: name,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
  };

  // delete view
  const handleDeleteView = (name) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/delete-view/${id}`, {
        name: name,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
  };

  // delete bathroom
  const handleDeleteBathroom = (name) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/delete-bathroom/${id}`, {
        name: name,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
  };

  // delete bathroom
  const handleDeleteFacilities = (name) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/delete-facilities/${id}`, {
        name: name,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
  };

  const handleAvailability = (availability) => {
    axios
      .put(`https://rvh-backend.vercel.app/api/room/room-availability/${id}`, {
        availability: availability,
      })
      .then((success) => {
        toast.success(success.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refreshData();
      });
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
                  <>
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        loading="lazy"
                        alt="images"
                      />
                      <button
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          fontWeight: "bold",
                          backgroundColor: "red",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteImg(item.url)}
                      >
                        x
                      </button>
                    </ImageListItem>
                  </>
                ))}
              </ImageList>
            )}

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                paddingBottom={2}
                alignItems="center"
                display={"flex"}
                gap={2}
              >
                {data?.roomName}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                paddingBottom={1}
                alignItems="center"
                display={"flex"}
                gap={2}
              >
                Room Availability:
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    backgroundColor={`${data?.isAvailable ? "green" : "gray"}`}
                    paddingLeft={1}
                    paddingRight={1}
                    borderRadius={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAvailability(true)}
                  >
                    Available
                  </Typography>

                  <Typography
                    backgroundColor={`${data?.isAvailable ? "gray" : "red"}`}
                    paddingLeft={1}
                    paddingRight={1}
                    borderRadius={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAvailability(false)}
                  >
                    Not Available
                  </Typography>
                </Stack>
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  display: "flex",
                  flex: "1",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                Room Price (Per Night):
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ margin: "0px", marginLeft: "10px" }}
                >
                  {data?.roomPrice}.00 AED
                </Typography>
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
                  <Grid item xs={4}>
                    <Item
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.name}{" "}
                      <button
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "red",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteOverview(item.name)}
                      >
                        x
                      </button>
                    </Item>
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
                  <Grid item xs={4}>
                    <Item
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.name}{" "}
                      <button
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "red",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteView(item.name)}
                      >
                        x
                      </button>
                    </Item>
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
                    <Item
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.name}{" "}
                      <button
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "red",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteBathroom(item.name)}
                      >
                        x
                      </button>
                    </Item>
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
                      <Item
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.name}{" "}
                        <button
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "red",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteFacilities(item.name)}
                        >
                          x
                        </button>
                      </Item>
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
              <TextField
                label="Add Image Url"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
                value={imgUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={() => handleRoomDetails()}
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
                value={roomsize}
                onChange={(e) => setRoomSize(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleRoomSize(e.target.value)}
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
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleRoomDescription(e.target.value)}
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
                value={roomView}
                onChange={(e) => setRoomView(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleRoomView(e.target.value)}
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
                label="Add in Bathroom"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
                value={inbathroom}
                onChange={(e) => setInBathroom(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleInBathroom(e.target.value)}
              >
                Submit Bathroom
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
                value={roomFacilities}
                onChange={(e) => setRoomFacilities(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleFacilities(e.target.value)}
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
                label="Update Price (Per Night in AED)"
                style={{
                  width: "50%",
                }}
                color="success"
                focused
                value={roomprice}
                onChange={(e) => setRoomPrice(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#262b32",
                  color: "white",
                  width: "50%",
                  height: "53px",
                }}
                onClick={(e) => handleRoomPrice(e.target.value)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default RoomDetails;
