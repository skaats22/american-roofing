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
import * as quoteService from "../../services/quoteService"
import QuoteFormPage from "../QuoteFormPage/QuoteFormPage";
import QuotePage from "../QuotePage/Quotepage";





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

  async function handleDeleteHoot(hootId) {
    const deletedHoot = await hootService.deleteHoot(hootId);
    // Filter state using deletedHoot._id:
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate("/hoots");
  }

  async function handleUpdateHoot(hootId, hootFormData) {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    // We use map() here to update a specific hoot in the hoots state array.
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
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
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
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
                  handleDeleteHoot={handleDeleteHoot}
                />
              }
            />
            <Route path="/quotes" element={<QuotePage user={user} />} />
            <Route path="/quotes/new" element={<QuoteFormPage user={user} handleAddQuote={handleAddQuote} />} />
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
                  handleDeleteHoot={handleDeleteHoot}
                />
              }
            />
            <Route path="/quotes" element={<QuotePage user={user} />} />
            <Route path="/quotes/new" element={<QuoteFormPage user={user} handleAddQuote={handleAddQuote} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
