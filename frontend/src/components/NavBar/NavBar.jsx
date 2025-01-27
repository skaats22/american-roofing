import { NavLink, Link, useNavigate } from "react-router";
import { logOut } from "../../services/authService";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="NavBar">
      <Link to="/" id="home">
        <img
          src="https://plus.unsplash.com/premium_photo-1666788168089-3142e8471488?q=80&w=3821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Home"
        />
      </Link>
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/services" end>
            Our Services
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/about">About Us</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/jobs">Our Portfolio</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/resources">Resources</NavLink>
          &nbsp; | &nbsp;
          <span>📞 213-270-3527</span>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>
            Log Out
          </Link>
          <NavLink to="/quotes/new">Request a free quote!</NavLink>
          <NavLink to="/quotes">View Quotes</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/services" end>
            Our Services
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/about">About Us</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/resources">Resources</NavLink>
          &nbsp; | &nbsp;
          <span>📞 213-270-3527</span>
          &nbsp; | &nbsp;
          <div>
            <NavLink to="/signup">Sign Up</NavLink> /{" "}
            <NavLink to="/login">Log In</NavLink>
          </div>
          <NavLink to="/quotes/new">Request a free quote!</NavLink>
        </>
      )}
    </nav>
  );
}
