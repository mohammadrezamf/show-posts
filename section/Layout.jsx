import React from "react";
import Nav from "./globalSection/Nav";

function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
