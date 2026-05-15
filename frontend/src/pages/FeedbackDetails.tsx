import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService';
import type { Feedback } from '../types/feedback';
import StarRating from '../components/StarRating';

export default function FeedbackDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!id) return;
    feedbackService
      .getById(id)
      .then(setFeedback)
      .catch(() => setError('Feedback not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this feedback?')) return;
    try {
      await feedbackService.delete(id!);
      navigate('/');
    } catch {
      alert('Failed to delete.');
    }
  };

  if (loading) return <div className="container mt-4"><div className="spinner-border" /></div>;
  if (error || !feedback) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Feedback Details</h2>
        <Link to="/" className="btn btn-secondary">← Back</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <th style={{ width: 180 }}>Teacher Name</th>
                <td>{feedback.teacherName}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{feedback.subject}</td>
              </tr>
              <tr>
                <th>Rating</th>
                <td>
                  <StarRating rating={feedback.rating} />
                  <span className="ms-2 text-muted">({feedback.rating}/5)</span>
                </td>
              </tr>
              <tr>
                <th>Comments</th>
                <td>{feedback.comments}</td>
              </tr>
              <tr>
                <th>Submitted</th>
                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex gap-2">
          <Link to={`/feedbacks/${feedback._id}/edit`} className="btn btn-warning">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
