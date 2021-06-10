import "./article.css";
// import forest from "../../../assets/forest.jpg";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context/Context";

const Article = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);

  const { user } = useContext(Context);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: post.username,
        title,
        description,
      });
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path, update]);

  return (
    <div className="article">
      <div className="article-container">
        {post?.photo && (
          <img
            src={publicFolder + post.photo}
            alt=""
            className="articleImage"
          />
        )}
        {update ? (
          <input
            type="text"
            value={title}
            className="articleTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="articleTitle">
            {post.title}
            {post.username === user?.user.username && (
              <div className="articleEdit">
                <i
                  className="articleIcon far fa-edit"
                  onClick={() => {
                    setUpdate(!update);
                  }}
                ></i>
                <i
                  className="articleIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="articleInfo">
          <span className="articleAuthor">
            <Link to={`/?user=${post.username}`} className="link">
              Author: <b>{post.username}</b>
            </Link>
          </span>
          <span className="articleDate">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
        {update ? (
          <textarea
            value={description}
            className="articleDescriptionInput"
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="articleDescription">{post.description}</p>
        )}
        {update && (
          <button className="articleButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default Article;
