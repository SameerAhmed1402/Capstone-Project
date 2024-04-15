import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminappBar from "../../Navbar/Admin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { API_BASE_URL } from "../../../config";

const Editworkout = () => {
  const location = useLocation();
  const id = location.state.id;
  const [videoId, setvideoId] = useState(location.state.videoid);
  const [level, setlevel] = useState(location.state.level);
  const creationDate = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (videoId === "" || level === "") {
      alert("please fill all fields");
    } else {
      axios
        .put(API_BASE_URL + "editworkout", {
          id: id,
          videoid: videoId,
          level: level,
          creationDate: creationDate
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            alert("Workout Updated Successfully");
            navigate("/workout");
          }
        });
    }
  };
  return (
    <Box>
      <AdminappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            EDIT WORKOUT
          </Typography>

          <TextField
            fullWidth
            label="Video Id"
            id="fullWidth"
            value={videoId}
            onChange={e => setvideoId(e.target.value)}
          />
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-select-small-label">Choose Level</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={level}
              label="Pick Level"
              onChange={e => setlevel(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Editworkout;
