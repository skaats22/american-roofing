import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as quoteService from "../../services/quoteService";

function QuoteDetailPage(props) {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState([]);

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
    async function fetchQuote() {
      const quoteData = await quoteService.show(quoteId);
      setQuote(quoteData);
    }
    fetchQuote();
    // Empty dependency array means run this only once after rendering
  }, [quoteId]);

  return (
    <main>
      <section>
        <header>
          <article>
            <header>
              <h2>{quote.address}</h2>
            </header>
            <ul>
              <li>{quote.phone}</li>
              <li>
                {quote.city}, {quote.state} {quote.zip}
              </li>
              <li>{quote.propertyType}</li>
              <li>{quote.serviceType}</li>
              <li>{quote.roofMaterial}</li>
              <li>{quote.description}</li>
            </ul>
            <div>
              <img src={quote.photo} alt="Quote image" className="PostItem" />
            </div>
          </article>
        </header>
      </section>
    </main>
  );
}

export default QuoteDetailPage;
