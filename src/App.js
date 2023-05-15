import * as React from "react";
import ConectionTable from "./components/ConectionTableComp";
import RegisterForm from "./components/RegisterFormComp";
import ControlComp from "./components/ControlComp";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          marginTop: "30px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ControlComp />
        <RegisterForm />
        <ConectionTable />
      </Box>
    </Provider>
  );
}
