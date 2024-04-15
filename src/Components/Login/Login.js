import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Reducers/user";
import HomeappBar from "../Navbar/Home";
import { API_BASE_URL } from "../../config";

const Form = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please enter email and password");
    } else {
      axios
        .get(API_BASE_URL + "userlogin/", {
          params: {
            email: email,
            password: password
          }
        })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.length > 0) {
            navigate("/userhome");
            dispatch(
              getUserData({
                id: res.data.data[0]._id,
                name: res.data.data[0].username,
                email: res.data.data[0].email,
                password: res.data.data[0].password,
                address: res.data.data[0].address,
                mobile: res.data.data[0].mobile
              })
            );
          } else {
            alert("invalid email or password");
          }
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            USER LOGIN
          </Typography>
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
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Typography sx={{ textAlign: "center" }}>OR</Typography>
          <Typography sx={{ textAlign: "center" }}>
            <Link to="/adminlogin"> Click Here If You Are Admin ?</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Form;
