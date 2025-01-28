import { Link } from "react-router";
import styles from "./ResourceComponent.module.css";

export default function ResourceCard({ resource }) {
  return (
    <>
      <Link className={styles.resourceLink} to={resource.link}>
        <div className={styles.ResourceCard}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <p>Details</p>
          <span className={styles.category}>Category: {resource.category}</span>
        </div>
      </Link>
    </>
  );
}
