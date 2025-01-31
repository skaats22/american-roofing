import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

export default function TESTGuestNavBar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  // Function to close the menu on large screens (resizing)
  function handleResize() {
    if (window.innerWidth > 768) {
      setMenuOpen(false);  // Close the menu when the screen is large
    }
  }

  // Add window resize event listener when the component mounts
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.topBanner}>
        <span id={styles.license}>License # C39-1043795</span>
        <span id={styles.digits}>📞 213-270-3527</span>
      </div>
      <nav className={styles.NavBar}>
        <div className={styles.logoAndHamburger}>
          <Link to="/">
            <img
              id="home"
              src="https://plus.unsplash.com/premium_photo-1666788168089-3142e8471488?q=80&w=3821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Home"
              style={{ width: "50px", height: "auto", objectFit: "contain" }}
            />
          </Link>
          {/* Hamburger Button */}
          <button className={styles.hamburger} onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
          <NavLink to="/">Home</NavLink>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          {/* Dropdown for Our Services */}
          <div className={styles.dropdown}>
            <span className={styles.dropdownToggle}>Our Services</span>
            <div className={styles.dropdownMenu}>
              <NavLink to="/services?type=commercial">
                Commercial Roofing
              </NavLink>
              <NavLink to="/services?type=repair">Roof Repair</NavLink>
              <NavLink to="/services?type=replacement">
                Roof Replacement
              </NavLink>
              <NavLink to="/services?type=construction-condition-report">
                Construction Condition Report
              </NavLink>
            </div>
          </div>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          <NavLink to="/about">About Us</NavLink>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          <NavLink to="/jobs">Our Portfolio</NavLink>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          <NavLink to="/resources">Resources</NavLink>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          <div>
            <NavLink to="/signup">Sign Up</NavLink> /{" "}
            <NavLink to="/login">Log In</NavLink>
          </div>
          <span className={menuOpen ? styles.hidden : ""}>
            {" "}
            &nbsp; | &nbsp;
          </span>
          <NavLink to="/quotes/new">Request a free quote!</NavLink>
        </div>
      </nav>
    </>
  );
}
