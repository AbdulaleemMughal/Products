import React from "react";
import { Nav } from "react-bootstrap";
import { FaFileInvoice } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import './Navbar.scss'
import { NavLink } from "react-router-dom";

// Types
type NavbarProps = {
  styles: React.CSSProperties;
};

//Functions
const handleReload = () => {
  window.location.reload();
};

// Compnent
export const Navbar = ({ styles }: NavbarProps) => {
  return (
    <>
      <div className="header">
        <Nav.Item>
          <Nav.Link to="/" as={NavLink}>
            <FaFileInvoice style={styles} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <TbReload style={styles} onClick={handleReload} />
        </Nav.Item>
      </div>
    </>
  );
};
