import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  Box,
  Card,
  Button,
  Grid,
  Modal,
  Stack,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./Itemlist.css";
const handleUpdate = require("./helpers/handleUpdate");
const baseUrl = "http://localhost:5000/items";

export default function Itemlist({ user }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    if (user == null || user === undefined) {
      fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        });
    } else {
      fetch(`http://localhost:5000/items/${user["id"]}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [deleteFlag]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handlePopup = (item) => {
    setItemDetails(item);
    handleOpen();
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetails({
  //     ...userDetails,
  //     [name]: value,
  //   });
  // };

  const body = (
    <Card sx={{ width: 400, mx: "auto", p: 3, mt: 5 }}>
      <Grid container justifyContent="space-between">
        <h3>{itemDetails.item_name}</h3>
      </Grid>
      <p>Quantity: {itemDetails.quantity}</p>
      <p>{itemDetails.description}</p>
    </Card>
  );

  const bodyEdit = (
    <Card sx={{ width: 400, mx: "auto", p: 3, mt: 5 }}>
      <Grid container justifyContent="space-between">
        <h3>{itemDetails.item_name}</h3>
      </Grid>
      <form onSubmit={handleUpdate}>
        <Stack>
          <h1>Edit Item</h1>
          <FormControl id="item_name">
            <Input
              placeholder={itemDetails.item_name}
              name="item_name"
              sx={{ mt: 1 }}
              value={itemDetails.item_name}
              // onChange={handleChange}
            />
          </FormControl>
          <FormControl id="quantity">
            <Input
              id="quantity"
              placeholder={itemDetails.quantity}
              name="quantity"
              sx={{ mt: 1 }}
              value={itemDetails.quantity}
              // onChange={handleChange}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <TextField
              id="description"
              placeholder={itemDetails.description}
              name="description"
              sx={{ mt: 2, p: 0 }}
              minRows={3}
              value={itemDetails.description}
              // onChange={handleChange}
            ></TextField>
          </FormControl>
          <Button sx={{ mt: 1 }} variant="contained" type="submit">
            Update Item
          </Button>
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            onClick={() => handleCloseEdit()}
          >
            Back to Items
          </Button>
        </Stack>
      </form>
    </Card>
  );

  const handleDelete = async (item) => {
    await fetch(`http://localhost:5000/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    setDeleteFlag(!deleteFlag);
  };
  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {items.length === 0 || items.length === undefined ? (
          <h2>No items to display.</h2>
        ) : (
          items.map((item) => (
            <Card sx={{ m: 2, p: 2 }} key={item.id}>
              <Grid container justifyContent="space-between">
                <h3 onClick={() => handlePopup(item)}>{item.item_name}</h3>
                {user !== undefined ? (
                  <>
                    <DeleteIcon onClick={() => handleDelete(item)} />
                    <EditIcon onClick={() => handleOpenEdit()} />
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <p>Quantity: {item.quantity}</p>
              <p>
                {item.description.length > 100
                  ? item.description.slice(0, 100) + "..."
                  : item.description}
              </p>
            </Card>
          ))
        )}
      </Box>
      <BottomNavigation>
        {user === undefined ? (
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to Login
          </Button>
        ) : (
          ""
        )}
      </BottomNavigation>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {user !== undefined ? (
        <Modal
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyEdit}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
