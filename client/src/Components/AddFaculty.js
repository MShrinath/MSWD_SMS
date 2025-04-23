import React, { useState } from "react";
import "../App.css";
import { Button, Grid, TextField, Alert } from "@mui/material";
import axios from "axios";

function AddFaculty() {
    const [facultyName, setFacultyName] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [department, setDepartment] = useState("");
    const [qualification, setQualification] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status1, setStatus1] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://mswd-sms.onrender.com/api/faculty", {
                facultyName: facultyName,
                facultyDept: department,
                facutlyID: facultyId,
                qualification: qualification,
                designation: designation,
                email: email,
                password: password,
            })
            setStatus1(true)
        } catch (error) {
            console.log("Error in Sending Data ", error)
        }
    };

    const handleRefresh = () => {
        window.location.reload(false)
    }

    return (
        <div className="App">
            <h2 align="center">Add Faculty</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Faculty Name"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setFacultyName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Faculty ID"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setFacultyId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Department"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Qualification"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Desgination"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Email"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value="KLU123"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled
                    />
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                    <Button variant="contained" onClick={handleSubmit}>
                        SAVE
                    </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                    <Button variant="contained" onClick={handleRefresh}>
                        REFRESH
                    </Button>
                </Grid>
            </Grid>
            {status1 && <Alert severity='success' sx={{ display: "flex", justifyContent: "center" }}>Faculty Added</Alert>}
        </div>
    );
}

export default AddFaculty;
