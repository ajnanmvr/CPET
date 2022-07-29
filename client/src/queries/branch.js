// Import everything needed to use the `useQuery` hook
import { gql } from "@apollo/client/core";

const GET_BRANCHES = gql`
  query GetBranches {
    branches {
      id
      branchName
      phone
      admin {
        username
      }
    }
  }
`;
const GET_BRANCH = gql`
  query GetBranches($id: ID!) {
    branch(id: $id) {
      branchName
      image
      phone
      district
      place
      pinCode
      postOffice
    }
  }
`;

export { GET_BRANCHES, GET_BRANCH };
