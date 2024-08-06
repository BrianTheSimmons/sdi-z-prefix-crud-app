import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Container fixed maxWidth="sm">
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Stack>
              <h1>Login</h1>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{ mt: 2 }}
              />
              <Button sx={{ mt: 1 }} variant="contained">
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
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
