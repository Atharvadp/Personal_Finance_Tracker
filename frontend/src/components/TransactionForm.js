import React, { useState } from 'react';
import { Box, Button, MenuItem, Paper, Select, TextField, Typography, FormControl, InputLabel } from '@mui/material';
import { Grow } from '@mui/material';

const categories = [
  'Food',
  'Electronics',
  'Entertainment',
  'Bills',
  'Travel',
  'Miscellaneous',
];

const initialState = {
  title: '',
  amount: '',
  category: '',
  type: 'expense',
};

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: Number(form.amount) });
    setForm(initialState);
  };

  return (
    <Grow in>
      <Paper elevation={6} sx={{ maxWidth: 600, margin: 'auto', p: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom>Add Transaction</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            required
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            sx={{ flex: 1, minWidth: 100 }}
          />
          <FormControl sx={{ flex: 1, minWidth: 150 }} required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={form.category}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Select
            name="type"
            value={form.type}
            onChange={handleChange}
            sx={{ width: 120 }}
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 120 }}>
            Add
          </Button>
        </Box>
      </Paper>
    </Grow>
  );
};

export default TransactionForm;
