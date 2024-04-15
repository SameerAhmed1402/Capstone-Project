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

const Viewworkout = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get(API_BASE_URL + "getallworkoutplans").then(response => {
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
          onClick={() => navigate("/addworkout")}
        >
          Add Workout
        </Button>
        <Box
          sx={{ margin: "0px 10px 0px 0px", display: "flex", flexWrap: "wrap" }}
        >
          {data.map((item, index) => {
            return (
              <Card
                sx={{
                  maxWidth: 345,
                  margin: { lg: "10px", md: "10px", xs: "auto" },
                  mb: { xs: 5 }
                }}
                key={index}
              >
                <CardActionArea>
                  <iframe
                    style={{
                      width: "345px",
                      height: "200px",
                      borderRadius: "15px"
                    }}
                    src={`https://www.youtube.com/embed/${item.videoid}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                  <CardContent>
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
                      navigate("/editworkout", {
                        state: {
                          id: item._id,
                          videoid: item.videoid,
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
                        .delete(API_BASE_URL + "deleteworkout", {
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

export default Viewworkout;
