
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-3">
      {/* Left Side */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        Notes App
      </Link>

      {/* Right Side (Login, Register, Logout) */}
      <div className="ms-auto">
        {!token ? (
          <>
            <Link className="btn btn-light btn-sm me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-warning btn-sm" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
