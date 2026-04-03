import React from "react";

// Sample fake data
const users = [
  { id: 1, name: "Sujoy Das", email: "sujoy@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Rohit Roy", email: "rohit@example.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Anika Sen", email: "anika@example.com", role: "User", status: "Active" },
  { id: 4, name: "Rahul Das", email: "rahul@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Mina Chakraborty", email: "mina@example.com", role: "Editor", status: "Inactive" },
  { id: 6, name: "Tuhin Khatun", email: "tuhin@example.com", role: "User", status: "Active" },
  { id: 7, name: "Ranjit Roy", email: "ranjit@example.com", role: "User", status: "Active" },
  { id: 8, name: "Nisha Das", email: "nisha@example.com", role: "Editor", status: "Inactive" },
];

const UserTable = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Table</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.name}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.role}</td>
                <td className="px-4 py-2 text-sm">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;