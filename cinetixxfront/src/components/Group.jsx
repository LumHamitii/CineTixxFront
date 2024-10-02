import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({ id: 0, groupName: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = 'http://localhost:5004/api/group';

  // Fetch all groups
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
    setLoading(false);
  };

  // Fetch single group by id (for editing)
  const fetchGroupById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      setGroup(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching group:', error);
    }
    setLoading(false);
  };

  // Create a new group
  const createGroup = async () => {
    try {
      await axios.post(apiUrl, group);
      fetchGroups(); // Refresh the list after creation
      setGroup({ id: 0, groupName: '', description: '' });
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  // Update an existing group
  const updateGroup = async () => {
    try {
      await axios.put(`${apiUrl}/${group.id}`, group);
      fetchGroups(); // Refresh the list after update
      setGroup({ id: 0, groupName: '', description: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  // Delete a group by id
  const deleteGroup = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchGroups(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateGroup() : createGroup();
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  // Fetch all groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Group Management</h1>

      {/* Group form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Group Name:</label>
          <input
            type="text"
            name="groupName"
            value={group.groupName}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={group.description}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isEditing ? 'Update Group' : 'Create Group'}
        </button>
      </form>

      {/* Group list */}
      {loading ? (
        <p>Loading groups...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Group Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((grp) => (
              <tr key={grp.id}>
                <td className="border px-4 py-2">{grp.id}</td>
                <td className="border px-4 py-2">{grp.groupName}</td>
                <td className="border px-4 py-2">{grp.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => fetchGroupById(grp.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => deleteGroup(grp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Group;
