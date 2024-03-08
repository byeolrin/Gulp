import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const handleBusinessNavigate = (e) => {
    e.preventDefault();
    navigate('/businesses/manage')
  }

  return (
    <>
      <div className="avatar-button" onClick={toggleMenu}>
        <span><i className="fa-solid fa-user"></i></span>
      </div>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div>
              <div className="dropdown-info">
                <div className="dropdown-labels-info">
                  <i className="fa-solid fa-user"></i>
                  {user.first_name} {user.last_name}
                </div>
                <div className="dropdown-labels" onClick={handleBusinessNavigate}>
                  <i className="fa-solid fa-building"></i>
                  Your Businesses
                </div>
              </div>
              <div className="dropdown-logout">
                <div className="dropdown-labels" onClick={logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
