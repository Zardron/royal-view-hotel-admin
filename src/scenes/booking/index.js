import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCloseIcon } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Booking = ({ userData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bookingData, setBookingData] = useState([]);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (bookingRef) => {
    axios
      .post("https://rvh-backend.vercel.app/api/room/booking-details", {
        bookingRef: bookingRef,
      })
      .then((res) => setData(res.data));
    setOpen(true);
  };

  const columns = [
    { field: "bookingRef", flex: 1, headerName: "Booking Reference" },
    {
      field: "roomName",
      headerName: "Room Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "checkInDate",
      headerName: "CheckIn Date",
      flex: 1,
    },
    {
      field: "checkOutDate",
      headerName: "CheckOut Date",
      flex: 1,
    },
    {
      field: "lengthOfStay",
      headerName: "Length of Stay",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
    },
    {
      field: "fullname",
      headerName: "Booked By",
      flex: 1,
      valueGetter: (params) => params?.row?.customerDetails[0]?.fullname,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { bookingRef } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button
              onClick={() => handleOpen(bookingRef)}
              style={{ color: "white", backgroundColor: "#2b869b" }}
            >
              View Details
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get("https://rvh-backend.vercel.app/api/room/all-bookings")
      .then((result) => {
        setBookingData(
          result?.data?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box m="20px">
      <Header title="BOOKINGS" subtitle="List of all Bookings" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          checkboxSelection
          rows={bookingData}
          columns={columns}
        />
      </Box>

      {userData?.userData?.roles === "manager" ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid gray",
                  paddingBottom: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Booking Details
                </Typography>
                <Typography
                  id="modal-modal-description"
                  color="red"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose()}
                >
                  <GridCloseIcon />
                </Typography>
              </div>

              <Typography
                id="modal-modal-title"
                variant="h3"
                component="h2"
                paddingTop={1}
                textAlign={"center"}
                style={{ textDecoration: "underline", fontWeight: "900" }}
              >
                {data.bookingRef}
              </Typography>
              {/* _______________________________ */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  CheckIn Date:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.checkInDate}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  CheckOut Date:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.checkOutDate}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Length of Stay:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.lengthOfStay}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Adult/s:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.adults}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Children/s:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.childrens}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderBottom: "1px solid gray",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ fontWeight: "900" }}
                >
                  Customer Details
                </Typography>
              </div>

              {data?.customerDetails?.map((cd, index) => (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Full Name:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.fullname}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Address:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.address}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Contact #:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.contactNumber}
                    </Typography>
                  </div>
                </>
              ))}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderBottom: "1px solid gray",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ fontWeight: "900" }}
                >
                  Card Details
                </Typography>
              </div>

              {data?.cardDetails?.map((cd, index) => (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Card No.:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.cardNo}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Card Expiry:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.cardExpiry}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      CVV:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.cardCVV}
                    </Typography>
                  </div>
                </>
              ))}
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid gray",
                  paddingBottom: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Booking Details
                </Typography>
                <Typography
                  id="modal-modal-description"
                  color="red"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose()}
                >
                  <GridCloseIcon />
                </Typography>
              </div>

              <Typography
                id="modal-modal-title"
                variant="h3"
                component="h2"
                paddingTop={1}
                textAlign={"center"}
                style={{ textDecoration: "underline", fontWeight: "900" }}
              >
                {data.bookingRef}
              </Typography>
              {/* _______________________________ */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  CheckIn Date:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.checkInDate}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  CheckOut Date:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.checkOutDate}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Length of Stay:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.lengthOfStay}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Adult/s:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.adults}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Children/s:
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {data.childrens}
                </Typography>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderBottom: "1px solid gray",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{ fontWeight: "900" }}
                >
                  Customer Details
                </Typography>
              </div>

              {data?.customerDetails?.map((cd, index) => (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Full Name:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.fullname}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Address:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.address}
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Contact #:
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      {cd.contactNumber}
                    </Typography>
                  </div>
                </>
              ))}
            </Box>
          </Modal>
        </div>
      )}
    </Box>
  );
};

export default Booking;
