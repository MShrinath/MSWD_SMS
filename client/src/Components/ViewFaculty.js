import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from "axios";

function ViewFaculty() {
    const [facultyDetails, setFacultyDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/faculty');
                setFacultyDetails(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [])

    return (
        <div>
            <h2 align='center'>Faculty Details</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{backgroundColor :'antiquewhite',fontWeight:"bold"}}>
                        <TableRow>
                            <TableCell>Faculty Name</TableCell>
                            <TableCell>Faculty ID</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Qualification</TableCell>
                            <TableCell>Desgination</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            facultyDetails.map((faculty)=>(
                                <TableRow key={faculty._id}>
                                    <TableCell>{faculty.facultyName}</TableCell>
                                    <TableCell>{faculty.facutlyID}</TableCell>
                                    <TableCell>{faculty.facultyDept}</TableCell>
                                    <TableCell>{faculty.qualification}</TableCell>
                                    <TableCell>{faculty.designation}</TableCell>
                                    <TableCell>{faculty.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ViewFaculty;