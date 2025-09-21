import React, { useEffect, useState } from 'react';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinanceChart from './components/FinanceChart';
import { fetchTransactions, createTransaction, removeTransaction } from './api';
import { AppWrapper } from './AppWrapper';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Set auth token on axios
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const getTransactions = async () => {
    const res = await fetchTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const addTransaction = async (data) => {
    await createTransaction(data);
    getTransactions();
  };

  const deleteTransaction = async (id) => {
    await removeTransaction(id);
    getTransactions();
  };

  const income = transactions.filter(txn => txn.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(txn => txn.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <AppWrapper>
      <Summary income={income} expense={expense} balance={balance} />
      <FinanceChart income={income} expense={expense} />
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </AppWrapper>
  );
};

export default Dashboard;
