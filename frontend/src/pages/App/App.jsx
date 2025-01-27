import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import ServicesPage from "../ServicesPage/ServicesPage";
import AboutPage from "../AboutPage/AboutPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../components/NavBar/NavBar";
import ResourcePage from "../ResourcePage/ResourcePage";
import Footer from "../../components/Footer/Footer";
import PortfolioPage from "../PortfolioPage/PortfolioPage";
import PortfolioDetailPage from "../PortfolioDetailPage/PortfolioDetailPage";
import * as jobService from "../../services/jobService";
import * as quoteService from "../../services/quoteService";
import QuoteFormPage from "../QuoteFormPage/QuoteFormPage";
import QuotePage from "../QuotePage/Quotepage";
import PortfolioFormPage from "../PortfolioFormPage/PortfolioFormPage";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [jobs, setJobs] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const navigate = useNavigate();

  async function handleAddJob(jobFormData) {
    const newJob = await jobService.create(jobFormData);
    setJobs([newJob, ...jobs]);
    navigate("/jobs");
  }

  async function handleAddQuote(quoteFormData) {
    const newQuote = await quoteService.create(quoteFormData);
    setQuotes([newQuote, ...quotes]);
    navigate("/quotes");
  }

  async function handleDeleteJob(jobId) {
    const deletedJob = await jobService.deleteJob(jobId);
    // Filter state using deletedHoot._id:
    setJobs(jobs.filter((job) => job._id !== deletedJob._id));
    navigate("/jobs");
  }

  async function handleUpdateJob(jobId, jobFormData) {
    const updatedJob = await jobService.updateJob(jobId, jobFormData);
    // We use map() here to update a specific job in the jobs state array.
    setJobs(jobs.map((job) => (jobId === job._id ? updatedJob : job)));
    navigate(`/jobs/${jobId}`);
  }

  useEffect(() => {
    async function fetchAllJobs() {
      const jobsData = await jobService.index();
      setJobs(jobsData);
    }
    fetchAllJobs();
    // Adding user to dependency array cuases the effect to fire off when
    //  page loads of the user state changes.
  }, []);

  return (
    <>
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        <section id="main-section">
          {user ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcePage />} />
              <Route path="/jobs" element={<PortfolioPage jobs={jobs} />} />
              <Route
                path="/jobs/new"
                element={
                  <PortfolioFormPage
                    user={user}
                    handleAddJob={handleAddJob}
                    handleUpdateJob={handleUpdateJob}
                  />
                }
              />
              <Route
                path="/jobs/:jobId/edit"
                element={<PortfolioFormPage handleUpdateJob={handleUpdateJob} />}
              />
              <Route
                path="/jobs/:jobId"
                element={
                  <PortfolioDetailPage
                    jobs={jobs}
                    user={user}
                    handleDeleteJob={handleDeleteJob}
                  />
                }
              />
              <Route path="/quotes" element={<QuotePage user={user} />} />
              <Route
                path="/quotes/new"
                element={
                  <QuoteFormPage user={user} handleAddQuote={handleAddQuote} />
                }
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/jobs" element={<PortfolioPage jobs={jobs} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcePage />} />
              <Route
                path="/jobs/:jobId"
                element={
                  <PortfolioDetailPage
                    jobs={jobs}
                    user={user}
                    // handleDeleteHoot={handleDeleteHoot}
                  />
                }
              />
              <Route path="/quotes" element={<QuotePage user={user} />} />
              <Route
                path="/quotes/new"
                element={
                  <QuoteFormPage user={user} handleAddQuote={handleAddQuote} />
                }
              />
              <Route
                path="/signup"
                element={<SignUpPage setUser={setUser} />}
              />
              <Route path="/login" element={<LogInPage setUser={setUser} />} />
            </Routes>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
