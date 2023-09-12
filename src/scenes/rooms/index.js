import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { roomData } from "../../data/hotelData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rooms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [roomDatas, setRoomDatas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/room/")
      .then((result) => {
        setRoomDatas(result?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "roomName", headerName: "Room Name", flex: 1 },
    {
      field: "roomSize",
      headerName: "Room Size",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "roomPrice",
      headerName: "Room Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Link
              to={`/room-details/${_id}`}
              style={{ color: "white" }}
              sx={{ ml: "5px" }}
            >
              View Room
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="ROOMS" subtitle="List of Rooms in Royal View Hotel" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={roomDatas}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Rooms;
