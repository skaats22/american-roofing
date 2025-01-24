

export default function JobItem({ job }) {

  return (
    <article>
      <h4>{new Date(job.createdAt).toLocaleDateString()}</h4>
      <p>{job.content}</p>
    </article>
  );
}
