import { gql } from '@apollo/client';

export const GetStudentsData = gql`
    query {
        students {
            id
            name
            age
        }
    }
`;

export const GetSchoolsData = gql`
    query {
        schools {
            id
            name
        }
    }
`;
