import { Alert, Button, Card, CardContent, Divider, FormLabel, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [stuname, setStuname] = useState('');
    const [stuage, setStuage] = useState('');
    const [subj, setSubj] = useState('');
    const [status1, setStatus1] = useState(false);
    const [status2, setStatus2] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/student', {
                name: stuname,
                subject: subj,
                age: stuage
            });
            setStatus2(true);
        } catch (error) {
            console.log("Error sending data", error)
        }
    }

    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/student');
                setData(response.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [])

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file)

        try {
            await axios.post("http://localhost:5000/api/student/upload", formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            })
            setStatus1(true);
        } catch (error) {
            console.log("Error uploading :", error);
        }
    }

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/student/${_id}`)
            const updateData = data.filter(item => item._id !== _id)
            setData(updateData)
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }

    const handleUpdate = async (_id) => {
        try {
            await axios.put(`http://localhost:5000/api/studentprofiles/${_id}`,
                {
                    name: stuname,
                    subject: subj,
                    age: stuage
                });
        }
        catch (err) {
            console.error("Error updating item;", err)
        }
        alert('Student is updated successfully');
    }

    return (
        <Stack direction="row" spacing={1} style={{ marginLeft: 15, marginTop: 15 }}>
            <Paper elevation={6} sx={{ height: '85vh', width: '30%', backgroundColor: '#F9F891' }}>
                <Stack direction="column">
                    <h4 align="center">Student Bulk posting (note:only upload CSV files)</h4>
                    <Paper sx={{ backgroundColor: '#AED2FF', m: 3 }}>
                        <FormLabel>File upload only in CSV</FormLabel>
                        <TextField type='file' name='file' onChange={handleFileChange} inputProps={{ accept: ".csv" }} />
                        <Button onClick={handleUpload}>Upload</Button>
                        {status1 && <Alert severity='success'>CSV File Upload Successfully</Alert>}
                    </Paper>
                    <Divider sx={{ backgroundColor: "#AED2FF" }} />
                    <Paper sx={{ backgroundColor: '#AED2FF', m: 3 }}>
                        <Card >
                            <Stack direction="column" spacing={3} sx={{ m: 3 }}>
                                <TextField label="Student Name" sx={{ m: 2 }} onChange={(e) => { setStuname(e.target.value) }} />
                                <TextField label="Student Subject" sx={{ m: 2 }} onChange={(e) => { setSubj(e.target.value) }} />
                                <TextField label="Student Age" sx={{ m: 2 }} onChange={(e) => { setStuage(e.target.value) }} />
                                <Button onClick={handleSubmit}>Post Data</Button>
                                {status2 && <Alert severity='success'>Course Inserted Successfully</Alert>}
                            </Stack>
                        </Card>
                    </Paper>
                </Stack>
            </Paper>
            <Paper elevation={6} style={{ marginRight: 15 }} sx={{ height: '85vh', width: '70%', backgroundColor: '#A6FF96' }}>
                <h1 align='center'><font color="#9400FF">Student's Data</font></h1>
                <Grid container spacing={1} sx={{ m: 1 }}>
                    {
                        data.map((item, index) => {
                            return (
                                <Grid item xs={2} sm={3} md={4} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant='h6' component='h5'>
                                                Student Name:{item.name}
                                            </Typography>
                                            <Typography color='primary'>
                                                Student Subject:{item.subject}
                                            </Typography>
                                            <Typography color='textsecondary'>
                                                Student Age:{item.age}
                                            </Typography>
                                            <Stack direction='row' spacing={2}>
                                                <Button onClick={() => handleDelete(item._id)} startIcon={<DeleteIcon />}>Delete</Button>
                                                <Button onClick={() => handleUpdate(item._id)} endIcon={<SendIcon />}>Update</Button>
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

export default Profile;