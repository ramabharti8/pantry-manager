"use client";

import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "pantryItems"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (newItem.trim() === "") return;
    await addDoc(collection(db, "pantryItems"), { name: newItem });
    setNewItem("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "pantryItems", id));
  };

  const handleEdit = (id) => {
    const item = items.find((item) => item.id === id);
    setEditItem(item);
    setNewItem(item.name); // Set the newItem state to the current name for editing
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    const { id } = editItem;
    await updateDoc(doc(db, "pantryItems", id), { name: newItem });
    setEditItem(null);
    setNewItem("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Items
      </Typography>
      <TextField
        label="Item Name"
        variant="outlined"
        fullWidth
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={editItem ? handleUpdate : handleAdd}
        startIcon={editItem ? <Edit /> : <AddCircle />}
      >
        {editItem ? "Update Item" : "Add Item"}
      </Button>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEdit(item.id)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
