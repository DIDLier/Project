export interface Feedback {
  _id: string;
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackInput {
  teacherName: string;
  subject: string;
  rating: number;
  comments: string;
}
