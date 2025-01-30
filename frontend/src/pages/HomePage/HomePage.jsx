import roofing2 from "../../assets/roofing2.jpg";
import QuoteButton from "../../components/QuoteButton/QuoteButton";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.roofingContainer}>
        <img
          src={roofing2}
          alt="Picture of man on roof."
          className={styles.roofingImage}
        />
        <div className={styles.contentContainer}>
          <div className={styles.homeTitle}>
            American Roofing and Waterproofing, Inc.
          </div>
          <div className={styles.tagline}>
            Roofing Solutions Built to Weather It All.
          </div>
          <QuoteButton className={styles.homeQuote} />
        </div>
      </div>
    </>
  );
}
