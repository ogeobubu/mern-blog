import "./header.css";
import backgroundImage from "../../assets/nature.jpg";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">MERN</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImage" src={backgroundImage} alt="" />
    </div>
  );
};

export default Header;
