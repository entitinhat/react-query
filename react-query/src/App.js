import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request, gql } from 'graphql-request';
import { GetStudentsData } from './query/queryGraphQL.js';
import './App.css';
import { Typography, Box, Button, Grid, Input, TextField, ListItemText, ListItemButton } from '@mui/material';
import { Stack } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { green } from '@mui/material/colors';
import GetStudents from './GetStudents';

const students = [
    {
        id: 1,
        name: 'nhat',
        age: 22,
    },
    {
        id: 2,
        name: 'Nguyen',
        age: 10,
    },
];

function App() {
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [currentId, setCurrentId] = useState(2);
    const queryClient = useQueryClient(); // return the QueryClient instance
    const getStudents = () => {
        // Call API here, tạm thời chưa tìm được API thích hợp
        return [...students];
    };

    const fetchGQL = async () => {
        const data = await request('http://localhost:3333/graphql', GetStudentsData);
        console.log(data.students);
        return data.students;
    };

    // const fetchAPI = async () => {
    //     const result = await axios.get('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=5%27')
    //     return result.data
    //   }
    // const { isLoading, isError, data } = useQuery({
    //     queryKey: ['student'],
    //     queryFn: getStudents,
    //     retry: 0,
    // });

    const { isLoading, isError, data } = useQuery({
        queryKey: ['student'],
        queryFn: getStudents,
        retry: 0,
    });

    const addNewStudent = (name, age) => {
        return students.push({
            id: setCurrentId((currentId) => currentId + 1),
            name: newName,
            age: newAge,
        });
    };

    const newMutation = useMutation({
        mutationFn: addNewStudent,
        onSuccess: () => {
            queryClient.invalidateQueries('student');
        },
    });
    if (isLoading) {
        return <span>Loading ... </span>;
    }
    if (isError) {
        return <span>Error happening!!!</span>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        newMutation.mutate({ newName, newAge });
    };

    return (
        <div className="App">
            <Stack spacing={3} marginBottom={3}>
                <Typography sx={{ fontFamily: 'cursive' }} variant="h3" padding={2} bgcolor="#1565c0" color="white">
                    Create New Student with React Query
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h4">Current number of students: {currentId}</Typography>
                            {data?.map((student) => (
                                <ListItemButton component="a">
                                    <PersonIcon sx={{ marginRight: '10px' }} />
                                    <ListItemText primary={`Name: ${student.name}, Age: ${student.age}`} />
                                </ListItemButton>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <TextField
                                    label="name"
                                    name="name"
                                    sx={{ marginRight: 10, marginBottom: 3 }}
                                    onChange={(e) => setNewName(e.target.value)}
                                ></TextField>
                                <TextField
                                    label="age"
                                    name="age"
                                    sx={{ marginRight: 10, marginBottom: 3 }}
                                    onChange={(e) => setNewAge(e.target.value)}
                                ></TextField>
                                <Button
                                    sx={{ marginRight: 10, marginBottom: 3, padding: 2 }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {' '}
                                    Create new user
                                </Button>
                            </Stack>
                        </form>
                    </Grid>
                </Grid>
            </Stack>
            <GetStudents />
        </div>
    );
}

export default App;
