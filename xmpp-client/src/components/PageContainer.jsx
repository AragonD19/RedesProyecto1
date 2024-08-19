// src/components/PageContainer.jsx
import React from "react";

const PageContainer = ({ children }) => {
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
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
