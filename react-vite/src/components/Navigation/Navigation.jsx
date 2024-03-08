import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import gulpLogo from '../../images/gulpresize.png';
import "./Navigation.css";

function Navigation() {

  const handleSearch = (e) => {
    e.preventDefault();
    window.alert('feature coming soon')
  }

  return (
    <div className="nav-bar-container">
      <div className="nav-bar-header">
        <div className="left-side-of-nav-bar">
          <NavLink to="/"><img className="gulpLogo" src={gulpLogo} /></NavLink>
        </div>
        <div className="middle-of-nav-bar">
          <div className='search' onClick={handleSearch}>
            <div className="search-bar-container">
              <div className="search-bar-holder">
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Search"
                />
              </div>
              <span className="search-icon"><i className="fa-solid fa-magnifying-glass" />
              </span>
            </div>
          </div>
        </div>
        <div className="right-side-of-nav-bar">
          <div className="right-nav-section">
              <NavLink className='view-business-text' to="/businesses">View all Business</NavLink>
            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
