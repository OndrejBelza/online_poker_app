import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Client from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUser from "../../utils/getUser";
import { setUser } from "../../redux/user/userSlice";
import "./EditProfile.scss";

const EditProfileSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
});

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const editUser = async (credentials) => {
    try {
      await Client.post("edit_profile", credentials);

      //loads user data
      const user = await getUser();
      dispatch(setUser(user));

      //navigates to home
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-wrapper">
        <h1 className="profile-edit-header">Profile</h1>
        <div className="profile-edit-form-wrapper">
          <Formik
            initialValues={{
              name: user.username,
              email: user.email,
              currentPassword: "",
              newPassword: "",
            }}
            validationSchema={EditProfileSchema}
            onSubmit={(values) => EditProfile(values)}
          >
            {({ errors, touched }) => (
              <Form className="profile-edit-form">
                <label htmlFor="username" className="profile-edit-form-label">
                  User Name
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                />
                {errors.username && touched.username ? (
                  <span>{errors.username}</span>
                ) : (
                  <span></span>
                )}
                <label htmlFor="email" className="profile-edit-form-label">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                />
                {errors.email && touched.email ? (
                  <span>{errors.email}</span>
                ) : (
                  <span></span>
                )}
                <label
                  htmlFor="currentPassword"
                  className="profile-edit-form-label"
                >
                  Current Password
                </label>
                <Field
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  id="currentPassword"
                />
                {errors.currentPassword && touched.currentPassword ? (
                  <span>{errors.currentPassword}</span>
                ) : (
                  <span></span>
                )}
                <label
                  htmlFor="newPassword"
                  className="profile-edit-form-label"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  id="newPassword"
                />
                {errors.newPassword && touched.newPassword ? (
                  <span>{errors.newPassword}</span>
                ) : (
                  <span></span>
                )}
                <button type="submit" className="save-button">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
