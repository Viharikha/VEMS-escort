import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css'; 

const User = () => {
    const [escorts, setEscorts] = useState([]);
    const [editingEscort, setEditingEscort] = useState(null);
    const [editForm, setEditForm] = useState({
        ContactNumber: '',
    Age: '',
    Shift: '',
    Address: '',
    AccountHandlerName: '',
    AccountNumber: '',
    BankName: '',
    BranchName: '',
    IFSCCode: '',
    AadharCardUpload: null,
    CertificationUpload: null,
    EscortProfilePicUpload: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEscorts = async () => {
            try {
                const response = await axios.get('http://localhost:8002/escorts');
                if (response && response.data) {
                    setEscorts(response.data.data); 
                } else {
                    alert('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data');
            }
        };

        fetchEscorts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleEditClick = (escort) => {
        setEditingEscort(escort.EscortName);
        setEditForm({
            ContactNumber: escort.ContactNumber,
            Age: escort.Age,
            Shift: escort.Shift,
            
    
    Address: escort.Address,
    AccountHandlerName: escort.AccountHandlerName,
    C: escort.AccountNumber,
    BankName: escort.BankName,
    BranchName: escort.BranchName,
    IFSCCode: escort.IFSCCode,
    AadharCardUpload: escort.AadharCardUpload,
    CertificationUpload: escort.certificatioUpload,
    EscortProfilePicUpload: escort.EscortProfilePicUpload,
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in editForm) {
                formData.append(key, editForm[key]);
            }
            const response = await axios.put(`http://localhost:8002/escorts/${editingEscort}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                alert('Escort updated successfully');
                setEditingEscort(null);
                setEditForm({
                    ContactNumber: '',
    Age: '',
    Shift: '',
    Address: '',
    AccountHandlerName: '',
    AccountNumber: '',
    BankName: '',
    BranchName: '',
    IFSCCode: '',
    AadharCardUpload: null,
    CertificationUpload: null,
    EscortProfilePicUpload: null,
                });
                // Refetch data to update the list
                const fetchData = async () => {
                    try {
                        const response = await axios.get('http://localhost:8002/escorts');
                        if (response && response.data) {
                            setEscorts(response.data.data);
                        } else {
                            alert('Unexpected response format');
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        alert('Failed to fetch data');
                    }
                };
                fetchData();
            } else {
                alert('Failed to update escort');
            }
        } catch (error) {
            console.error('Error updating escort:', error);
            alert('Failed to update escort');
        }
    };
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: files[0]
        }));
    };
    const handleDelete = async (EscortName) => {
        try {
            await axios.delete(`http://localhost:8002/escorts/${EscortName}`);
            // Refresh the data after deletion
            setEscorts(escorts.filter(escort => escort.EscortName !== EscortName));
        } catch (error) {
            console.error('Error deleting escort:', error);
            alert('Failed to delete escort');
        }
    };

    const handleView = (id) => {
        navigate(`/Escortdetails/${id}`);
    };

    const handleAddEscort = () => {
        navigate('/Registers');
    };

    return (
        <div className="show-data-container">
            <h2>Registered Escorts</h2>
            <div className="button-container">
                <button className="add-vendor-button" onClick={handleAddEscort}>Add Escort</button>
            </div>
            {editingEscort ? (
                <form onSubmit={handleEdit}>
                    <h3>Edit Escort</h3>
                    <label>
                        Contact Number:
                        <input
                            type="text"
                            name="ContactNumber"
                            value={editForm.ContactNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            type="text"
                            name="Age"
                            value={editForm.Age}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Shift:
                        <input
                            type="text"
                            name="Shift"
                            value={editForm.Shift}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="Address"
                            value={editForm.Address}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Account Handler Name:
                        <input
                            type="text"
                            name="AccountHandlerName"
                            value={editForm.AccountHandlerName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Account Number:
                        <input
                            type="text"
                            name="AccountNumber"
                            value={editForm.AccountNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Bank Name:
                        <input
                            type="text"
                            name="BankName"
                            value={editForm.BankName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Branch Name:
                        <input
                            type="text"
                            name="BranchName"
                            value={editForm.BranchName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        IFSC Code:
                        <input
                            type="text"
                            name="IFSCCode"
                            value={editForm.IFSCCode}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Aadhar Card Upload:
                        <input
                            type="file"
                            name="AadharCardUpload"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        Certification Upload:
                        <input
                            type="file"
                            name="CertificationUpload"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        Escort Profile Pic Upload:
                        <input
                            type="file"
                            name="EscortProfilePicUpload"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditingEscort(null)}>Cancel</button>
                </form>
            ) : (
                escorts.length > 0 && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Escort Name</th>
                                <th>Contact Number</th>
                                <th>Age</th>
                                <th>Shift</th>
                                <th>Actions</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {escorts.map((escort) => (
                                <tr key={escort.EscortName}>
                                    <td>{escort.EscortName}</td>
                                    <td>{escort.ContactNumber}</td>
                                    <td>{escort.Age}</td>
                                    <td>{escort.Shift}</td>
                                    <td>
                                        <button className="action-button" onClick={() => handleEditClick(escort)}>Edit</button>
                                        <button className="action-button" onClick={() => handleDelete(escort.EscortName)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="action-button" onClick={() => handleView(escort.EscortName)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}
export default User;
