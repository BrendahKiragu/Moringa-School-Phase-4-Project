import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Image,
  ListGroup,
  ButtonGroup,
  Button,
  Form,
} from "../components";
import { useBookById, useCreateTransaction } from "../hooks";
import { UserContext } from "../contexts";
import { showErrorToast, showSuccessToast } from "../utils";

const Book = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { book, setBook, loading, error } = useBookById(bookId);
  const { user } = useContext(UserContext);
  const { createTransaction, isLoading: transactionLoading } =
    useCreateTransaction();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // State to hold rating input
  const [reviews, setReviews] = useState([]); // State to store reviews

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?book_id=${bookId}`);
        const data = await response.json();
        setReviews(data); // Set reviews data
      } catch (err) {
        showErrorToast("Failed to fetch reviews");
      }
    };

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  const handleBuyClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      await createTransaction({
        transactionType: "buy",
        bookId: book.id,
      });
      showSuccessToast("Book purchased successfully");
      setBook({ ...book, status: "bought" });
    } catch (err) {
      showErrorToast(err.message);
    }
  };

  const handleRentClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      await createTransaction({
        transactionType: "rent",
        bookId: book.id,
      });
      showSuccessToast("Book rented successfully");
      setBook({ ...book, status: "rented" });
    } catch (err) {
      showErrorToast(err.message);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return navigate("/login");
    }

    const newReview = {
      rating: rating,
      comment: reviewText,
      user_id: user.id,
      book_id: bookId,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);

      setReviewText(""); // Clears input fields
      setRating(5); // Resets rating to a default of 5
      showSuccessToast("Review submitted successfully");
    } catch (err) {
      console.error(err); // Log error to console for more info
      showErrorToast(err.message);
    }
  };

  return (
    <Container as="main" className="py-5" style={{ maxWidth: 600 }}>
      {loading && (
        <Row as="section">
          <p className="lead">Loading....</p>
        </Row>
      )}
      {error && (
        <Row as="section">
          <p className="lead fst-itacli text-danger">{error}</p>
        </Row>
      )}
      {book && (
        <>
          <Row as="section">
            <h1 className="text-center">{book.title}</h1>
          </Row>
          <Row as="section">
            <Image
              src={book.imageUrl}
              height={400}
              className="object-fit-cover"
            />
            <p className="lead">{book.description}</p>
          </Row>
          <Row as="section">
            <h2>Book Details</h2>
            <ListGroup>
              <ListGroup.Item>Author: {book.author}</ListGroup.Item>
              <ListGroup.Item>Status: {book.status}</ListGroup.Item>
              <ListGroup.Item>Price: ${book.price}</ListGroup.Item>
              <ListGroup.Item>Condition: {book.condition}</ListGroup.Item>
            </ListGroup>
          </Row>
          {book.status === "available" && (
            <Row as="section" className="mt-4">
              <ButtonGroup aria-label="Basic example">
                <Button
                  disabled={transactionLoading}
                  onClick={handleBuyClick}
                  variant="success"
                >
                  Buy
                </Button>
                <Button
                  disabled={transactionLoading}
                  onClick={handleRentClick}
                  variant="secondary"
                >
                  Rent
                </Button>
              </ButtonGroup>
            </Row>
          )}
          {book.status === "rented" && (
            <p className="lead fst-italic">
              Book is currently rented. Be on the lookout for when it is next
              available.
            </p>
          )}

          {/* Review Section */}
          <Row as="section" className="mt-4">
            <h2>Reviews</h2>
            <ListGroup>
              {reviews.length === 0 ? (
                <ListGroup.Item>No reviews yet</ListGroup.Item>
              ) : (
                reviews.map((review, index) => (
                  <ListGroup.Item key={index}>
                    <p className="mb-1">
                      <strong>
                        Reviewed by:
                        {review.user && review.user.username
                          ? review.user.username
                          : `User ${review.user_id || "Anonymous"}`}
                      </strong>{" "}
                      <small>
                        (
                        {review.date
                          ? new Date(review.date).toLocaleString()
                          : "No date available"}
                        )
                      </small>
                    </p>
                    <p>
                      <strong>Rating:</strong> {review.rating}/5
                    </p>
                    <p>
                      <strong>Comment:</strong> {review.comment}
                    </p>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Row>

          {/* Review Form */}
          {user && (
            <Row as="section" className="mt-4">
              <h2>Leave a Review</h2>
              <Form onSubmit={handleReviewSubmit}>
                <Form.Group controlId="rating">
                  <Form.Label>Select a Rating Below</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="reviewText">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    placeholder="Write your comment here"
                  />
                </Form.Group>

                <Button className="mt-2" type="submit" variant="primary">
                  Submit Review
                </Button>
              </Form>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export { Book };
