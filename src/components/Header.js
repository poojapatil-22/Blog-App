import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { ExitToApp, Person, Create, Assignment } from "@mui/icons-material";

const Header = () => {
  // Global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for controlling the selected tab
  const [value, setValue] = useState(0);

  // Logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2196F3" }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/icon.png"
              alt="Bloggers Icon"
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Typography variant="h6" sx={{ color: "white", fontWeight: 'bold', marginLeft: -2 }}>
              Bloggers
            </Typography>
          </Box>
          <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
            {isLogin && (
              <>
                <Tab
                  label="Blogs"
                  icon={<Assignment />}
                  LinkComponent={Link}
                  to="/blogs"
                  sx={{
                    color: "white",
                    marginLeft: "auto",
                  }}
                />
                <Tab
                  label="My Blogs"
                  icon={<Person />}
                  LinkComponent={Link}
                  to="/my-blogs"
                  sx={{
                    color: "white",
                    marginRight: 1,
                  }}
                />
                <Tab
                  label="Create Blog"
                  icon={<Create />}
                  LinkComponent={Link}
                  to="/create-blog"
                  sx={{
                    color: "white",
                    marginRight: 1,
                  }}
                />

<Tab
                  label="Tutorial"
                  icon={<Person />}
                  LinkComponent={Link}
                  to="/Tutorial"
                  sx={{
                    color: "white",
                    marginRight: 1,
                  }}
                />


              </>
            )}
          </Tabs>
          <Box sx={{ marginLeft: "auto" }}>
            {!isLogin ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: '0.8rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: '#3F51B5 !important',
                      color: 'white',
                    },
                  }}
                  LinkComponent={Link}
                  to="/login"
                >
                  <Person />
                  Login
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: '0.8rem',
                    backgroundColor: '#F44336',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#D32F2F !important',
                    },
                  }}
                  LinkComponent={Link}
                  to="/register"
                >
                  <Person />
                  Register
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleLogout}
                sx={{
                  fontSize: '0.8rem',
                  backgroundColor: '#F44336',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#D32F2F !important',
                  },
                }}
              >
                <ExitToApp />
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
