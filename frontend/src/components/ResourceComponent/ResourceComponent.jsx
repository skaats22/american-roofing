import { Link } from "react-router";
import styles from "./ResourceComponent.module.css";

export default function ResourceCard({ resource }) {
  return (
    <>
      <Link to={resource.link}>
        <div className={styles.ResourceCard}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <Link to={resource.link}>Read More</Link>
          <span className={styles.category}>{resource.category}</span>
        </div>
      </Link>
    </>
  );
}
