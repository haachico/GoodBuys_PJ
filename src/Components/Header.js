import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { booksContext } from "..";

const Header = () => {
  const { cartItems } = useContext(booksContext);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const activeStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    textDecoration: isActive ? "underline" : "",
    color: isActive ? "#161616" : "",
  });
  return (
    <header className="header--section">
      <NavLink to="/" className="site-logo" style={activeStyle}>
        GoodBuys
      </NavLink>
      {console.log(user)}
      {user && <p>Happy Exploring, {user.name}!</p>}

      <nav>
        {/* <NavLink to="/host" className="about">
          Host
        </NavLink> */}

        {console.log(isAuthenticated, "isauthenticated")}
        {isAuthenticated ? (
          <NavLink to="/host" className="about" style={activeStyle}>
            Host
          </NavLink>
        ) : (
          <button onClick={() => loginWithRedirect()} className="about--btn">
            Host
          </button>
        )}

        {/* Sinca all are relative paths, we can remove "/" from start and instead directly write the path name */}
        <NavLink to="about" className="about" style={activeStyle}>
          About
        </NavLink>
        <NavLink to="books" className="about" style={activeStyle}>
          Books
        </NavLink>
        <NavLink to="cart" className="about" style={activeStyle}>
          Cart ({cartItems.length})
        </NavLink>
        <NavLink to="" className="login" style={activeStyle}>
          {" "}
          {isAuthenticated ? (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="logout"
            >
              Log Out
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()} className="login">
              Log In
            </button>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
