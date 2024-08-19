// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      width: "100vw", 
      backgroundColor: "#e8f5e9" // Fondo verde claro
    }}>
      <div style={{ 
        textAlign: "center", 
        backgroundColor: "#ffffff",  // Fondo blanco
        padding: "50px", 
        borderRadius: "15px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        width: "80%", // Asegura que el contenedor cubra el 80% del ancho
        maxWidth: "600px" // Máximo ancho para mantener una buena apariencia
      }}>
        <h1 style={{ 
          fontSize: "3rem", 
          color: "#388e3c", // Verde oscuro
          marginBottom: "30px" 
        }}>
          Welcome to XMPP Chat
        </h1>
        <div style={{ marginTop: "20px" }}>
          <Link to="/register">
            <button style={{ 
              margin: "20px", 
              padding: "15px 30px", 
              fontSize: "1.5rem", 
              backgroundColor: "#66bb6a", // Verde medio
              color: "#ffffff", 
              border: "none", 
              borderRadius: "10px", 
              cursor: "pointer" 
            }}>
              Register
            </button>
          </Link>
          <Link to="/login">
            <button style={{ 
              margin: "20px", 
              padding: "15px 30px", 
              fontSize: "1.5rem", 
              backgroundColor: "#43a047", // Verde medio
              color: "#ffffff", 
              border: "none", 
              borderRadius: "10px", 
              cursor: "pointer" 
            }}>
              Log In
            </button>
          </Link>
          <Link to="/delete">
            <button style={{ 
              margin: "20px", 
              padding: "15px 30px", 
              fontSize: "1.5rem", 
              backgroundColor: "#2e7d32", // Verde oscuro
              color: "#ffffff", 
              border: "none", 
              borderRadius: "10px", 
              cursor: "pointer" 
            }}>
              Delete Account
            </button>
          </Link>
          <Link to="/contacts">
            <button style={{ 
              margin: "20px", 
              padding: "15px 30px", 
              fontSize: "1.5rem", 
              backgroundColor: "#1b5e20", // Verde más oscuro
              color: "#ffffff", 
              border: "none", 
              borderRadius: "10px", 
              cursor: "pointer" 
            }}>
              View Contacts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
