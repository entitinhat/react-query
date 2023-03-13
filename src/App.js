import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query'
import './App.css';

const students=[
  {
    id: 1, name:'Nhat'
  },
  {
    id: 2, name: 'Nguyen'
  }
]

function App() {
  const queryClient = useQueryClient()
  const getStudentsFunction = () => {
    return [...students]
  }
  const getStudents = useQuery({
    queryKey: 'students',
    queryFn: getStudentsFunction,
  })
  
  const addNewStudent = (name) => {
    return students.push({
      id: Math.floor(Math.random() * 8) + 3,
      name: name
    })
  }

  const newMutation = useMutation({
    mutationFn: addNewStudent,
    onSuccess: () => {
      queryClient.invalidateQueries('students')
    }
  })
  
  console.log(students)

  

  // const fetchAPI = async () => {
  //   const data = axios.get('https://jsonplaceholder.typicode.com/posts')
  //   return data
  // }
  // const {isLoading, isError} = useQuery('fetchAPI', fetchAPI) 
  // if (isLoading) {
  //   return <span>Loading ... </span>
  // }
  // else if (isError) {
  //   return <span>Error happening!!!</span>
  // }

   if (getStudents.isLoading) {
      return <span>Loading ... </span>
    }
    if (getStudents.isError) {
      return <span>Error happening!!!</span>
    }


  return (
    <div className="App">
        <h2>Hello react query</h2>
        {getStudents.data.map(student=> (
          <div key={student.id}>{student.name}</div>
        ))}
        <button disabled={newMutation.isLoading} onClick={()=> newMutation.mutate('Duy Hoang')}>Add new student</button>
    </div>
  )
}

export default App;
