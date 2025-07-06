import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const userId = 'USER_ID_HERE'; // Replace with dynamic user ID fetch logic
  const { token } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vaxtrackhost.onrender.com/api/user/feedback', {
        userId,
        starcount: rating,
        feedback: comment
      }, {
        headers: { token }
      });
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleStarClick = (starValue) => {
    // If user clicks the same star again, reset to 0
    setRating(prev => prev === starValue ? 0 : starValue);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <span
          key={starValue}
          onClick={() => handleStarClick(starValue)}
          className={`text-3xl cursor-pointer transition-colors ${
            rating >= starValue ? 'text-yellow-400' : 'text-gray-400'
          }`}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-5 border border-gray-300 rounded-lg">
      <h2 className="text-center text-gray-800 text-xl font-semibold mb-4">Leave Your Feedback</h2>
      {submitted ? (
        <p className="text-center text-green-600">Feedback Successfully Saved!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block mt-4">Rating:</label>
            <div className="flex space-x-1 mt-1">
              {renderStars()}
            </div>
          </div>
          <div>
            <label className="block mt-4">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackPage;
