import sendRequest from "./sendRequest";

const BASE_URL = '/api/jobs';

export function createReview(jobId, reviewFormData) {
  return sendRequest(
    `${BASE_URL}/${jobId}/reviews`,
    'POST',
    reviewFormData
  );
}

export function deleteReview(jobId, reviewId) {
  return sendRequest(`${BASE_URL}/${jobId}/reviews/${reviewId}`, 'DELETE');
}

export function updateReview(jobId, reviewId, reviewFormData) {
  return sendRequest(
    `${BASE_URL}/${jobId}/reviews/${reviewId}`, 
    'PUT',
    reviewFormData
  );
}