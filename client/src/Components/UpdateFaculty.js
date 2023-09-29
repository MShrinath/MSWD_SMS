import React, { useState } from "react";
import "../App.css";
import { Button, Grid, TextField, Alert } from "@mui/material";
import axios from "axios";

function UpdateFaculty() {
    const [faculty, setFaculty] = useState(null);
    const [status1, setStatus1] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFaculty({...faculty,[name]:value})
    }

    const handleClick = () => {
        //get the faculty data from server based on ID
        //set the faculty to the sata
        // setFaculty(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //updating faculty data
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div className="App">
            <h2 align="center">Update Faculty</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Faculty Name"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.facultyName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Faculty ID"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.facutlyID}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Department"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.facultyDept}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Qualification"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.qualification}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Desgination"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.designation}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Email"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value={faculty?.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{ alignContent: "center" }}>
                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        sx={{ width: 300, height: 30 }}
                        value="KLU123"
                        disabled
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={handleClick}>
                        Get Faculty
                    </Button>
                </Grid>
                {
                    faculty && (
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button variant="contained" onClick={handleSubmit} >
                                UPDATE
                            </Button>
                        </Grid>)
                }
            </Grid>
            {status1 && <Alert severity='success' sx={{ display: "flex", justifyContent: "center" }}>Faculty Updated</Alert>}
        </div>
    );
}
export default UpdateFaculty;