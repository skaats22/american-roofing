import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import * as quoteService from "../../services/quoteService";

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
    <div>
      <h1>All Quotes</h1>
      <ul>
        {quotes.map((quote) => (
          <li key={quote._id}>
            <Link to="/quotes/:quoteId">
              <h2>
                {quote.address}, {quote.city}, {quote.state}
              </h2>
              {/* <p><strong>Phone:</strong> {quote.phone}</p>
            <p><strong>Zip Code:</strong> {quote.zipCode}</p>
            <p><strong>Property Type:</strong> {quote.propertyType}</p>
            <p><strong>Service Type:</strong> {quote.serviceType}</p>
            <p><strong>Roof Material:</strong> {quote.roofMaterial}</p>
            <p><strong>Description:</strong> {quote.description}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
