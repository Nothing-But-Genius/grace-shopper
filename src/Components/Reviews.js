import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/reviews'


const Reviews = () => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (reviewText.trim() !== '') {
      dispatch(addReview(reviewText));
      setReviewText('');
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default Reviews;