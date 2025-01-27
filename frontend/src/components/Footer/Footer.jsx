import { Link } from "react-router";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/services" className={styles.link}>
          Our Services
        </Link>
        <Link to="/about" className={styles.link}>
          About Us
        </Link>
        <Link to="/resources" className={styles.link}>
          Resources
        </Link>
        <Link to="/quotes/new" className={styles.link}>
        Request a free quote!
        </Link>
        <span className={styles.link}>📞 213-270-3527</span>
        <span className={styles.link}>License # C39-1043795</span>
      </div>
    </footer>
  );
}
