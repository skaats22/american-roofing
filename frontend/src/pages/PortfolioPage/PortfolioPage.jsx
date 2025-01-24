import { useState, useEffect } from "react";
import { Link } from "react-router"
import * as jobService from "../../services/jobService";
import JobItem from "../../components/JobItem/JobItem";

export default function PortfolioPage( props ) {
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
        <Link key={j._id} to={`/jobs/${j._id}`}>
          <article>
            <header>
              <h2>{j.title}</h2>
              <h3>{j.photo}</h3>
            </header>
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
        </Link>
      ))}
    </main>
  );
}
