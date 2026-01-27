import React, { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import Header from "../Layout/Header.jsx";

function Profile() {
  const userInfo = localStorage.getItem("user"); //was json
  const user = JSON.parse(userInfo); //became obj

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/user/password/${user._id}`, changePassword);
      if (res.status !== 200) {
        toast.error(res.data.message || "password did not change ");
      }
      toast.success("password changed successfully");
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [isEditUser, setIsEditUser] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
  }); //this is object
  /*
      obj:
      {
          name:"", 
          email:""
      }

      json:
      {
          "name", "", 
          "email" : "" 
      }
*/
  const handleEditUser = async (userId) => {
    try {
      if (editedUser.name === "" || editedUser.email === "") {
        return toast.error("Name and Email cannot be empty");
      }
      const res = await api.put(`/user/${userId}`, editedUser);
      console.log(res);
      if (res.status !== 200) {
        toast.error(res.data.message || "Info did not updated well");
      }
      toast.success(res.data.message || "Update successfully");

      const newUser = {
        ...user,
        name: editedUser.name,
        email: editedUser.email,
      };
      localStorage.removeItem("user"); //was obj
      localStorage.setItem("user", JSON.stringify(newUser)); //become json
      setIsEditUser(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <h1>My Profile</h1>
      <div>
        <h2>My Info:</h2>
        <p>
          Name:
          {isEditUser ? (
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          ) : (
            user.name
          )}
        </p>
        <p>
          Email:
          {isEditUser ? (
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          ) : (
            user.email
          )}
        </p>
        {isEditUser && (
          <button onClick={() => handleEditUser(user._id)}>Save</button>
        )}
        <p>Role: {user.role}</p>

        <button onClick={() => setIsEditUser(!isEditUser)}>
          {isEditUser ? "Cancel" : "Edit"}
        </button>
      </div>
      <br />
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          name="password"
          placeholder="enter old paasword"
          value={changePassword.oldPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              oldPassword: e.target.value,
            })
          }
        />
        <br />
        <input
          type="password"
          name="newPassword"
          placeholder="enter new paasword"
          value={changePassword.newPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              newPassword: e.target.value,
            })
          }
        />
        <br />
        <input
          type="password"
          name="confirmnewPassword"
          placeholder="enter confirm new paasword"
          value={changePassword.confirmNewPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              confirmNewPassword: e.target.value,
            })
          }
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default Profile;
