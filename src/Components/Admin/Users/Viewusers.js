import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { API_BASE_URL } from "../../../config";
import axios from "axios";
import { Button } from "@mui/material";
import AdminappBar from "../../Navbar/Admin";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));
const Viewusers = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    axios.get(API_BASE_URL + "getallusers").then(response => {
      console.log(response.data);
      setdata(response.data);
    });
  }

  return (
    <Box>
      <AdminappBar />
      <TableContainer sx={{ width: "70%", pt: 10, margin: "auto" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row =>
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell>
                  {row.address}
                </StyledTableCell>
                <StyledTableCell>
                  {row.mobile}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      axios
                        .delete(API_BASE_URL + "deleteuser", {
                          params: {
                            id: row._id
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
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Viewusers;
