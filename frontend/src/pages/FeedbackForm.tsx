import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService';
import type { FeedbackInput } from '../types/feedback';

const EMPTY_FORM: FeedbackInput = {
  teacherName: '',
  subject: '',
  rating: 3,
  comments: '',
};

export default function FeedbackForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm]       = useState<FeedbackInput>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // If editing, load existing data
  useEffect(() => {
    if (!isEdit || !id) return;
    setLoading(true);
    feedbackService
      .getById(id)
      .then(({ teacherName, subject, rating, comments }) =>
        setForm({ teacherName, subject, rating, comments })
      )
      .catch(() => setError('Failed to load feedback.'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdit && id) {
        await feedbackService.update(id, form);
        navigate(`/feedbacks/${id}`);
      } else {
        const created = await feedbackService.create(form);
        navigate(`/feedbacks/${created._id}`);
      }
    } catch {
      setError('Failed to save feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{isEdit ? 'Edit Feedback' : 'New Feedback'}</h2>
        <Link to="/" className="btn btn-secondary">← Back</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Teacher Name</label>
              <input
                type="text"
                className="form-control"
                name="teacherName"
                value={form.teacherName}
                onChange={handleChange}
                placeholder="e.g. Juan dela Cruz"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Introduction to Programming"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Rating: <span className="text-warning">{form.rating}/5</span>
              </label>
              <input
                type="range"
                className="form-range"
                name="rating"
                min={1}
                max={5}
                step={1}
                value={form.rating}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-between text-muted small">
                <span>1 – Poor</span>
                <span>3 – Average</span>
                <span>5 – Excellent</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Comments</label>
              <textarea
                className="form-control"
                name="comments"
                value={form.comments}
                onChange={handleChange}
                rows={4}
                placeholder="Write your feedback here..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEdit ? 'Update Feedback' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
