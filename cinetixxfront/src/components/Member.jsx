import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Member = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]);
    const [members, setMembers] = useState([]); // State for storing members
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost:5004/api/member';

    // Fetch groups when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/group'); // Ensure correct endpoint
                setGroups(response.data); // Assuming response.data is an array of groups
            } catch (err) {
                console.error('Error fetching groups', err);
                setError('Error fetching groups');
            }
        };

        fetchGroups();
    }, []);

    // Fetch members when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/member'); // Ensure correct endpoint
                setMembers(response.data); // Assuming response.data is an array of members
            } catch (err) {
                console.error('Error fetching members', err);
                setError('Error fetching members');
            }
        };

        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setMembers(response.data); // Set members state to the response data
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const deleteMember = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            // After deletion, fetch the members again
            fetchMembers(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const memberData = {
            name,
            role,
            groupId: parseInt(groupId, 10), // Ensure groupId is an integer
        };

        try {
            const response = await axios.post(apiUrl, memberData);
            console.log('Member created:', response.data);
            setMembers([...members, response.data]); // Add new member to the list
            // Clear fields
            setName('');
            setRole('');
            setGroupId('');
        } catch (error) {
            console.error('Error creating member:', error.response.data);
            setError('Error creating member');
        }
    };

    return (
        <div>
            <h1>Create Member</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Group:</label>
                    <select value={groupId} onChange={(e) => setGroupId(e.target.value)} required>
                        <option value="" disabled>Select Group</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Member</button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message display */}
            </form>

            <h2>All Members</h2>
            {members.length > 0 ? (
                <ul>
                    {members.map((member) => (
                        <li key={member.id}>
                            {member.name} - {member.role} (Group: {groups.find(group => group.id === member.groupId)?.groupName || 'N/A'})
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => deleteMember(member.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No members found.</p>
            )}
        </div>
    );
};

export default Member;
