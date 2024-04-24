import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DisplayTransfers = ({ transfers, setPlayerDeleted, setPlayerEdited }) => {
    const [editingTransferId, setEditingTransferId] = useState(null);
    const [editedTransfer, setEditedTransfer] = useState({});

    const handleEdit = (transferId) => {
        setEditingTransferId(transferId);
        // Set initial values for edited transfer
        const transfer = transfers.find((transfer) => transfer._id === transferId);
        setEditedTransfer({ ...transfer });
    };

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8000/api/delete/${id}`)
            .then(response =>{
                console.log(response.data);
                setPlayerDeleted(true)
                // Handle successful deletion if needed
            })
            .catch(error =>{
                console.error('Error deleting transfer:', error);
                // Handle error
            });
    }

    const handleSave = () => {
        // Save edited transfer
        axios.put(`http://localhost:8000/api/edit/${editingTransferId}`, editedTransfer)
            .then((response) => {
                console.log(response.data);
                setEditingTransferId(null);
                setPlayerEdited(true)
                // Optionally, update state to reflect the changes
            })
            .catch((error) => {
                console.error('Error saving transfer:', error);
                // Handle error
            });
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Player Position</th>
                        <th>Previous School</th>
                        <th>New School</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers &&
                        transfers.map((transfer) => (
                            <tr key={transfer._id}>
                                <td>{editingTransferId === transfer._id ? <input type="text" value={editedTransfer.name} onChange={(e) => setEditedTransfer({ ...editedTransfer, name: e.target.value })} /> : transfer.name}</td>
                                <td>{editingTransferId === transfer._id ? <input type="text" value={editedTransfer.position} onChange={(e) => setEditedTransfer({ ...editedTransfer, position: e.target.value })} /> : transfer.position}</td>
                                <td>{editingTransferId === transfer._id ? <input type="text" value={editedTransfer.old_team} onChange={(e) => setEditedTransfer({ ...editedTransfer, old_team: e.target.value })} /> : transfer.old_team}</td>
                                <td>{editingTransferId === transfer._id ? <input type="text" value={editedTransfer.new_team} onChange={(e) => setEditedTransfer({ ...editedTransfer, new_team: e.target.value })} /> : transfer.new_team}</td>
                                <td onClick={() => handleDelete(transfer._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </td>
                                <td>
                                    {editingTransferId === transfer._id ? (
                                        <FontAwesomeIcon icon={faSave} onClick={()=>handleSave()} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(transfer._id)} />
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DisplayTransfers;
