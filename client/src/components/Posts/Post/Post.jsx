import "./post.css";
// import forest from "../../../assets/forest.jpg";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const publicFolder = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post?.photo && (
        <img className="postImage" src={publicFolder + post.photo} alt="" />
      )}
      <div className="postInfo">
        {/* <div className="postCategories">
          {post?.categories.map((category, index) => (
            <span key={index} className="postCategory">
              {category}
            </span>
          ))}
        </div> */}
        <Link className="link" to={`/post/${post._id}`}>
          <div className="postTitle">{post.title}</div>
        </Link>
        <hr />
        <span className="postDate">{moment(post.createdAt).fromNow()}</span>
        <p className="postDescription">{post.description}</p>
      </div>
    </div>
  );
};

export default Post;
