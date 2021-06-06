import Sidebar from "../../components/Sidebar/Sidebar";
import "./articles.css";
import Article from "../Articles/Article/Article";

const Articles = () => {
  return (
    <div className="articles">
      <>
        <Article />
        <Sidebar />
      </>
    </div>
  );
};

export default Articles;
