import Sidebar from "../../components/Sidebar/Sidebar";
import "./settings.css";
// import woman from "../../assets/woman.jpg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Success from "../Validation/Success/Success";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [setUsername] = useState("");
  const [setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const profileFolder = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "START_UPDATE" });

    const updatedUser = {
      userId: user.user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/edit/" + user.user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: { user: res.data } });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/remove/${user.user._id}`, {
        data: { username: user.user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsContainer">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete your Account
          </span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>
          {success ? Success("Profile Updated") : ""}
          <label>Profile Picture</label>
          <div className="settingsProfilePicture">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : profileFolder + user.user.profilePicture
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsProfilePictureIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder={user.user.username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={true}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={user.user.email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
