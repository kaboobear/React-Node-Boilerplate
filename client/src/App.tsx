import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

interface Item {
  id: number;
  name: string;
  age: number;
}

export const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getItems = async () => {
    setLoading(true);
    const items = await axios.get("/api/items");
    setItems(items.data);
    setLoading(false);
  };

  const addItem = async () => {
    const item = await axios.post("/api/items");
    setItems([...items, item.data]);
  };

  useEffect(() => {
    getItems();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Container maxWidth="sm">
      <div>
        <h3>Items List</h3>
        <List>
          {items.map((item) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="avatar image"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.age} />
              </ListItem>

              <Divider />
            </>
          ))}
        </List>

        <Button variant="contained" onClick={addItem}>
          Add Item
        </Button>
      </div>
    </Container>
  );
};
