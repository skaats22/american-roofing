import roofReplamcentPic from "../../assets/roof-replacement.jpeg";
import styles from "./CommercialContent.module.css";

export default function RoofReplacementContent() {
  return (
    <>
      <h1>Roof Replacement Service</h1>
      <div>
        At American Roofing and Waterproofing, we specialize in hassle-free roof
        replacement services that restore the safety, durability, and appearance
        of your property. Whether your roof has reached the end of its lifespan
        or suffered extensive damage, our expert team will guide you through
        every step of the process—from selecting the best materials to
        completing a flawless installation. With a focus on quality
        craftsmanship, efficiency, and minimal disruption to your daily life, we
        ensure your new roof is built to last and tailored to your needs. Trust
        us to protect what matters most with a roof you can depend on.
      </div>
      <div className={styles.servicesContainer}>
        <img
          src={roofReplamcentPic}
          alt="Roofing crew on roof."
          style={{ width: "40%", height: "auto" }}
          className={styles.commercialPic}
        />
      </div>
    </>
  );
}
