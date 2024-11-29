import React, { useState, useEffect } from 'react';
import Column from './Column';
import { fetchTickets } from '../api/fetchTickets';
import '../styles/Board.css';
import '../styles/Column.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sortOrder, setSortOrder] = useState('priority'); // Default sort order
  const [loading, setLoading] = useState(true);

  // Fetch tickets and users on component mount
  useEffect(() => {
    const loadTickets = async () => {
      const { tickets, users } = await fetchTickets();
      setTickets(tickets);
      setUsers(users);
      setLoading(false);
    };

    loadTickets();
  }, []);

  // Group tickets based on the selected grouping option
  const groupTickets = () => {
    const groups = {};

    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) groups[ticket.status] = [];
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      tickets.forEach(ticket => {
        if (!groups[ticket.userId]) groups[ticket.userId] = [];
        groups[ticket.userId].push(ticket);
      });
    } else if (grouping === 'priority') {
      tickets.forEach(ticket => {
        if (!groups[ticket.priority]) groups[ticket.priority] = [];
        groups[ticket.priority].push(ticket);
      });
    }

    return groups;
  };

  // Sort tickets within each group
  const sortedGroups = () => {
    const groups = groupTickets();

    Object.keys(groups).forEach(group => {
      groups[group].sort((a, b) => {
        if (sortOrder === 'priority') {
          return b.priority - a.priority; // Descending priority
        } else if (sortOrder === 'title') {
          return a.title.localeCompare(b.title); // Ascending title
        }
        return 0;
      });
    });

    return groups;
  };

  const groups = sortedGroups();

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="kanban-board">
      <header>
        <div>
          <label>Grouping:</label>
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
            <option value="status">Group by Status</option>
            <option value="user">Group by User</option>
            <option value="priority">Group by Priority</option>
          </select>
        </div>
        <div>
          <label>Sorting:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </header>

      <div className="columns">
        {Object.entries(groups).map(([key, tickets]) => {
          let title = key;
          const iconClass = getStatusIconClass(key); // Function to get status icon class

          if (grouping === 'user') {
            const user = users.find(user => user.id === key);
            title = user ? user.name : 'Unassigned';
          } else if (grouping === 'priority') {
            const priorities = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];
            title = priorities[key] || 'No Priority';
          }

          return (
            <Column
              key={key}
              title={title}
              tickets={tickets}
              iconClass={iconClass} // Pass icon class for column
              users={users}
            />
          );
        })}
      </div>
    </div>
  );
};

// Function to determine the status icon class dynamically
const getStatusIconClass = (status) => {
  switch (status) {
    case 'Todo':
      return 'icon todo';
    case 'In Progress':
      return 'icon in-progress';
    case 'Done':
      return 'icon done';
    case 'Cancelled':
      return 'icon cancelled';
    case 'Backlog':
      return 'icon backlog';
    default:
      return 'icon no-priority';
  }
};

export default KanbanBoard;
