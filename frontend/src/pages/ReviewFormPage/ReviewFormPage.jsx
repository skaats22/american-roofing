import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
import * as reviewService from "../../services/reviewService";

export default function ReviewFormPage(props) {
  const [formData, setFormData] = useState({ text: "" });
  const navigate = useNavigate();

  const { jobId, reviewId } = useParams();

  useEffect(() => {
    async function fetchJob() {
      const jobData = await jobService.show(jobId);
      setFormData(jobData.reviews.find((review) => review._id === reviewId));
    }
    if (jobId && reviewId) fetchJob();
  }, [jobId, reviewId]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (jobId && reviewId) {
      await reviewService.updateReview(jobId, reviewId, formData);
      navigate(`/jobs/${jobId}`);
    } else {
      props.handleAddReview(formData);
    }
    setFormData({ comment: "" });
  }

  if (jobId && reviewId)
    return (
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Edit Review</h1>
          <label htmlFor="text-input">Your review:</label>
          <textarea
            required
            type="text"
            name="comment"
            id="text-input"
            value={formData.comment}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your review:</label>
      <textarea
        required
        type="text"
        name="comment"
        id="text-input"
        value={formData.comment}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
