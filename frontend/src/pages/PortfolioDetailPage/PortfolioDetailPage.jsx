import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as jobService from "../../services/jobService";
import styles from "./PortfolioDetailPage.module.css";
import roofing2 from "../../assets/roofing2.jpg";

function PortfolioDetailPage(props) {
  const { jobId } = useParams();
  const [job, setJob] = useState({ reviews: [] });

  const user = props.user;

  useEffect(() => {
    async function fetchJob() {
      const jobData = await jobService.show(jobId);
      setJob(jobData);
    }
    fetchJob();
  }, [jobId]);

  function handleDeleteJobWithConfirmation() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job? This action cannot be undone."
    );
    if (confirmDelete) {
      props.handleDeleteJob(jobId);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.jobDetailContainer}>
        <header className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>{job.title}</h2>
        </header>
        <div className={styles.textImgContainer}>
          <div>
            <ul className={styles.jobDetails}>
              <li>
                <strong>Location:</strong> {job.city}, {job.state}
              </li>
              <li>
                <strong>Property Type:</strong> {job.propertyType}
              </li>
              <li>
                <strong>Service Type:</strong> {job.serviceType}
              </li>
              <li>
                <strong>Roof Material:</strong> {job.roofMaterial}
              </li>
              <li>
                <strong>Project Length:</strong> {job.projectLength}
              </li>
              <li>
                <strong>Price:</strong> {job.projectPrice}
              </li>
              <li>
                <strong>Description:</strong> {job.description}
              </li>
            </ul>
          </div>

          <div className={styles.photo}>
            {job.photo && (
              <img
                // src={job.photo}
                src={roofing2}
                alt={job.title}
                className={styles.jobImage}
              />
            )}
          </div>
        </div>
      </section>
      <section className={styles.commentsContainer}>
        <h2>Reviews</h2>
        {/* {!job.reviews.length && <p>There are no reviews.</p>} */}
        {job.reviews.map((review) => (
          <article key={review._id}>
            <p><strong>{user.firstName} {user.lastName}</strong></p>
            {/* <header>
              <div>
                {review.author._id === user._id && (
                  <>
                    <Link to={`/jobs/${jobId}/reviews/${review._id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteComment(review._id)}>
                      <Icon category="Trash" />
                    </button>
                  </>
                )}
              </div>
            </header> */}
            <p>{review.comment}</p>
          </article>
        ))}
      </section>

      <div className={styles.buttonContainer}>
        {props.user && props.user.isAdmin && (
          <>
            <Link to={`/jobs/${jobId}/edit`}>
              <button className={styles.editButton}>Edit Job</button>
            </Link>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteJobWithConfirmation}
            >
              Delete Job
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default PortfolioDetailPage;
