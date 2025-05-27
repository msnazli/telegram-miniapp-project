import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    setUsers(data);
  };

  const changeRole = async (telegramId, newRole) => {
    const res = await fetch('/api/admin/users/set-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ telegramId, role: newRole })
    });
    if (res.ok) fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h4>مدیریت کاربران</h4>
      <table className="table">
        <thead>
          <tr><th>تلگرام ID</th><th>نام کاربری</th><th>نقش</th><th>عملیات</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.telegramId}>
              <td>{user.telegramId}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'admin' && (
                  <button className="btn btn-sm btn-success" onClick={() => changeRole(user.telegramId, 'admin')}>
                    ارتقا به مدیر
                  </button>
                )}
                {user.role !== 'viewer' && (
                  <button className="btn btn-sm btn-secondary" onClick={() => changeRole(user.telegramId, 'viewer')}>
                    کاهش سطح دسترسی
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
