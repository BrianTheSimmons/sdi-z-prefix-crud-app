import React, { useState } from "react";
import {
  Container,
  Paper,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
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

  return (
    <Container fixed maxWidth="sm">
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Stack>
              <h1>Login</h1>
              <TextField
                id="outlined-basic"
                label="first_name"
                variant="outlined"
                sx={{ mt: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="last_name"
                variant="outlined"
                sx={{ mt: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{ mt: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{ mt: 1 }}
              />
              <Button sx={{ mt: 1 }} variant="contained" onClick={handleOpen}>
                Create Account
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
