"use client";

import { useEffect, useState } from "react";

export default function UsersList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(savedUsers);

  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">

      <h2 className="text-2xl font-bold mb-5">
        Saved Users
      </h2>

      {users.length === 0 ? (

        <p>No users found.</p>

      ) : (

        users.map((user, index) => (

          <div
            key={index}
            className="border p-4 rounded mb-3"
          >

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

          </div>

        ))

      )}

    </div>
  );
}