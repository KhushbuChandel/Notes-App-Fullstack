import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
