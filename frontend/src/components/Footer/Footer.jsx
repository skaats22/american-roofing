import { NavLink, Link, useNavigate } from "react-router";

export default function Footer({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <footer>
        <>
          <Link to="/services" end>Our Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/resources">Resources</Link>
          <span>📞 213-270-3527</span>
          <span>Request a free quote!</span>
        </>
      <Link to="/" id="home">
        <img
          src="https://plus.unsplash.com/premium_photo-1666788168089-3142e8471488?q=80&w=3821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Home"
        />
      </Link>
    </footer>
  );
}
