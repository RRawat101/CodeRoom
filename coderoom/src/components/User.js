// src/components/User.js
import React from 'react';
import './User.css'
import {useState,useRef} from 'react';
function User({ name }) {



  return (
    <div className="user-entry">
      <div>{name.name}</div>
    </div>
  );
}

export default User;
