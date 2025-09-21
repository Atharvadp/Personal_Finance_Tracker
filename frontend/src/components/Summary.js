import React from 'react';
import { Grid, Paper, Typography, Box, Chip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Summary = ({ income, expense, balance }) => (
  <Paper elevation={8} sx={{
    p: 4, mt: 4, mb: 6, borderRadius: 3,
    backgroundColor: 'white',
  }}>
    <Grid container justifyContent="space-around" spacing={4}>
      <Grid item xs={12} sm={4} textAlign="center">
        <Chip
          icon={<ArrowUpwardIcon />}
          label="Income"
          color="success"
          sx={{ fontWeight: 'bold', mb: 1 }}
        />
        <Typography variant="h4" sx={{ fontWeight: '700' }}>₹{income}</Typography>
      </Grid>
      <Grid item xs={12} sm={4} textAlign="center">
        <Chip
          icon={<ArrowDownwardIcon />}
          label="Expense"
          color="error"
          sx={{ fontWeight: 'bold', mb: 1 }}
        />
        <Typography variant="h4" sx={{ fontWeight: '700' }}>₹{expense}</Typography>
      </Grid>
      <Grid item xs={12} sm={4} textAlign="center">
        <Chip
          icon={<AccountBalanceWalletIcon />}
          label="Balance"
          color={balance >= 0 ? 'primary' : 'error'}
          sx={{ fontWeight: 'bold', mb: 1 }}
        />
        <Typography variant="h4" sx={{ fontWeight: '700', color: balance >= 0 ? 'primary.main' : 'error.main' }}>
          ₹{balance}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default Summary;
