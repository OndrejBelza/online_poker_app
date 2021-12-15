import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user ? (
        <div className="profile-container">
          <div className="profile-wrapper">
            <h1 className="profile-header">Profile</h1>
            <div className="profile-list-wrapper">
              <div className="profile-list">
                <div className="profile-list-item">Name</div>
                <div className="profile-list-item">{user.username}</div>
              </div>
              <div className="profile-list profile-list--lastone">
                <div className="profile-list-item">Email</div>
                <div className="profile-list-item">{user.email}</div>
              </div>
            </div>
            <Link to="/edit_profile" className="edit-profile-link">
              <div className="edit-button">Edit</div>
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
