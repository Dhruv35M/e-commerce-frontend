import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    userId: "",
  });

  const jwtToken = localStorage.getItem("token");
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(
        `${SummaryApi.allUser.url}`,
        // `${SummaryApi.allUser.url}?pageNumber=1&pageSize=10`,
        {
          method: SummaryApi.allUser.method,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.ok) {
        const responseData = await fetchData.json();
        setAllUser(responseData.content);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Error in fetching all users..", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Users</h2>
      </div>

      <table className="w-full userTable">
        <thead>
          <tr className="bg-slate-600 h-10 mb-4 text-white">
            <th>Sr.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {!allUser ? (
            <tr className="text-center">
              <td colSpan={7}>No users found.</td>
            </tr>
          ) : (
            allUser.map((el, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.firstName}</td>
                  <td>{el?.lastName}</td>
                  <td>{el?.email}</td>
                  <td>{el?.roles[0]?.roleName}</td>
                  <td>{moment(el?.createdAt).format("LL")}</td>
                  <td>
                    {console.log("role", el.roles[0]?.roleName)}
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        setUpdateUserDetails({
                          ...el,
                          role: el.roles[0]?.roleName || "",
                        });
                        setOpenUpdateRole(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          firstName={updateUserDetails?.firstName}
          lastName={updateUserDetails?.lastName}
          email={updateUserDetails?.email}
          role={updateUserDetails?.role}
          userId={updateUserDetails?.userId}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
