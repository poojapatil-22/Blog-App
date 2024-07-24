import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.post(`/api/v1/blog/get-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      }, {
        headers: {
          'Authorization': `Bearer $${localStorage.get('jwt')}`
        }
      });
      if (data?.success) {
        alert("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width={"50%"}
      border={3}
      borderRadius={10}
      padding={3}
      margin="auto"
      boxShadow={"10px 10px 20px #ccc"}
      display="flex"
      flexDirection={"column"}
      marginTop="30px"
    >
      <Typography
        variant="h4"
        textAlign={"center"}
        fontWeight="bold"
        padding={3}
        color="gray"
      >
        Update A Blog
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
          color="warning"
          variant="contained"
          size="large"
          marginTop={3}
        >
          UPDATE
        </Button>
      </form>
    </Box>
  );
};

export default BlogDetails;
