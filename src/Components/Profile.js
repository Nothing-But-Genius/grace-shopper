import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth, cart } = useSelector((state) => state);

  if (!auth) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      <p>
        <strong>Username:</strong> {auth.username}
      </p>

      {/* Optional: Add an Edit Profile button */}
      <button>Edit Profile</button>
    </div>
  );
};

export default Profile;
