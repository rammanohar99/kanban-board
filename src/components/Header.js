import React from 'react';
import '../styles/Header.css';

function Header({ groupBy, setGroupBy, sortOrder, setSortOrder }) {
  return (
    <div className="header">
      <div className="dropdown">
        <label>Group By:</label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="dropdown">
        <label>Sort By:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
