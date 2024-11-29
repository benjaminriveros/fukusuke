import React, { useEffect, useState } from 'react';
import { getUsers } from '../../businessLogic/services/userService';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData); // Establece el estado con los usuarios obtenidos
      } catch (err) {
        console.error("Error al obtener usuarios: ", err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
