import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as jobService from "../../services/jobService";
import styles from "./PortfolioDetailPage.module.css";

function PortfolioDetailPage(props) {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  
  const user = props.user;

  useEffect(() => {
    async function fetchJob() {
      const jobData = await jobService.show(jobId);
      setJob(jobData);
    }
    fetchJob();
  }, [jobId]);

  function handleDeleteJobWithConfirmation() {
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
    if (confirmDelete) {
      props.handleDeleteJob(jobId);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.jobDetailContainer}>
        <header className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>{job.title}</h2>
          {job.photo && <img src={job.photo} alt={job.title} className={styles.jobImage} />}
        </header>

        <ul className={styles.jobDetails}>
          <li><strong>Location:</strong> {job.city}, {job.state}</li>
          <li><strong>Property Type:</strong> {job.propertyType}</li>
          <li><strong>Service Type:</strong> {job.serviceType}</li>
          <li><strong>Roof Material:</strong> {job.roofMaterial}</li>
          <li><strong>Project Length:</strong> {job.projectLength}</li>
          <li><strong>Price:</strong> {job.projectPrice}</li>
          <li><strong>Description:</strong> {job.description}</li>
        </ul>

        <p className={styles.jobText}>{job.text}</p>
      </section>

      <div className={styles.buttonContainer}>
        <Link to={`/jobs/${jobId}/edit`}>
          <button className={styles.editButton}>Edit Job</button>
        </Link>
        <button className={styles.deleteButton} onClick={handleDeleteJobWithConfirmation}>
          Delete Job
        </button>
      </div>
    </main>
  );
}

export default PortfolioDetailPage;
