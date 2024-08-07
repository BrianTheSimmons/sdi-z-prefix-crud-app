import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, Button, Grid } from "@mui/material";
import Itemlist from "./Itemlist";

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const { username } = useParams();
  const [flag, setFlag] = useState(0);

  console.log("USER FROM USERPAGE.JS: ", user.length);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFlag(1);
      });
  }, [flag]);

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button onClick={() => navigate("/")}>Log Out</Button>
      </Grid>
      {flag === 0 ? <p>LOADING</p> : <Itemlist user={user} />}
      <BottomNavigation>
        <Button
          onClick={() => navigate(`/createitem/${user.id}/${user.username}`)}
        >
          Add New Item
        </Button>
        <Button
          sx={{ ml: 5 }}
          onClick={() => {
            navigate("/itemlist");
          }}
        >
          View All Items
        </Button>
      </BottomNavigation>
    </>
  );
}
