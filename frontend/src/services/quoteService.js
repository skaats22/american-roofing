import sendRequest from "./sendRequest";

const BASE_URL = '/api/quotes';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(formData) {
  return sendRequest(BASE_URL, 'POST', formData);
}

export async function show(quoteId) {
  return sendRequest(`${BASE_URL}/${quoteId}`);
}