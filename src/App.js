import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Booking from "./scenes/booking";
import Rooms from "./scenes/rooms";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import RoomDetails from "./scenes/room-details";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import axios from "axios";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Login
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLogin = async () => {
    await axios
      .post("https://rvh-backend.vercel.app/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        setUserData(res.data);
        if (res.data.token !== "") {
          localStorage.setItem("token", res?.data?.token);
          setLoggedIn(true);
          navigate("/dashboard");
        }
      });
  };

  const props = { email, setEmail, password, setPassword, handleLogin };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loggedIn ? (
            <>
              <Sidebar
                isSidebar={isSidebar}
                navigate={navigate}
                userData={userData}
              />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route
                    path="/dashboard"
                    element={<Dashboard userData={userData} />}
                  />
                  <Route path="/team" element={<Team />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route
                    path="/booking"
                    element={<Booking userData={userData} />}
                  />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/room-details/:id" element={<RoomDetails />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Login {...props} />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
