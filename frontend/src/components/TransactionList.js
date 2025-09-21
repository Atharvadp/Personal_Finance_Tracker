import React from 'react';
import { Button, List, ListItem, ListItemText, Paper, Typography, Chip, Box } from '@mui/material';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <Paper elevation={8} sx={{ maxWidth: 600, margin: 'auto', p: 3, mb: 5 }}>
      <List>
        {transactions.map(txn => (
          <ListItem
            key={txn._id}
            sx={{
              transition: 'background-color 0.3s',
              '&:hover': { backgroundColor: 'action.hover' },
              borderRadius: 1,
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">{txn.title}</Typography>
              <Typography variant="body2" color="text.secondary">{txn.category}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={txn.type === 'income' ? 'Income' : 'Expense'}
                color={txn.type === 'income' ? 'success' : 'error'}
                size="small"
              />
              <Typography fontWeight="bold" sx={{ color: txn.type === 'income' ? 'success.main' : 'error.main' }}>
                ₹{txn.amount}
              </Typography>
              <Button variant="outlined" color="error" size="small" onClick={() => onDelete(txn._id)}>
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionList;
