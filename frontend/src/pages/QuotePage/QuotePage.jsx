import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as quoteService from "../../services/quoteService";
import styles from "./QuotePage.module.css";

export default function QuotePage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function fetchQuotes() {
      const fetchedQuotes = await quoteService.index();
      setQuotes(fetchedQuotes);
    }
    fetchQuotes();
  }, []);

  return (
    <div className={styles.quotePageContainer}>
      <h1>All Quotes</h1>
      <div className={styles.quoteList}>
        {quotes.map((quote) => (
          <div className={styles.quoteCard} key={quote._id}>
            <Link className={styles.quoteLink} to={`/quotes/${quote._id}`}>
              <div className={styles.quoteHeader}>
                <h2 className={styles.quoteTitle}>
                  {quote.address}, {quote.city}, {quote.state}
                </h2>
              </div>
              <ul className={styles.quoteDetails}>
                <li>
                  <strong>Name:</strong> {quote.firstName} {quote.lastName}
                </li>
                <li>
                  <strong>Email:</strong> {quote.email}
                </li>
                <li>
                  <strong>Phone:</strong> {quote.phone}
                </li>
                <li>
                  <strong>Property Type:</strong> {quote.propertyType}
                </li>
                <li>
                  <strong>Service Type:</strong> {quote.serviceType}
                </li>
                <li>
                  <strong>Roof Material:</strong> {quote.roofMaterial}
                </li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
