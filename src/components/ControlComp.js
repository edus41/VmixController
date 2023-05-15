import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";

const ControlComp = () => {
  const [buttons, setButtons] = useState([]);

  const addNewButton = () => {
    setButtons([...buttons, `Botón ${buttons.length + 1}`]);
  };

  const deleteButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    setButtons(updatedButtons);
  };

  const editButton = (index) => {
    console.log(`Editar botón ${index}`);
  };

  return (
    <Card style={{ marginTop: "20px", width: "80vw" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            minHeight: "155px",
          }}
        >
          {buttons.map((buttonText, index) => (
            <div
              key={index}
              style={{
                width: "155px",
                aspectRatio: "1/1",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "100%",
                  height: "80%",
                }}
              >
                {buttonText}
              </Button>
              <div
                style={{
                  marginTop: "5px",
                  height: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined primary button group"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => editButton(index)}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => deleteButton(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}

          <Button
            variant="outlined"
            sx={{
              display: "flex",
              width: "155px",
              aspectRatio: "1/1",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={addNewButton}
          >
            <AddIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlComp;
