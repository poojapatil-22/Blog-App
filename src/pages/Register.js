import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Lock, PersonAdd } from "@mui/icons-material"; // Import the Lock and PersonAdd icons
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ marginTop: "-100px" }}
    >
      <Paper elevation={3}>
        <Box p={4} maxWidth={400}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            <PersonAdd fontSize="large" /> Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Name"
              value={inputs.name}
              name="name"
              margin="normal"
              type="text"
              fullWidth
              required
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              placeholder="Email"
              value={inputs.email}
              name="email"
              margin="normal"
              type="email"
              fullWidth
              required
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              placeholder="Password"
              value={inputs.password}
              name="password"
              margin="normal"
              type="password"
              fullWidth
              required
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ mt: 2 }}
            >
              Already Registered? Please Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
