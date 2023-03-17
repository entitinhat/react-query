import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Typography, Box, Button, Grid, Input, TextField, ListItemText, ListItemButton, Link } from '@mui/material';
import { Stack } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { GetStudentsData, GetSchoolsData } from './query/queryGraphQL.js';

import { request, gql } from 'graphql-request';

function GetStudents() {
    // const queryClient = useQueryClient();
    // const API_URL = 'https://graphqlzero.almansi.me/api';
    // const fetchPosts = async () => {
    //     const data = await request(
    //         API_URL,
    //         gql`
    //             query {
    //                 posts {
    //                     data {
    //                         id
    //                         title
    //                     }
    //                 }
    //             }
    //         `,
    //     );
    //     // console.log(data.posts.data[0])
    //     return data.posts.data;
    // };

    const localAPI = 'http://localhost:3333/graphql';

    const fetchGQL = async () => {
        const data = await request(localAPI, GetStudentsData);
        return data.students;
    };

    const fetchGQLSchool = async () => {
        const data = await request(localAPI, GetSchoolsData);
        return data.schools;
    };

    const { isLoading, error, data: dataStudents } = useQuery('studentsGQL', fetchGQL);
    const { data: dataSchools } = useQuery('schoolsGQL', fetchGQLSchool);
    return (
        <div className="">
            GraphQL with React Query Fetching from local API
            <Link href={localAPI}> http://localhost:3333/graphql </Link>
            <Box sx={{ marginTop: 3, fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ marginRight: 10 }}>
                    <Typography variant="h5">Lists of students available </Typography>

                    {dataStudents?.map((post) => (
                        <p key={post.id}>{post.name}</p>
                    ))}
                </Stack>

                <Stack>
                    <Typography variant="h5">Lists of schools available </Typography>
                    {dataSchools?.map((post) => (
                        <p key={post.id}>{post.name}</p>
                    ))}
                </Stack>
            </Box>
        </div>
    );
}

export default GetStudents;
