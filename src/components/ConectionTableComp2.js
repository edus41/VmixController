import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PingComponent from "./pingComp";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";

const initialFormState = {
  name: "",
  ip: "",
  port: "",
};

export default function Tables() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name: nameValue, ip, port } = formData;
    const isNameValid = nameValue.trim() !== "";
    const isIpValid = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
    const isIpNumbersValid = ip.split(".").every((num) => parseInt(num) <= 255);
    const isPortValid = /^\d+$/.test(port);
    const isPortNumbersValid = parseInt(port) <= 65535;

    setIsFormValid(
      isNameValid &&
        isIpValid &&
        isPortValid &&
        isIpNumbersValid &&
        isPortNumbersValid
    );
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    if (!isFormValid) {
      return;
    }

    setItems((prevItems) => [...prevItems, formData]);
    setFormData(initialFormState);
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setFormData(items[index]);
  };

  const handleUpdateItem = () => {
    const updatedItems = [...items];
    updatedItems[editIndex] = formData;
    setItems(updatedItems);
    setFormData(initialFormState);
    setEditIndex(null);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
        <div>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "15px",
            }}
          >
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ width: "30%", marginRight: "10px" }}
            />
            <TextField
              label="IP"
              name="ip"
              value={formData.ip}
              onChange={handleInputChange}
              required
              style={{ width: "30%", marginRight: "10px" }}
            />
            <TextField
              label="Port"
              name="port"
              value={formData.port}
              onChange={handleInputChange}
              required
              style={{ width: "20%", marginRight: "10px" }}
            />
            {editIndex !== null ? (
              <Button
                variant="contained"
                onClick={handleUpdateItem}
                disabled={!isFormValid}
                style={{ width: "20%" }}
              >
                Actualizar
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleAddItem}
                disabled={!isFormValid}
                style={{ width: "20%" }}
              >
                Agregar
              </Button>
            )}
          </form>
        </div>
      </div>
    </Paper>
  );
}
