import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as jobService from "../../services/jobService";
import styles from "./AdminPortfolioPage.module.css";

export default function AdminPortfolioPage(props) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await jobService.index();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.jobList}>
        {jobs.map((j) => (
          <article key={j._id} className={styles.jobCard}>
            {props.user.isAdmin && (
              <Link to={`/jobs/${j._id}`} className={styles.jobLink}>
                <header className={styles.jobHeader}>
                  <h2 className={styles.jobTitle}>{j.title}</h2>
                  {j.photo && (
                    <img
                      src={j.photo}
                      alt={j.title}
                      className={styles.jobImage}
                    />
                  )}
                </header>
                <ul className={styles.jobDetails}>
                  <li>
                    <strong>Location:</strong> {j.city}, {j.state}
                  </li>
                  <li>
                    <strong>Property Type:</strong> {j.propertyType}
                  </li>
                  <li>
                    <strong>Service Type:</strong> {j.serviceType}
                  </li>
                  <li>
                    <strong>Roof Material:</strong> {j.roofMaterial}
                  </li>
                  <li>
                    <strong>Project Length:</strong> {j.projectLength}
                  </li>
                  <li>
                    <strong>Price:</strong> {j.projectPrice}
                  </li>
                  <li>
                    <strong>Description:</strong> {j.description}
                  </li>
                  <li>
                    <strong>Displayed in Gallery:</strong>{" "}
                    {j.displayInGallery ? "Yes" : "No"}
                  </li>
                </ul>
              </Link>
            )}
          </article>
        ))}
      </div>
      <div className={styles.addButtonContainer}>
        {props.user && props.user.isAdmin && (
          <Link to="/jobs/new">
            <button className={styles.addButton}>
              Add a new Job to the Portfolio
            </button>
          </Link>
        )}
      </div>
    </main>
  );
}
