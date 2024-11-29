import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/Column.css';

const Column = ({ title, tickets, iconClass, users }) => {
    return (
        <section className="column" aria-label={`Column: ${title}`}>
            <h2>
                <span className={iconClass || 'default-icon-class'}></span>
                {title} <span>({tickets.length})</span>
            </h2>
            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <Card key={ticket.id} ticket={ticket} users={users} />
                ))
            ) : (
                <p>No tickets available</p>
            )}
        </section>
    );
};

Column.propTypes = {
    title: PropTypes.string.isRequired,
    tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
    iconClass: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object),
};

Column.defaultProps = {
    iconClass: '',
    users: [],
};

export default Column;
