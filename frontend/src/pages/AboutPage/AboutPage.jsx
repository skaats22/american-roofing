import styles from "./AboutPage.module.css";
import logo from "../../assets/logo.jpg";

export default function AboutPage() {

  return (
    <>
      <main className={styles.mainA}>
        <h2>About Us</h2>
        <h3>Family-Owned and Operated for 50 Years</h3>
        <p className={styles.blurb}>
          At American Roofing and Waterproofing, we take pride in being a
          trusted name in roofing for both residential and commercial properties
          across California. For over five decades, our family-owned and
          operated business has been committed to delivering exceptional
          craftsmanship, reliable service, and lasting value to every project we
          undertake. Serving areas from San Diego to Santa Rosa, our dedication
          to quality and customer satisfaction has allowed us to build
          long-lasting relationships with our clients and remain a staple in the
          community. As we look toward the future, we continue to uphold the
          values that have made us a leader in the roofing industry—integrity,
          trust, and excellence.
        </p>
      </main>
      <div className={styles.logo2}>
        <img src={logo} alt="Logo" style={{ width: "15%", height: "auto" }} />
      </div>
    </>
  );
}
