import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Member = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');

    // Fetch groups when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/group');
                setGroups(response.data); // Assuming response.data is an array of groups
            } catch (err) {
                console.error('Error fetching groups', err);
                setError('Error fetching groups');
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const memberData = {
            name,
            role,
            groupId: parseInt(groupId, 10), // Ensure groupId is an integer
        };

        try {
            const response = await axios.post('http://localhost:5004/api/member', memberData);
            console.log('Member created:', response.data);
            // Clear fields or show success message as needed
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
        </div>
    );
};

export default Member;
