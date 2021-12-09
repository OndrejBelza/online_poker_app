import { useSelector } from "react-redux";
import "./Profile.scss";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
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
        <div className="save-button">Save</div>
      </div>
    </div>
  );
};

export default EditProfile;
