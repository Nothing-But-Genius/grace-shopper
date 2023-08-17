import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addReview } from '../store/reviews'
import { fetchReviews } from '../store/reviews';
import axios from 'axios'
import {setReviews} from '../store/reviews'
import AddReviewForm from './AddReviewForm';
import { useParams } from 'react-router-dom';

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
    // //Reviews
  const reviews = useSelector (state =>state.reviews)

    useEffect(() => {
      dispatch(fetchReviews(id));
    }, [id, dispatch])


  return (
    <div>
      <h4>Reviews</h4>
      <ul>
        {/* {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.text}</h3>
            <p>Created At: {review.createdAt}</p>
          </li>
        ))} */}
      </ul>
      <AddReviewForm />
    </div>
  );
}


export default Reviews;