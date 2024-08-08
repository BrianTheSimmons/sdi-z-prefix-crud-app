import React, { useState } from "react";
import {
  Container,
  Paper,
  Card,
  Button,
  CardContent,
  Stack,
  Modal,
  Input,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const createUser = async (newUser) => {
    try {
      console.log("createUser has been triggered with:", newUser);

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Post request failed");
      }
      return 1;
    } catch (error) {
      console.log("Error creating user:", error);
      return 0;
    }
  };

  const handleSubmit = async () => {
    try {
      let res = await createUser(userDetails);
      return res;
    } catch (error) {
      console.log("Error handling submit: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleOpenFail = () => {
    setOpenFail(true);
  };

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenFail(false);
  };

  const handleFunctions = async (e) => {
    e.preventDefault();
    let res = await handleSubmit();
    if (res === 0) {
      handleOpenFail();
    } else {
      handleOpenSuccess();
    }
  };

  const bodySuccess = (
    <Card sx={{ width: 400, mx: "auto", p: 3, mt: 5 }}>
      <h2 id="simple-modal-title">Account Created successfully!</h2>
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Login
      </Button>
    </Card>
  );

  const bodyFail = (
    <Card sx={{ width: 400, mx: "auto", p: 3, mt: 5 }}>
      <h2 id="simple-modal-title">Username already in use</h2>
      <Button sx={{ mt: 1 }} variant="outlined" onClick={handleClose}>
        Back to Create Account
      </Button>
    </Card>
  );

  return (
    <Container fixed maxWidth="sm">
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <form onSubmit={handleFunctions}>
              <Stack>
                <h1>Create New Account</h1>
                <FormControl id="first_name" isRequired>
                  <Input
                    placeholder="First Name"
                    name="first_name"
                    sx={{ mt: 1 }}
                    value={userDetails.first_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="last_name" isRequired>
                  <Input
                    id="last_name"
                    placeholder="Last Name"
                    name="last_name"
                    sx={{ mt: 1 }}
                    value={userDetails.last_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Username" isRequired>
                  <Input
                    id="username"
                    placeholder="Username"
                    name="username"
                    sx={{ mt: 1 }}
                    value={userDetails.username}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <Input
                    id="password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    sx={{ mt: 1 }}
                    value={userDetails.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button sx={{ mt: 1 }} variant="contained" type="submit">
                  Create Account
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={() => navigate("/")}
                >
                  Back to Login
                </Button>
              </Stack>
            </form>
            <Modal
              open={openFail}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {bodyFail}
            </Modal>
            <Modal
              open={openSuccess}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {bodySuccess}
            </Modal>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
