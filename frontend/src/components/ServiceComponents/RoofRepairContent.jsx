import roofRepairPic from "../../assets/roof-repair.jpeg";
import styles from "./CommercialContent.module.css";

export default function RoofRepairContent() {
  return (
    <>
      <h1>Roof Repair Service</h1>
      <div>
        At American Roofing and Waterproofing, we provide fast, reliable roof
        repair services to keep your home or business safe and secure. Whether
        you’re dealing with leaks, storm damage, or general wear and tear, our
        experienced team quickly identifies the issue and delivers effective
        solutions to restore your roof’s strength and performance. From minor
        fixes to extensive repairs, we use high-quality materials and expert
        craftsmanship to ensure lasting results. Don’t let a damaged roof
        disrupt your day—trust us to get it back in top shape!
      </div>
      <div className={styles.servicesContainer}>
        <img
          src={roofRepairPic}
          alt="Roofing crew on roof."
          style={{ width: "30%", height: "auto" }}
          className={styles.roofRepairPic}
        />
      </div>
    </>
  );
}
