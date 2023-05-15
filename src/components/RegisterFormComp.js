import React, { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerPC, deletePC, editPC } from "../redux/dataSlice";

const initialFormState = {
  name: "",
  ip: "",
  port: "",
};

export default function RegisterForm({ editFunc }) {
  const dispatch = useDispatch();

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
    dispatch(registerPC(formData));
    setFormData(initialFormState);
  };

  const handleUpdateItem = () => {
    editFunc();
  };

  return (
    <Paper sx={{ marginTop: "20px", width: "40%" }} elevation={2}>
      <div style={{ margin: "10px" }}>
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
            size="small"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: "30%", marginRight: "10px" }}
          />
          <TextField
            label="IP"
            name="ip"
            size="small"
            value={formData.ip}
            onChange={handleInputChange}
            required
            style={{ width: "30%", marginRight: "10px" }}
          />
          <TextField
            label="Port"
            name="port"
            size="small"
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
    </Paper>
  );
}
