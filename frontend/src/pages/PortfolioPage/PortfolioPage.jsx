import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as jobService from "../../services/jobService";
import JobItem from "../../components/JobItem/JobItem";

export default function PortfolioPage(props) {
  // If state going to be array, then initialize to []
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await jobService.index();
      setJobs(jobs);
    }
    fetchJobs();
    // Empty dependency array means run this only once after rendering
  }, []);

  // const jobItems = jobs.map((j) => <JobItem key={j._id} job={j} />);

  return (
    <main>
    {props.jobs.map((j) => (
      <article key={j._id}>
        {/* Link only around the title and photo */}
        <Link to={`/jobs/${j._id}`}>
          <header>
            <h2>{j.title}</h2>
            <h3>{j.photo}</h3>
          </header>
        </Link>

        {/* Remaining details without wrapping them in a Link */}
        <ul>
          <li>{j.city}, {j.state}</li>
          <li>{j.propertyType}</li>
          <li>{j.serviceType}</li>
          <li>{j.roofMaterial}</li>
          <li>{j.projectLength}</li>
          <li>{j.projectPrice}</li>
          <li>{j.description}</li>
        </ul>
      </article>
    ))}
    <Link to="/jobs/new"><button>Add to Portfolio</button></Link>
  </main>
  );
}
