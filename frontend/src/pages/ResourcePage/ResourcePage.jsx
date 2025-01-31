import { Link } from "react-router";
import ResourceComponent from "../../components/ResourceComponent/ResourceComponent";
import styles from "./ResourcePage.module.css";

const resources = [
  {
    id: 1,
    title: "Roofing Ventilation",
    description: "Explore Key Roof Ventilation Strategies.",
    link: "/resources/roofing-ventilation",
    category: "All",
  },
  {
    id: 2,
    title: "Notice to Owner Document",
    description: "Details on a Notice to Owner Document.",
    link: "/resources/notice-to-owner",
    category: "All",
  },
  {
    id: 3,
    title: "Construction Condition Report",
    description: "How we document the current state of your property.",
    link: "/resources/construction-condition-report",
    category: "All",
  },
];

export default function ResourcePage() {
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase()
  );

  return (
    <div className={styles.resourcePage}>
      <header className={styles.header}>
        <h1>Resources</h1>
        <p>Browse articles, guides, and tips for roofing and waterproofing.</p>
      </header>

      <div className={styles.resourceGrid}>
        {filteredResources.map((resource) => (
          <ResourceComponent key={resource.id} resource={resource} />
        ))}
      </div>
      <Link to="/">
        <button className={styles.homeButton}>🏠</button>
      </Link>
    </div>
  );
}
