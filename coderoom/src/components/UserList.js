import React from 'react';
import User from './User';
import { useState, useEffect } from 'react';


function UserList({ socket }) {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        // const username = prompt('Please enter your name:'); // Prompt user to enter their name
        // if (username) {
        //     socket.emit('addUser', username); // Emit username to the server if it's not empty
        // }
        socket.emit('addUser', ''); // Sending only the name as a string

        socket.on('usersChange', (newUsers) => {
            setUsers(newUsers);
        });

    }, []);

    return (
        <div className="user-list">
        <h2>Users in the Room:</h2>
        {users.map((user, index) => (
            <User key={index} name={user} />
        ))}
        </div>
    );
}

export default UserList;