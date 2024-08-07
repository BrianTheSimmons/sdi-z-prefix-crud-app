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
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    user_id: id,
    item_name: "",
    quantity: "",
    description: "",
  });

  const createItem = async (newItem) => {
    try {
      console.log("createItem has been triggered with:", newItem);

      const response = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Post request failed");
      }
      return 1;
    } catch (error) {
      console.log("Error creating item:", error);
      return 0;
    }
  };

  const handleSubmit = async () => {
    try {
      let res = await createItem(itemDetails);
      return res;
    } catch (error) {
      console.log("Error handling submit: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({
      ...itemDetails,
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
      <h2 id="simple-modal-title">Item Created successfully!</h2>
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        onClick={() => {
          navigate(`/user/${username}`);
        }}
      >
        Back to your items
      </Button>
    </Card>
  );

  const bodyFail = (
    <Card sx={{ width: 400, mx: "auto", p: 3, mt: 5 }}>
      <h2 id="simple-modal-title">Failed to create new item</h2>
      <Button sx={{ mt: 1 }} variant="outlined" onClick={handleClose}>
        Back to Create Item
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
                <h1>Create New Item</h1>
                <FormControl id="item_name" isRequired>
                  <Input type="hidden" name="user_id" value={id} />
                </FormControl>
                <FormControl id="item_name" isRequired>
                  <Input
                    placeholder="Item Name"
                    name="item_name"
                    sx={{ mt: 1 }}
                    value={itemDetails.item_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="quantity" isRequired>
                  <Input
                    id="quantity"
                    placeholder="Quantity"
                    name="quantity"
                    sx={{ mt: 1 }}
                    value={itemDetails.quantity}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <TextField
                    id="description"
                    placeholder="Description"
                    name="description"
                    sx={{ mt: 2, p: 0 }}
                    minRows={3}
                    value={itemDetails.description}
                    onChange={handleChange}
                  ></TextField>
                </FormControl>
                <Button sx={{ mt: 1 }} variant="contained" type="submit">
                  Create Item
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={() => {
                    navigate(`/user/${username}`);
                  }}
                >
                  Back to your items
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
