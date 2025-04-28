import React, { ReactNode } from "react";
import Header from "../atoms/Header";
import Footer from "../atoms/Footer";

interface PropTypes {
  children: ReactNode;
}
const Layout: React.FC<PropTypes> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
