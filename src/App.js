import React, { useState, useEffect } from 'react';
import { fetchTickets } from './api/fetchTickets';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import './styles/App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  useEffect(() => {
    // Load data from API
    const loadTickets = async () => {
      const data = await fetchTickets();
      setTickets(data);
    };
    loadTickets();

    // Restore user preferences from localStorage
    const savedGroupBy = localStorage.getItem('groupBy') || 'status';
    const savedSortOrder = localStorage.getItem('sortOrder') || 'priority';
    setGroupBy(savedGroupBy);
    setSortOrder(savedSortOrder);
  }, []);

  // Save user preferences on change
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortOrder', sortOrder);
  }, [groupBy, sortOrder]);

  return (
    <div className="App">
      <Header groupBy={groupBy} setGroupBy={setGroupBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortOrder={sortOrder} />
    </div>
  );
}

export default App;
