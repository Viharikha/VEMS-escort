import React from 'react';
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header">
        <div className="header-image">
          <img 
            src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724230890/2024-EQB250-SUV-AVP-DR_mywna5.webp" 
            alt="Car" 
            className="car-image" 
          />
        </div>
        <div className="header-info">
          <h2>TN 01AB 1234</h2>
          <p>Maruti Suzuki</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Statistics Section */}
        <div className="statistics">
          <div className="stat-item">
            <h3>Total Distance</h3>
            <p>3000 km</p>
          </div>
          <div className="stat-item">
            <h3>Total Hours</h3>
            <p>108h 30m</p>
          </div>
          <div className="stat-item">
            <h3>Total Trips</h3>
            <p>64</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="buttons-box">
          <h3>Actions</h3>
          <div className="buttons">
            <button className="button">Vehicle Details</button>
            <button className="button">Live Tracking</button>
            <button className="button">Trip History</button>
            <button className="button">Service History</button>
            <button className="button">Drivers Used</button>
          </div>
        </div>

        {/* Vehicle Info Section */}
        <div className="vehicle-info">
          <h3>Vehicle Info</h3>
          <div className="vehicle-info-content">
            <img 
              src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724230890/2024-EQB250-SUV-AVP-DR_mywna5.webp" 
              alt="Vehicle" 
              className="vehicle-image" 
            />
            <div className="vehicle-details">
              <div className="vehicle-detail-item">
                <p>TN 01AB 1234</p>
                <p>Maruti Suzuki</p>
              </div>
              <div className="vehicle-detail-item">
                <p>Engine number: 1234</p>
                <p>Seating Capacity: 4</p>
              </div>
              <div className="vehicle-detail-item">
                <p>Year of Manufacture: 2003</p>
                <p>Mileage Range: 15-20 km/l</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info Section */}
        <div className="driver-info">
          <h3>Currently Assigned Driver Info</h3>
          <p>Name: John Doe</p>
          <p>Phone: 1234567890</p>
          <p>Gender: Male</p>
          <p>Age: 30</p>
          <p>Address: 123 Main Street</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;