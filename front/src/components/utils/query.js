import {gql} from "@apollo/client"

export const UsersQuery = gql`
    {
        Users{
            name
            id
        }
    }
`