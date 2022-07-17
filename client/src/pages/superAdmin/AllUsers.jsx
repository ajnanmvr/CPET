import Axios from "../../Axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries/userQuery";

function AllUsers() {
  const { data, error, loading } = useQuery(GET_USERS);

  const deleteUser = async (id) => {
    try {
      if (window.confirm("Do you want to delete?")) {
        await Axios.delete("/auth/user/" + id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (error)
    return <h1 className="text-center text-red-600">Something Went Wrong </h1>;
  if (loading)
    return <h1 className="text-center text-blue-600">Loading .. </h1>;
  if (!error && !loading) {
    return (
      <>
        <div className="flex flex-col">
          <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
            All users
          </h3>
          <div className="w-full mx-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                {data.users.length > 0 && <UsersTable />}
                <div className="overflow-hidden h-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function UsersTable() {
    return (
      <div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      USERNAME
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      BRANCH
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      EDIT
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user, index) => (
                    <tr className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap uppercase">
                        {user.username}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.branch?.branchName}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link to={"/edit-user/" + user.id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteUser(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllUsers;
