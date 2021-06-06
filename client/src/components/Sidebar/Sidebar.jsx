import "./sidebar.css";
import oge from "../../assets/main.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/category");

      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <hr />
        <br />
        <img className="sidebarImage" src={oge} alt="" />
        <p>
          Hello! MERN Blog is gotten from the web development stack MongoDB,
          Express, React and Nodejs. This is one of the numerous projects I have
          done with React and surely this blog look forward to its advancement
          much more. <br />
          <br />
          More features coming soon. <br />
          <br />
          Thank you for checking this blog out.
          <br />
          <br />
          Feel free to connect with me on social media.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <hr />
        <br />
        {categories.map((category, index) => (
          <Link key={index} className="link" to={`/?category=${category.name}`}>
            <li className="sidebarListItem">{category.name}</li>
          </Link>
        ))}
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <hr />
        <br />
        <div className="sidebarSocial">
          {/* <a className="link" href="https://facebook.com/" target="_blank"><i className="sidebarIcon fab fa-facebook-square"></i></a> */}
          <a
            className="link"
            href="https://twitter.com/obubuoge"
            target="_blank"
            rel="noreferrer"
          >
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
          <a
            className="link"
            href="https://linkedin.com/oge-obubu"
            target="_blank"
            rel="noreferrer"
          >
            <i className="sidebarIcon fab fa-linkedin"></i>
          </a>
          <a
            className="link"
            href="https://instagram.com/ogeobubu"
            target="_blank"
            rel="noreferrer"
          >
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
