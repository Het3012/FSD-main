import { useState, useEffect } from "react";

export default function Practical3(){
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(()=> {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to CHARUSAT!!!</h1>
            <h2 style={styles.subtitle}>Current Date and Time:</h2>
            <p style={styles.dateTime}>{dateTime.toLocaleString()}</p>
        </div>
    );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "0",
    fontFamily: "'Times New Roman', serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "50px 20px",
    color: "#000000",
    border: "3px solid #333333",
    margin: "20px",
    boxShadow: "5px 5px 0px #000000",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: "20px",
    color: "#000000",
  },
  subtitle: {
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: "15px",
    color: "#333333",
  },
  dateTime: {
    fontSize: "20px",
    fontWeight: "normal",
    color: "#333333",
    border: "2px solid #333333",
    padding: "15px",
    backgroundColor: "#ffffff",
    display: "inline-block",
    marginTop: "10px",
  },
};