import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

export default function index({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) {
  return (
    <Box
      style={{
        width: "100%",
        height: "h-screen",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 545, padding: 5 }}>
        <CardMedia
          component="img"
          height="100"
          style={{ objectFit: "contain" }}
          image="https://res.cloudinary.com/dyv6txxmc/image/upload/v1695046060/logo-orig_ktcl3k.png"
          alt="LOGO"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            style={{ textAlign: "center" }}
          >
            ROYAL VIEW HOTEL DASHBOARD
          </Typography>

          <Box paddingTop={2}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box paddingTop={2}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box paddingTop={2}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2b869b",
                color: "white",
                width: "100%",
              }}
              onClick={() => handleLogin()}
            >
              SUBMIT
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
