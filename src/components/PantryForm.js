// src/components/PantryForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const PantryForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantry'), {
        name,
        quantity,
      });
      setName('');
      setQuantity('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Paper style={{ padding: '16px', margin: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Add New Pantry Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PantryForm;
