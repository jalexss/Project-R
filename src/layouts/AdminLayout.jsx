import React from "react";
import { Navbar } from "../components";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main
        style={{
          margin: "88px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>
    </>
  );
};
