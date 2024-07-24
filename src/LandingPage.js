import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        backgroundImage="url('blog.jpg')" // Replace with your image path
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Welcome to My Blog App
          </Typography>
          <Typography variant="h5" paragraph>
            "Where your thoughts become words and your words become blogs."
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            size="large"
          >
            Login
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
