import axios from "axios";

const BASE = "/api";

export const transcribeVideo = (youtube_url) =>
  axios.post(`${BASE}/transcribe`, { youtube_url });

export const getAllTranscriptions = () =>
  axios.get(`${BASE}/transcriptions`);

export const getTranscription = (id) =>
  axios.get(`${BASE}/transcriptions/${id}`);

export const deleteTranscription = (id) =>
  axios.delete(`${BASE}/transcriptions/${id}`);
