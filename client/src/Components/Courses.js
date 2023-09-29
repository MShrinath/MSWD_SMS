import { Alert, Button, Card, CardContent, Divider, FormLabel, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from 'react-dotenv';

function Course() {

    const [file, setFile] = useState(null);
    const [status1, setStatus1] = useState(false);
    const [status2, setStatus2] = useState(false);
    const [data, setData] = useState([]);
    const [coursecode, setCourseCode] = useState('');
    const [coursename, setCourseName] = useState('');
    const [year, setYear] = useState('');

    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://mswd-sms.onrender.com/api/course", {
                courseCode: coursecode,
                courseName: coursename,
                year: year
            });
            setStatus2(true);
            console.log(env.REACT_APP_API_URL)
        } catch (error) {
            console.log("Error Sending Data", error);
        }
    }

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file)

        try {
            await axios.post("https://mswd-sms.onrender.com/api/course/upload", formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            })
            setStatus1(true);
        } catch (error) {
            console.log("Error uploading :", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mswd-sms.onrender.com/api/course');
                setData(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [])

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`https://mswd-sms.onrender.com/api/course/${_id}`)
            const updateData = data.filter(item => item._id !== _id)
            setData(updateData)
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    const handleUpdate = async (_id) => {
        try {
            await axios.put(`https://mswd-sms.onrender.com/api/course/${_id}`,
                {
                    coursecode: coursecode,
                    couresename: coursename,
                    year: year
                });
        }
        catch (err) {
            console.error("Error updating item;", err)
        }
        alert('Course is updated successfully');
    }

    return (
        <Stack direction="row" spacing={1} style={{ marginLeft: 15, marginTop: 15 }}>
            <Paper elevation={6} sx={{ height: '85vh', width: '30%', backgroundColor: '#27005D' }}>
                <Stack direction="column">
                    <h4 align="center"><font color='#AED2FF'>Course Bulk posting (note:only upload CSV files)</font></h4>
                    <Paper sx={{ backgroundColor: '#AED2FF', m: 3 }}>
                        <FormLabel>File upload only in CSV</FormLabel>
                        <TextField type='file' name='file' onChange={handleFileChange} inputProps={{ accept: ".csv" }} />
                        <Button onClick={handleUpload}>Upload</Button>
                        {status1 && <Alert severity='success'>CSV File Upload Successfully</Alert>}
                    </Paper>
                    <Divider sx={{ backgroundColor: "#AED2FF" }} />
                    <Paper sx={{ backgroundColor: '#AED2FF', m: 3 }}>
                        <Card sx={{ backgroundColor: '#AED2FF' }}>
                            <Stack direction="column" spacing={3} sx={{ m: 3 }}>
                                <TextField label="Course Code" onChange={(e) => { setCourseCode(e.target.value) }} />
                                <TextField label="Course Name" onChange={(e) => { setCourseName(e.target.value) }} />
                                <TextField label="Year" onChange={(e) => { setYear(e.target.value) }} />
                                <Button variant='contained' onClick={handleSubmit} >POST</Button>
                                {status2 && <Alert severity='success'>Course Inserted Successfully</Alert>}
                            </Stack>
                        </Card>
                    </Paper>
                </Stack>
            </Paper>
            <Paper elevation={6} style={{ marginRight: 15 }} sx={{ height: '85vh', width: '70%', backgroundColor: '#AED2FF' }}>
                <h1 align='center'><font color="#9400FF">Course Data</font></h1>
                <Grid container spacing={1} sx={{ m: 1 }}>
                    {
                        data.map((item, index) => {
                            return (
                                <Grid item xs={2} sm={3} md={4} key={index}>
                                    <Card sx={{ backgroundColor: "#0C356A" }}>
                                        <CardContent>
                                            <Typography variant='h6' component='h5'>
                                                Course Code:{item.courseCode}
                                            </Typography>
                                            <Typography color='primary'>
                                                Course Name:{item.courseName}
                                            </Typography>
                                            <Typography color='textsecondary'>
                                                Year:{item.year}
                                            </Typography>
                                            <Stack direction='row' spacing={2}>
                                                <Button variant='contained' onClick={() => handleDelete(item._id)} startIcon={<DeleteIcon />}>Delete</Button>
                                                <Button variant='contained' onClick={() => handleUpdate(item._id)} endIcon={<SendIcon />}>Update</Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
        </Stack>
    );
}

export default Course;
