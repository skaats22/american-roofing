import sendRequest from "./sendRequest";

const BASE_URL = '/api/quotes';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(content) {
  return sendRequest(BASE_URL, 'POST', { content });
}

export async function show(jobId) {
  return sendRequest(`${BASE_URL}/${jobId}`);
}