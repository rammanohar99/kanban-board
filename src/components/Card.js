import React from 'react';
import '../styles/Card.css';

const Card = ({ ticket, users }) => {
  const user = users.find((user) => user.id === ticket.userId);

  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p className="priority">Priority: {['No Priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority]}</p>
      <p>
        Assigned to:
        {user ? (
          <>
            <span className="user-avatar" style={{ backgroundColor: user.available ? '#28a745' : '#dc3545' }}></span>
            {user.name}
          </>
        ) : (
          'Unassigned'
        )}
      </p>
    </div>
  );
};

export default Card;
