import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/user";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    username: auth.username,
    email: auth.email || "",
    address: auth.address || "",
    phoneNumber: auth.phoneNumber || "",
  });
  const [refresh, setRefresh] = useState(false);

  const handleUpdate = async () => {
    await dispatch(updateUser({ ...auth, ...formState }));
    setEditMode(false);
    setRefresh(!refresh);
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      {editMode ? (
        <div>
          <label>
            Username:
            <input
              type="text"
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={formState.address}
              onChange={(e) =>
                setFormState({ ...formState, address: e.target.value })
              }
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={formState.phoneNumber}
              onChange={(e) =>
                setFormState({ ...formState, phoneNumber: e.target.value })
              }
            />
          </label>

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {auth.username}
          </p>
          <p>
            <strong>Email:</strong> {auth.email}
          </p>
          <p>
            <strong>Address:</strong> {auth.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {auth.phoneNumber}
          </p>

          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
