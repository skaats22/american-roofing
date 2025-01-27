// src/components/HootDetails/HootDetails.jsx

import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as jobService from "../../services/jobService";

function PortfolioDetailPage(props) {
  const { jobId } = useParams();
  const [job, setJob] = useState([]);

  const user = props.user;

  // async function handleAddComment(commentFormData) {
  //   const newComment = await hootService.createComment(hootId, commentFormData);
  //   setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  // }

  // async function handleDeleteComment(commentId) {
  //   const deletedHoot = await hootService.deleteComment(hootId, commentId);
  //   setHoot({
  //     ...hoot,
  //     comments: hoot.comments.filter((comment) => comment._id !== commentId),
  //   });
  // }

  useEffect(() => {
    async function fetchJob() {
      const jobData = await jobService.show(jobId);
      setJob(jobData);
    }
    fetchJob();
    // Empty dependency array means run this only once after rendering
  }, [jobId]);

  // Fn to add a pop-up to ensure no accidental deletes
  function handleDeleteJobWithConfirmation() {
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
    if (confirmDelete) {
      props.handleDeleteJob(jobId);
    }
  };

  return (
    <main>
      <section>
        <header>
          <article>
            <header>
              <h2>{job.title}</h2>
              <h3>{job.photo}</h3>
            </header>
            <ul>
              <li>
                {job.city}, {job.state}
              </li>
              <li>{job.propertyType}</li>
              <li>{job.serviceType}</li>
              <li>{job.roofMaterial}</li>
              <li>{job.projectLength}</li>
              <li>{job.projectPrice}</li>
              <li>{job.description}</li>
            </ul>
          </article>
        </header>
        <p>{job.text}</p>
      </section>
      <Link to={`/jobs/${jobId}/edit`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={handleDeleteJobWithConfirmation}>Delete Job</button>
    </main>
  );
}

export default PortfolioDetailPage;
