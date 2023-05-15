import React, { useEffect } from "react";
import { Button } from "@mui/material";

const ParentComponent = () => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const handleKeyPress = (event) => {
    if (event.key === "A" || event.key === "a") {
      handleClick();
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>TEST</Button>
    </div>
  );
};

export default ParentComponent;
