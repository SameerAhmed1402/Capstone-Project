import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminappBar from "../../Navbar/Admin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { API_BASE_URL } from "../../../config";

const Adddiet = () => {
  const [dishname, setdishname] = useState("");
  const [dishimageurl, setdishimageurl] = useState("");
  const [quantity, setquantity] = useState("");
  const [calories, setcalories] = useState("");
  const [protein, setprotein] = useState("");
  const [carbohyderates, setcarbohyderates] = useState("");
  const [fat, setfat] = useState("");
  const [category, setcategory] = useState("");
  const [level, setlevel] = useState("");
  const creationDate = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (
      dishname === "" ||
      dishimageurl === "" ||
      quantity === "" ||
      calories === "" ||
      protein === "" ||
      carbohyderates === "" ||
      fat === "" ||
      category === "" ||
      level === ""
    ) {
      alert("please fill all fields");
    } else {
      axios
        .post(API_BASE_URL + "adddiet", {
          dishname: dishname,
          dishimageurl: dishimageurl,
          quantity: quantity,
          calories: calories,
          protein: protein,
          carbohyderates: carbohyderates,
          fat: fat,
          category: category,
          level: level,
          creationDate: creationDate
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            alert("Dish Added Successfully");
            navigate("/diet");
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
            ADD DISH
          </Typography>

          <TextField
            fullWidth
            label="Dish Name"
            id="fullWidth"
            value={dishname}
            onChange={e => setdishname(e.target.value)}
          />
          <TextField
            fullWidth
            label="Dish Image Url"
            id="fullWidth"
            value={dishimageurl}
            onChange={e => setdishimageurl(e.target.value)}
          />
          <TextField
            fullWidth
            label="Quantity"
            id="fullWidth"
            value={quantity}
            onChange={e => setquantity(e.target.value)}
          />
          <TextField
            fullWidth
            label="Calories"
            id="fullWidth"
            value={calories}
            onChange={e => setcalories(e.target.value)}
          />
          <TextField
            fullWidth
            label="Protein"
            id="fullWidth"
            value={protein}
            onChange={e => setprotein(e.target.value)}
          />
          <TextField
            fullWidth
            label="Carbohyderate"
            id="fullWidth"
            value={carbohyderates}
            onChange={e => setcarbohyderates(e.target.value)}
          />
          <TextField
            fullWidth
            label="Fat"
            id="fullWidth"
            value={fat}
            onChange={e => setfat(e.target.value)}
          />
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-select-small-label">
              Choose Category
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="Pick Category"
              onChange={e => setcategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
            </Select>
          </FormControl>
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
            Save
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Adddiet;
