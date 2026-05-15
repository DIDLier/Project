import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedbackList    from './pages/FeedbackList';
import FeedbackDetails from './pages/FeedbackDetails';
import FeedbackForm    from './pages/FeedbackForm';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                        element={<FeedbackList />} />
        <Route path="/feedbacks/:id"           element={<FeedbackDetails />} />
        <Route path="/create"                  element={<FeedbackForm />} />
        <Route path="/feedbacks/:id/edit"      element={<FeedbackForm />} />
        <Route path="*"                        element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
