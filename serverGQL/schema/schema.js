const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Student {
        id: ID
        name: String
        age: Int
        school: School
    }

    type School {
        id: ID!
        name: String   
        students: [Student]
    }

    type Query {
        students: [Student]
        student(id: ID!): Student
        schools: [School] 
        school(id: ID!): School
    }

    type Mutation {
        createSchool(id: ID!,name:String): School
        createStudent(id: ID!, name:String, age: Int, schoolId: ID!): Student
    }
`

module.exports = typeDefs;