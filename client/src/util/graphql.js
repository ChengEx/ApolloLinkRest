import gql from 'graphql-tag';

// export const FETCH_POSTS_QUERY = gql`
//     query getPosts {
//         getPosts @rest(type:"")
//     }
// `;
export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            title
            message
            name
            creator
            tags
            selectedFile
            likes {
                id
                name
            }
            createdAt
        }
    }
`;