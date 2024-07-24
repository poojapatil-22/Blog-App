import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Input change handler
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blogs");
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
      width="50%"
      margin="auto"
      padding={3}
      borderRadius={10}
      boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)"
      marginTop="30px"
    >
      <Typography variant="h4" fontWeight="bold" color="primary" marginBottom={2}>
        Create a Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputLabel fontSize="1.2rem" fontWeight="bold">
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          fullWidth
        />
        <InputLabel fontSize="1.2rem" fontWeight="bold" marginTop={2}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          fullWidth
          multiline
          rows={4}
        />
        <InputLabel fontSize="1.2rem" fontWeight="bold" marginTop={2}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          fullWidth
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          marginTop={3}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlog;
