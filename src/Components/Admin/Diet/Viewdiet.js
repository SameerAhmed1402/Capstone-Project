import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminappBar from "../../Navbar/Admin";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../../config";

const Viewdiet = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get(API_BASE_URL + "getalldietplans").then(response => {
      setdata(response.data);
    });
  }

  return (
    <Box>
      <AdminappBar />

      <Container sx={{ mt: 5 }} disableGutters>
        <Button
          variant="contained"
          sx={{
            float: { lg: "right", md: "none", sm: "none", xs: "none" },
            mb: 3
          }}
          onClick={() => navigate("/adddiet")}
        >
          Add Diet
        </Button>
        <Box
          sx={{ margin: "0px 10px 0px 0px", display: "flex", flexWrap: "wrap" }}
        >
          {data.map((item, index) => {
            return (
              <Card
                sx={{
                  maxWidth: 245,
                  margin: { lg: "10px", md: "10px", xs: "auto" },
                  mb: { xs: 5 }
                }}
                key={index}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "fill" }}
                    height="140"
                    image={item.dishimageurl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.dishname}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      quantity : {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      calories : {item.calories}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      protein : {item.protein}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      carbohyderates : {item.carbohyderates}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      fat : {item.fat}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      category : {item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      level : {item.level}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      posted on : {item.creationdate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      navigate("/editdiet", {
                        state: {
                          id: item._id,
                          dishname: item.dishname,
                          dishimageurl: item.dishimageurl,
                          quantity: item.quantity,
                          calories: item.calories,
                          protein: item.protein,
                          carbohyderates: item.carbohyderates,
                          fat: item.fat,
                          category: item.category,
                          level: item.level
                        }
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      axios
                        .delete(API_BASE_URL + "deletediet", {
                          params: {
                            id: item._id
                          }
                        })
                        .then(res => {
                          if (res.data.status == 200) {
                            getData();
                          }
                        });
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Viewdiet;
