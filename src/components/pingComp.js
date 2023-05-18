import React, { useState, useEffect } from "react";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PublicOffOutlinedIcon from "@mui/icons-material/PublicOffOutlined";

function PingComponent({ ip, port, mode }) {
  const [isPingSuccessful, setIsPingSuccessful] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      const startTime = performance.now();
      fetch(`http://${ip}:${port}`)
        .then((response) => {
          const endTime = performance.now();
          const timeElapsed = endTime - startTime;
          setResponseTime(timeElapsed);

          if (response.status === 200) {
            setIsPingSuccessful(true);
          } else {
            setIsPingSuccessful(false);
          }
        })
        .catch((error) => {
          setIsPingSuccessful(false);
        });
    }, 1000);

    return () => {
      clearInterval(pingInterval);
    };
  }, [ip, port]);

  const getStatusLabel = () => {
    if (mode === "ping") {
      if (isPingSuccessful) {
        return <span style={{ color: "green" }}>{responseTime} ms</span>;
      } else {
        return <span style={{ color: "red" }}>OFF</span>;
      }
    } else {
      if (isPingSuccessful) {
        return <PublicOutlinedIcon color="success" fontSize="small" />;
      } else {
        return <PublicOffOutlinedIcon color="error" />;
      }
    }
  };

  return <div>{getStatusLabel()}</div>;
}

export default PingComponent;
