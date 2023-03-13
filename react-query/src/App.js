import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {useQuery, useQueryClient} from 'react-query'
import './App.css';

function App() {
  const queryClient = useQueryClient()
  
  useEffect(() => {
    
  fetchAPI();
  }, [])
  
  const fetchAPI = async () => {
    const data = axios.get('https://jsonplaceholder.typicode.com/posts')
    // console.log(data)
  }
  const {isLoading, isError} = useQuery('fetchAPI', fetchAPI) 
  if (isLoading) {
    return <span>Loading ... </span>
  }
  if (isError) {
    return <span>Error happening!!!</span>
  }
 
  return (
    <div className="App">
        <h2>Hello react query</h2>
    </div>
  )
}

export default App;
