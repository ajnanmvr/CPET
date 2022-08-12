import { useQuery } from "@apollo/client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import { GET_USERS } from "../../queries/userQuery";
function AllUsers() {
  const { data, error, loading, refetch } = useQuery(GET_USERS);

  // const deleteUser = async (id) => {
  //   try {
  //     if (window.confirm("Do you want to delete?")) {
  //       let data = await Axios.delete("/auth/user/" + id);
  //       if (data.status === 200) {
  //         refetch();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          All users
        </h3>
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {data?.users.length > 0 ? <UsersTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function UsersTable() {
    return (
      <div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      USERNAME
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      BRANCH
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      EDIT
                    </th>
                    {/* <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      DELETE
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((user, index) => (
                    <tr className="border-b">
                      <td className="px-5 py-5 bg-white text-sm">
                        {index + 1}
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        {user.username}
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        {user.branch?.branchName}
                      </td>

                      <td className="px-5 py-5 bg-white text-sm">
                        <Link to={"/edit-user/" + user.id}>
                          <FontAwesomeIcon
                            className="text-blue-500"
                            icon={faEdit}
                          />
                        </Link>
                      </td>
{/* 
                      <td className="px-5 py-5 bg-white text-sm">
                        <div
                          className="cursor-pointer text-red-600"
                          onClick={() => deleteUser(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </td> */}
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
