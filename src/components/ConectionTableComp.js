import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PingComponent from "./pingComp";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { deletePC, editPC } from "../redux/dataSlice";

export default function ConectionTable() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data);

  const handleEditItem = (index) => {
    dispatch(editPC(index));
  };

  const handleDeleteItem = (index) => {
    dispatch(deletePC(index));
  };

  return (
    <Paper sx={{ marginTop: "20px", width: "40%" }} elevation={2}>
      <div style={{ margin: "10px" }}>
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              padding: "15px",
              borderRadius: "10px",
              fontStyle: "italic",
              color: "gray",
            }}
          >
            <p>SIN EQUIPOS</p>
          </div>
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        width: "20%",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      IP
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      Port
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12%",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      Estado
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      Ping
                    </TableCell>
                    <TableCell
                      style={{
                        width: "20%",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        borderBottom: "1px solid gray",
                      }}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell style={{ width: "10%", textAlign: "center" }}>
                        {item.ip}
                      </TableCell>
                      <TableCell style={{ width: "10%", textAlign: "center" }}>
                        {item.port}
                      </TableCell>
                      <TableCell style={{ width: "10%", textAlign: "center" }}>
                        <PingComponent ip={item.ip} port={item.port} />
                      </TableCell>
                      <TableCell style={{ width: "10%", textAlign: "center" }}>
                        <PingComponent
                          ip={item.ip}
                          port={item.port}
                          mode="ping"
                        />
                      </TableCell>

                      <TableCell style={{ width: "20%", textAlign: "center" }}>
                        <ButtonGroup
                          variant="outlined"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEditItem(index)}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            size="small"
                            onClick={() => handleDeleteItem(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Paper>
  );
}
