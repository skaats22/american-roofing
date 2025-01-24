import sendRequest from "./sendRequest";

const BASE_URL = '/api/jobs';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(content) {
  return sendRequest(BASE_URL, 'POST', { content });
}