import commercialPic from "../../assets/St.-Dominic-Savio-School-5.jpeg";
import styles from "./CommercialContent.module.css";

export default function CommercialContent() {
  return (
    <>
      <h1>Commercial Roofing Services</h1>
      <div>
        At American Roofing and Waterproofing, we specialize in providing
        top-quality commercial roofing solutions designed to meet the unique
        needs of businesses of all sizes. From new installations and repairs to
        routine maintenance, our experienced team uses industry-leading
        materials and techniques to ensure your roof is built to last. We
        understand the importance of a reliable roof in protecting your assets,
        employees, and customers, which is why we’re committed to delivering
        exceptional craftsmanship, superior durability, and unmatched customer
        service. Whether you need a flat roof, metal roofing, or specialized
        coatings, we’ll work with you to create a solution that fits your budget
        and timeline. With AR&W, your business is always covered.
      </div>
      <div className={styles.servicesContainer}>
        <img
          src={commercialPic}
          alt="Roofing crew on roof."
          style={{ width: "30%", height: "auto" }}
          className={styles.commercialPic}
        />
      </div>
    </>
  );
}
