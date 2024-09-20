import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css'; 
import './Register.css';


const Registers = () => {
  
  const [EscortName, setEscortName] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Age, setAge] = useState('');
  const [Address, setAddress] = useState('');
  
  const [AadharCardUpload, setAadharCardUpload] = useState(null);
 
  const [CertificationUpload, setCertificationUpload] = useState(null);
  const [EscortProfilePicUpload, setEscortProfilePicUpload] = useState(null);
  const [AccountHandlerName, setAccountHandlerName] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [BankName, setBankName] = useState('');
  const [BranchName, setBranchName] = useState('');
  const [IFSCCode, setIFSCCode] = useState('');
  const [Shift, setShift] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('EscortName', EscortName);
    formData.append('ContactNumber', ContactNumber);
    formData.append('Age', Age);
    
    formData.append('Address', Address);
    
    formData.append('AadharCardUpload', AadharCardUpload);
    
    formData.append('CertificationUpload', CertificationUpload);
    formData.append('EscortProfilePicUpload', EscortProfilePicUpload);
    formData.append('AccountHandlerName', AccountHandlerName);
    formData.append('AccountNumber', AccountNumber);
    formData.append('BankName', BankName);
    formData.append('BranchName', BranchName);
    formData.append('IFSCCode', IFSCCode);
    formData.append('Shift', Shift);

    try {
      const response = await axios.post('http://localhost:8002/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response && response.data) {
        alert('Registration Successfull');
        navigate('/'); // Redirect to the updated route for viewing escorts
      } else {
        alert('Unexpected response format');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        if (error.response.data) {
          alert('Registration failed: ' + error.response.data.messAge);
        } else {
          alert('Error response format is unexpected');
        }
      } else if (error.request) {
        alert('No response received from server');
      } else {
        alert('Error setting up request: ' + error.messAge);
      }
    }
  };

  return (
    <div className="escort-registration-container">
      <h2>Escort Registration</h2>
      <form onSubmit={handleSubmit} className="escort-registration-form">
        
        <div>
          <label htmlFor="EscortName">Escort Name</label>
          <input
            type="text"
            id="EscortName"
            value={EscortName}
            onChange={(e) => setEscortName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ContactNumber">Contact Number</label>
          <input
            type="text"
            id="ContactNumber"
            value={ContactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Age">Age</label>
          <input
            type="text"
            id="Age"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="AadharCardUpload">Aadhar Card Upload</label>
          <input
            type="file"
            id="AadharCardUpload"
            onChange={handleFileChange(setAadharCardUpload)}
            required
          />
        </div>
       
        <div>
          <label htmlFor="CertificationUpload">Certification Upload</label>
          <input
            type="file"
            id="CertificationUpload"
            onChange={handleFileChange(setCertificationUpload)}
            required
          />
        </div>
        <div>
          <label htmlFor="EscortProfilePicUpload">Escort Profile Pic Upload</label>
          <input
            type="file"
            id="EscortProfilePicUpload"
            onChange={handleFileChange(setEscortProfilePicUpload)}
            required
          />
        </div>
        <div>
          <label htmlFor="AccountHandlerName">Account Handler Name</label>
          <input
            type="text"
            id="AccountHandlerName"
            value={AccountHandlerName}
            onChange={(e) => setAccountHandlerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="AccountNumber">Account Number</label>
          <input
            type="text"
            id="AccountNumber"
            value={AccountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BankName">Bank Name</label>
          <input
            type="text"
            id="BankName"
            value={BankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="BranchName">Branch Name</label>
          <input
            type="text"
            id="BranchName"
            value={BranchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="IFSCCode">IFSC Code</label>
          <input
            type="text"
            id="IFSCCode"
            value={IFSCCode}
            onChange={(e) => setIFSCCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Shift">Shift</label>
          <input
            type="text"
            id="Shift"
            value={Shift}
            onChange={(e) => setShift(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Escort</button>
      </form>
    </div>
  );
};

export default Registers;
