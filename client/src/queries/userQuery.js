// Import everything needed to use the `useQuery` hook
import { gql } from "@apollo/client/core";

const GET_USERS = gql`
  query users {
    users {
      id
      username
      branch {
        branchName
      }
    }
  }
`;

const GET_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      id
      username
      branch {
        branchName
      }
    }
  }
`;

export { GET_USERS, GET_USER };
