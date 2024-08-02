// src/components/PantryList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent, Grid, Typography, Button, Paper } from '@mui/material';

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantry'));
      setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pantry', id));
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Paper style={{ padding: '16px', margin: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Pantry Items
      </Typography>
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="textSecondary">Quantity: {item.quantity}</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PantryList;
