import React, { useState, useEffect } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from "axios";

function DeleteFaculty() {
    const [facultyDetails, setFacultyDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/faculty`);
                setFacultyDetails(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [])

    const deleteFaculty = async (_id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/faculty/${_id}`)
            const updatedFaculty = facultyDetails.filter(faculty => faculty._id !== _id)
            setFacultyDetails(updatedFaculty);
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    return (
        <div>
            <h2 align='center'>Delete Faculty</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: 'antiquewhite', fontWeight: "bold" }}>
                        <TableRow>
                            <TableCell>Faculty Name</TableCell>
                            <TableCell>Faculty ID</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Qualification</TableCell>
                            <TableCell>Desgination</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            facultyDetails.map((faculty) => (
                                <TableRow key={faculty._id}>
                                    <TableCell>{faculty.facultyName}</TableCell>
                                    <TableCell>{faculty.facutlyID}</TableCell>
                                    <TableCell>{faculty.facultyDept}</TableCell>
                                    <TableCell>{faculty.qualification}</TableCell>
                                    <TableCell>{faculty.designation}</TableCell>
                                    <TableCell>{faculty.email}</TableCell>
                                    <TableCell><Button variant="contained" onClick={() => deleteFaculty(faculty._id)}>Delete</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default DeleteFaculty;