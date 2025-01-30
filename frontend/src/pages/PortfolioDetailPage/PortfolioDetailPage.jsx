import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as jobService from "../../services/jobService";
import * as reviewService from "../../services/reviewService";
import styles from "./PortfolioDetailPage.module.css";
import roofing2 from "../../assets/roofing2.jpg";
import ReviewFormPage from "../ReviewFormPage/ReviewFormPage";

function PortfolioDetailPage(props) {
  const { jobId } = useParams();
  const [job, setJob] = useState({ reviews: [] });

  const user = props.user;

  async function handleAddReview(reviewFormData) {
    const newReview = await reviewService.createReview(jobId, reviewFormData);
    setJob({ ...job, reviews: [...job.reviews, newReview] });
  }

  async function handleDeleteReview(reviewId) {
    const deletedJob = await reviewService.deleteReview(jobId, reviewId);
    setJob({
      ...job,
      reviews: job.reviews.filter((review) => review._id !== reviewId),
    });
  }

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
                src={job.photo}
                alt={job.title}
                className={styles.jobImage}
              />
            )}
          </div>
        </div>
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
      <section className={styles.commentsContainer}>
        <h2>Reviews</h2>
        {!job.reviews.length && <p>There are currently no reviews.</p>}
        {job.reviews.map((review) => (
          <article key={review._id}>
            <p>
              <strong>
                {review.owner.firstName} {review.owner.lastName}
              </strong>
            </p>
            <header>
              <div>
                {review.owner._id === user._id && (
                  <>
                    <Link to={`/jobs/${jobId}/reviews/${review._id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteReview(review._id)}>
                      Delete
                    </button>
                  </>
                )}
                <p>{review.comment}</p>
              </div>
            </header>
          </article>
        ))}
        {user && <ReviewFormPage handleAddReview={handleAddReview} />}
      </section>
    </main>
  );
}

export default PortfolioDetailPage;
