// Import everything needed to use the `useQuery` hook
import { gql } from "@apollo/client/core";

const GET_BRANCHES = gql`
  query GetBranches {
    branches {
      id
      branchName
      phone1
      place 
      district
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
      phone1
      district
      place
      pinCode
      postOffice
      imageCover
    }
  }
`;

export { GET_BRANCHES, GET_BRANCH };
