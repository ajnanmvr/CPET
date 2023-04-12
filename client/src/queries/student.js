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
const MY_VERIFIED_STUDENTS = gql`
  query myVerifiedStudents($adminId: ID!, $classId: ID!) {
    myVerifiedStudents(adminId: $adminId, classId: $classId) {
      id
      studentName
      district
      verified
      fatherName
      dob
      place
    }
  }
`;

const BRANCH_STUDENTS = gql`
  query getBranchStudents($branchId: ID!, $class: ID) {
    branchStudents(branchId: $branchId, class: $class) {
      studentName
      class
      verified
      id
    }
  }
`;

export { GET_STUDENTS, BRANCH_STUDENTS, MY_VERIFIED_STUDENTS };
