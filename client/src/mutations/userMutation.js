const { gql } = require("@apollo/client");

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      username
    }
  }
`;

export { DELETE_USER };
