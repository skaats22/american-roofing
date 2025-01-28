import roofing1 from "../../assets/roofing1.jpg"
import styles from "./HomePage.module.css"

export default function HomePage() {
  return (
    <>
    <h1>Home Page</h1>
    <div id={styles.roofing1}>
    <img src={roofing1} alt="Picture of man on roof." />
    </div>
    </>
  ); 
};