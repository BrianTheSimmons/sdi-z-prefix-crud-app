import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* I would like to set up a persistent login, rather than a sort of validation
  to get to a user's specific page */

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { username: username, password };
    console.log("Sending login request with data:", loginData); // Add this line

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        navigate(`/user/${username}`);
      } else {
        // Need to implement a popup that will run if an invalid user attempts to login
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fixed maxWidth="sm">
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <form onSubmit={handleLogin}>
              <Stack>
                <h1>Login</h1>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    sx={{ mt: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button sx={{ mt: 1 }} variant="contained" type="submit">
                  Login
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={() => {
                    navigate("/createaccount");
                  }}
                >
                  Create Account
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={() => {
                    navigate("/itemlist");
                  }}
                >
                  Continue as Guest
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
