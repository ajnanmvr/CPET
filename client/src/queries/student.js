// Import everything needed to use the `useQuery` hook
import { gql } from "@apollo/client";

const GET_STUDENTS = gql`
  query students {
    students {
      id
      studentName
      branch
      class
    }
  }
`;

const BRANCH_STUDENTS = gql`
  query getBranchStudents($branchId: ID!) {
    branchStudents(branchId: $branchId) {
      studentName
      class
      verified
      id
    }
  }
`;

export { GET_STUDENTS, BRANCH_STUDENTS };
