import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService';
import type { Feedback } from '../types/feedback';
import StarRating from '../components/StarRating';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    feedbackService
      .getAll()
      .then(setFeedbacks)
      .catch(() => setError('Failed to load feedbacks.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this feedback?')) return;
    try {
      await feedbackService.delete(id);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch {
      alert('Failed to delete.');
    }
  };

  if (loading) return <div className="container mt-4"><div className="spinner-border" /></div>;
  if (error)   return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Feedback List</h2>
        <Link to="/create" className="btn btn-primary">+ New Feedback</Link>
      </div>

      {feedbacks.length === 0 ? (
        <div className="alert alert-info">No feedback records yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Teacher Name</th>
                <th>Subject</th>
                <th>Rating</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, i) => (
                <tr key={f._id}>
                  <td>{i + 1}</td>
                  <td>{f.teacherName}</td>
                  <td>{f.subject}</td>
                  <td><StarRating rating={f.rating} /></td>
                  <td className="text-truncate" style={{ maxWidth: 200 }}>{f.comments}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-1 text-white"
                      onClick={() => navigate(`/feedbacks/${f._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => navigate(`/feedbacks/${f._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(f._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
