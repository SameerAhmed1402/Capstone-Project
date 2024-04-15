import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Home/Home";
import Signup from "./Components/Signup/Form";
import Adminlogin from "./Components/Admin/Auth/Login";
import Viewdiet from "./Components/Admin/Diet/Viewdiet";
import Adddiet from "./Components/Admin/Diet/Adddiet";
import Editdiet from "./Components/Admin/Diet/Editdiet";
import Viewworkout from "./Components/Admin/Workout/Viewworkout";
import Editworkout from "./Components/Admin/Workout/Editworkout";
import Addworkout from "./Components/Admin/Workout/Addworkout";
import Viewusers from "./Components/Admin/Users/Viewusers";
import Home from "./Components/User/Home";
import Userdiet from "./Components/User/Viewdiet";
import Userworkout from "./Components/User/Viewworkout";
import Profile from "./Components/User/Profile";

function App() {
  return (
    <Box>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Homepage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/adminlogin" element={<Adminlogin />} />
        <Route exact path="/adminhome" element={<Viewdiet />} />
        <Route exact path="/adddiet" element={<Adddiet />} />
        <Route exact path="/editdiet" element={<Editdiet />} />
        <Route exact path="/diet" element={<Viewdiet />} />
        <Route exact path="/workout" element={<Viewworkout />} />
        <Route exact path="/editworkout" element={<Editworkout />} />
        <Route exact path="/addworkout" element={<Addworkout />} />
        <Route exact path="/users" element={<Viewusers />} />
        <Route exact path="/userhome" element={<Home />} />
        <Route exact path="/viewdiet" element={<Userdiet />} />
        <Route exact path="/viewworkout" element={<Userworkout />} />
        <Route exact path="/viewprofile" element={<Profile />} />
      </Routes>
    </Box>
  );
}

export default App;
