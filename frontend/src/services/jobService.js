import sendRequest from "./sendRequest";

const BASE_URL = '/api/jobs';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(content) {
  console.log("content:", content)
  return sendRequest(BASE_URL, 'POST', content);
}

export async function show(jobId) {
  return sendRequest(`${BASE_URL}/${jobId}`);
}

export async function deleteJob(jobId) {
  return sendRequest(`${BASE_URL}/${jobId}`, 'DELETE');
}

export function updateJob(jobId, jobFormData) {
  return sendRequest(`${BASE_URL}/${jobId}`, 'PUT', jobFormData);
}