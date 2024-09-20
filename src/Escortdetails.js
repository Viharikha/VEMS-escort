import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Escortdetails.css'; 

const Escortdetails = () => {
    const [escort, setEscort] = useState(null);
    const { EscortName } = useParams();

    useEffect(() => {
        const fetchEscort = async () => {
            try {
                const response = await axios.get(`http://localhost:8002/escorts/${EscortName}`);
                if (response && response.data) {
                    setEscort(response.data);
                } else {
                    console.error('Unexpected response format:', response);
                    alert('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching escort details:', error.response || error.messAge);
                alert('Failed to fetch escort details. Please check the console for more information.');
            }
        };

        fetchEscort();
    }, [EscortName]);

    return (
        <div className="escort-detail-container">
            {escort ? (
                <>
                    <div className="profile-header">
                        <img 
                            src={`http://localhost:8002/uploads/${escort.EscortProfilePicUpload}`} 
                            alt="Escort Profile"
                            className="profile-pic"
                        />
                       <div className="escort-name-section">
                            <h1>{escort.EscortName}</h1>
                            <div className="icon-container">
                                <i className="fas fa-comment" title="MessAge"></i>
                                <i className="fas fa-phone" title="Call"></i>
                                <i className="fas fa-paper-plane" title="Send"></i>
                                <i className="fas fa-bell" title="Notifications"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="escort-info-container">
                        <div className="escort-info">
                            
                            <p><strong>Contact Number:</strong> {escort.ContactNumber}</p>
                            <p><strong>Age:</strong> {escort.Age}</p>
                        </div>
                        <div className="escort-info">
                            
                            <p><strong>Address:</strong> {escort.Address}</p>
                        </div>
                    </div>

                    <div className="details-container">
                        <div className="uploaded-documents">
                            <h3>Uploaded Documents</h3>
                            <div className="document-grid">
                                
                                <div className="document">
                                    <p><strong>Aadhar Card:</strong></p>
                                    {escort.AadharCardUpload ? (
                                        <a href={`http://localhost:8000/uploads/${escort.AadharCardUpload}`} download>
                                            <button>Download Aadhar Card</button>
                                        </a>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>
                                
                                <div className="document">
                                    <p><strong>Agreement:</strong></p>
                                    {escort.CertificationUpload ? (
                                        <a href={`http://localhost:8000/uploads/${escort.CertificationUpload}`} download>
                                            <button>Download Agreement</button>
                                        </a>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="escort-bank-details">
                            <h3>Bank Details</h3>

                             <div className="bank-details">
                                <div className="bank-details-left">
                                    <p><strong>Account Handler Name:</strong> {escort.AccountHandlerName}</p>
                                    <p><strong>Account Number:</strong> {escort.AccountNumber}</p>
                                    <p><strong>Bank Name:</strong> {escort.BankName}</p>
                                </div>
                                <div className="bank-details-right">
                                    <p><strong>Branch Name:</strong> {escort.BranchName}</p>
                                    <p><strong>IFSC Code:</strong> {escort.IFSCCode}</p>
                                    <p><strong>Shift:</strong> {escort.Shift}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Escortdetails;
