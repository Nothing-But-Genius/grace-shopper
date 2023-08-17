import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/user';

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    username: auth.username,
    email: auth.email || '',
    address: auth.address || '',
    phoneNumber: auth.phoneNumber || '',
  });

  useEffect(() => {
    setFormState({
      username: auth.username,
      email: auth.email || '',
      address: auth.address || '',
      phoneNumber: auth.phoneNumber || '',
    });
  }, [auth]);

  const handleUpdate = async () => {
    await dispatch(updateUser({ ...auth, ...formState }));
    setFormState({
      username: formState.username,
      email: formState.email,
      address: formState.address,
      phoneNumber: formState.phoneNumber,
    });
    setEditMode(false);
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
            <strong>Username:</strong> {formState.username}
          </p>
          <p>
            <strong>Email:</strong> {formState.email}
          </p>
          <p>
            <strong>Address:</strong> {formState.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {formState.phoneNumber}
          </p>

          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
