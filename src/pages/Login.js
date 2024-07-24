import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Lock } from "@mui/icons-material"; // Import the Lock icon
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        alert("User logged in successfully");
        navigate("/");
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
      sx={{ marginTop: "-100px" }} // Adjust this value as needed
    >
      <Paper elevation={3}>
        <Box p={4} maxWidth={400}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            <Lock fontSize="large" /> Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              fullWidth
              sx={{ mt: 2 }}
            >
              Not a user? Please Register
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
