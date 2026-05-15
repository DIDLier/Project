import axios from 'axios';
import type { Feedback, FeedbackInput } from '../types/feedback';

const BASE_URL = 'https://your-render-app.onrender.com/api/feedbacks';

export const feedbackService = {
  getAll: async (): Promise<Feedback[]> => {
    const { data } = await axios.get<Feedback[]>(BASE_URL);
    return data;
  },

  getById: async (id: string): Promise<Feedback> => {
    const { data } = await axios.get<Feedback>(`${BASE_URL}/${id}`);
    return data;
  },

  create: async (input: FeedbackInput): Promise<Feedback> => {
    const { data } = await axios.post<Feedback>(BASE_URL, input);
    return data;
  },

  update: async (id: string, input: FeedbackInput): Promise<Feedback> => {
    const { data } = await axios.put<Feedback>(`${BASE_URL}/${id}`, input);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
