import "./story.css";
// import nature from "../../assets/nature.jpg";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

const Story = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.user.username,
      title,
      description,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error.message);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="story">
      {file && (
        <img className="storyImage" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="storyForm" onSubmit={handleSubmit}>
        <div className="storyFormGroup">
          <label htmlFor="fileInput">
            <i className="storyIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="storyInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="storyFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="storyInput storyText"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="storySubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Story;
