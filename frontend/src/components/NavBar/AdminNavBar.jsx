import { NavLink, Link, useNavigate } from "react-router";
import { logOut } from "../../services/authService";
import styles from "./NavBar.module.css";

export default function AdminNavBar({ user, setUser }) {

  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate("/");
  }
  return (
    <>
      <div className={styles.topBanner}>
        <span id={styles.license}>License # C39-1043795</span>
        <span id={styles.digits}>📞 213-270-3527</span>
      </div>
      <nav className={styles.NavBar}>
        <Link to="/">
          <img
            id="home"
            src="https://plus.unsplash.com/premium_photo-1666788168089-3142e8471488?q=80&w=3821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Home"
            style={{ width: "50px", height: "auto", objectFit: "contain" }}
          />
        </Link>
        <NavLink to="/">Home</NavLink>
        &nbsp; | &nbsp;
        {/* Dropdown for Our Services */}
        <div className={styles.dropdown}>
          <span className={styles.dropdownToggle}>Our Services</span>
          <div className={styles.dropdownMenu}>
            <NavLink to="/services?type=commercial">Commercial Roofing</NavLink>
            <NavLink to="/services?type=repair">Roof Repair</NavLink>
            <NavLink to="/services?type=replacement">Roof Replacement</NavLink>
            <NavLink to="/services?type=construction-condition-report">
              Construction Condition Report
            </NavLink>
          </div>
        </div>
        &nbsp; | &nbsp;
        <NavLink to="/about">About Us</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/jobs">Our Portfolio</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/resources">Resources</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/" onClick={handleLogOut}>
            Log Out
          </NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/quotes">View Quotes</NavLink>
      </nav>
    </>
  );
}
