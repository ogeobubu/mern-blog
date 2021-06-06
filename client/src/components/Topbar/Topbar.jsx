import "./topbar.css";
// import woman from "./../../assets/woman.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const profileFolder = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
          <i className="topIcon fab fa-linkedin"></i>
          <i className="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
          <nav>
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/">
                  About
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/">
                  Contact
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/story">
                  Tell a Story
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/" onClick={handleLogout}>
                  {user && "Logout"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={user ? "topRight" : "loginRegisterStyle"}>
          {user ? (
            <Link to="/settings">
              <img
                className="topImage"
                src={user && profileFolder + user.user.profilePicture}
                alt=""
              />
            </Link>
          ) : (
            <>
              <ul className={user ? "topList" : "logReg"}>
                <li className="topListItem">
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}
          <i className="topSearchIcon fas fa-search"></i>
        </div>
      </div>
    </>
  );
};

export default Topbar;
