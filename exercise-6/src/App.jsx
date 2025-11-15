import React, { useEffect, useState } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(2, "0")}`;
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "1rem",
      fontWeight: "bold",
    },
    time: {
      fontSize: "4rem",
      fontFamily: "monospace",
      marginBottom: "2rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    startButton: {
      padding: "0.5rem 1.5rem",
      fontSize: "1rem",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
    },
    resetButton: {
      padding: "0.5rem 1.5rem",
      fontSize: "1rem",
      backgroundColor: "#4b5563",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏱ Stopwatch</h1>
      <h2 style={styles.time}>{formatTime()}</h2>

      <div style={styles.buttonContainer}>
        <button style={styles.startButton} onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button style={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
