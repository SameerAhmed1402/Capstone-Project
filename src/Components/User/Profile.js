import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import HomeappBar from "../Navbar/Home";
import { useDispatch, useSelector } from "react-redux";
import UserappBar from "../Navbar/User";
import { getUserData } from "../../Reducers/user";

const Profile = () => {
  const user = useSelector(state => state.user.value);
  const [username, setusername] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState(user.password);
  const [address, setaddress] = useState(user.address);
  const [mobile, setmobile] = useState(user.mobile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      mobile === ""
    ) {
      alert("please fill all fields");
    } else {
      axios
        .put(API_BASE_URL + "editprofile", {
          id: user.id,
          username: username,
          email: email,
          password: password,
          address: address,
          mobile: mobile
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            alert("Profile Updated Successfully");
            dispatch(
              getUserData({
                id: user.id,
                username: username,
                email: email,
                password: password,
                address: address,
                mobile: mobile
              })
            );
          }
        });
    }
  };
  return (
    <Box>
      <UserappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            YOUR PROFILE
          </Typography>

          <TextField
            fullWidth
            label="Username"
            id="fullWidth"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="fullWidth"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            id="fullWidth"
            value={address}
            onChange={e => setaddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mobile"
            id="fullWidth"
            value={mobile}
            onChange={e => setmobile(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Profile;
