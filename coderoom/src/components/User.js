// src/components/User.js
import React from 'react';
import './User.css'
function User({ name }) {
  return (
    <div className="user-entry">
      <div>{name.name}</div>
    </div>
  );
}

export default User;
