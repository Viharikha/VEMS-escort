const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// MySQL connection setup
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo',  
    port: 3307
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL!');
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Corrected multer diskStorage usage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get('/escorts', (req, res) => {
    const sql = "SELECT * FROM escort";  
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Failed to fetch data", error: err });
        }
        res.status(200).json({ data: result });
    });
});

app.get('/escorts/:id', (req, res) => {
    const vendorId = req.params.id;
    const sql = "SELECT * FROM escort WHERE EscortName = ?";
    
    con.query(sql, [vendorId], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Failed to fetch data", error: err });
        }
        if (result.length > 0) {
            res.status(200).json(result[0]); 
        } else {
            res.status(404).json({ message: "Vendor not found" });
        }
    });
});

app.put('/escorts/:EscortName', upload.fields([
    { name: 'AadharCardUpload', maxCount: 1 },
    { name: 'CertificationUpload', maxCount: 1 },
    { name: 'EscortProfilePicUpload', maxCount: 1 }
]), (req, res) => {
    const EscortName = req.params.EscortName;
    const {
        ContactNumber,
        Age,
        Address,
        AccountHandlerName,
        AccountNumber,
        BankName,
        BranchName,
        IFSCCode,
        Shift
    } = req.body;

    const AadharCardUpload = req.files['AadharCardUpload'] ? req.files['AadharCardUpload'][0].filename : null;
    const CertificationUpload = req.files['CertificationUpload'] ? req.files['CertificationUpload'][0].filename : null;
    const EscortProfilePicUpload = req.files['EscortProfilePicUpload'] ? req.files['EscortProfilePicUpload'][0].filename : null;

    const sql = `UPDATE escort SET 
        ContactNumber = ?, Age = ?, Address = ?,
        AadharCardUpload = ?, CertificationUpload = ?, EscortProfilePicUpload = ?,
        AccountHandlerName = ?, AccountNumber = ?, BankName = ?, BranchName = ?, IFSCCode = ?, Shift = ?
        WHERE EscortName = ?`;

    con.query(sql, [
        ContactNumber, Age, Address,
        AadharCardUpload, CertificationUpload, EscortProfilePicUpload,
        AccountHandlerName, AccountNumber, BankName, BranchName, IFSCCode, Shift,
        EscortName
    ], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: "Failed to update escort", error: err });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Escort updated successfully" });
        } else {
            res.status(404).json({ message: "Escort not found" });
        }
    });
});

app.delete('/escorts/:EscortName', (req, res) => {
    const EscortName = req.params.EscortName;

    const sql = "DELETE FROM escort WHERE EscortName = ?";

    con.query(sql, [EscortName], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ message: "Failed to delete escort", error: err });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Escort deleted successfully" });
        } else {
            res.status(404).json({ message: "Escort not found" });
        }
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/register', upload.fields([
    { name: 'AadharCardUpload', maxCount: 1 },
    { name: 'CertificationUpload', maxCount: 1 },
    { name: 'EscortProfilePicUpload', maxCount: 1 }  
]), (req, res) => {
    try {
        const {
            EscortName,
            ContactNumber,
            Age,
            Address,
            AccountHandlerName,
            AccountNumber,
            BankName,
            BranchName,
            IFSCCode,
            Shift
        } = req.body;

        const AadharCardUpload = req.files['AadharCardUpload'] ? req.files['AadharCardUpload'][0].filename : null;
        const CertificationUpload = req.files['CertificationUpload'] ? req.files['CertificationUpload'][0].filename : null;
        const EscortProfilePicUpload = req.files['EscortProfilePicUpload'] ? req.files['EscortProfilePicUpload'][0].filename : null;

        const sql = `INSERT INTO escort (EscortName, ContactNumber, Age, Address, AadharCardUpload, CertificationUpload, EscortProfilePicUpload, AccountHandlerName, AccountNumber, BankName, BranchName, IFSCCode, Shift) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        con.query(sql, [
            EscortName, ContactNumber, Age, Address, AadharCardUpload, CertificationUpload, EscortProfilePicUpload,
            AccountHandlerName, AccountNumber, BankName, BranchName, IFSCCode, Shift
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: "Failed to register escort", error: err });
            }
            res.status(200).json({ message: "Escort registered successfully", result });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: "An unexpected error occurred", error });
    }
});

const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
