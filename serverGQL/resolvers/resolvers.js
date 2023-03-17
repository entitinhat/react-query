
const {students, schools} = require('../data/data')

const resolvers = {
    Query: {
        students: () => students,
        student: (parent, args) => students.find((student) => student.id == args.id),
        schools: () => schools,
        school: (parent, args) => schools.find(school => school.id == args.id),
    },
    Student: {
        school: (parent) => schools.find(school => school.id == parent.schoolId)
    },
    School: {
        students: (parent, args) => students.filter(student => student.schoolId == parent.id)
    },
    Mutation: {
        createSchool: (parent, args) => args,
        createStudent: (parent, args) => args,
    }

}

module.exports = resolvers;