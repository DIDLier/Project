require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const Feedback = require('./models/Feedback');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// ── Routes ──────────────────────────────────────────

// GET all feedbacks
app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single feedback by id
app.get('/api/feedbacks/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create feedback
app.post('/api/feedbacks', async (req, res) => {
  try {
    const { teacherName, subject, rating, comments } = req.body;
    const feedback = new Feedback({ teacherName, subject, rating, comments });
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update feedback
app.put('/api/feedbacks/:id', async (req, res) => {
  try {
    const { teacherName, subject, rating, comments } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { teacherName, subject, rating, comments },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE feedback
app.delete('/api/feedbacks/:id', async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
