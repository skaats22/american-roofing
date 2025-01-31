import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as quoteService from "../../services/quoteService";
import styles from "./QuoteDetailPage.module.css";

function QuoteDetailPage() {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    async function fetchQuote() {
      const quoteData = await quoteService.show(quoteId);
      setQuote(quoteData);
    }
    fetchQuote();
  }, [quoteId]);

  return (
    <main className={styles.mainContainer}>
      <section className={styles.jobDetailContainer}>
        <header className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>{quote.address}</h2>
        </header>

        <div className={styles.textImgContainer}>
          <div>
            <ul className={styles.jobDetails}>
              <li>
                <strong>Name:</strong> {quote.firstName} {quote.lastName}
              </li>
              <li>
                <strong>Phone:</strong> {quote.phone}
              </li>
              <li>
                <strong>Location:</strong> {quote.city}, {quote.state}{" "}
                {quote.zip}
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
              <li>
                <strong>Description:</strong> {quote.description}
              </li>
            </ul>
          </div>

          <div>
            <img
              src={quote.photo}
              alt="Quote image"
              className={styles.jobImage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuoteDetailPage;
