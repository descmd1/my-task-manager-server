const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:300',
    methodes: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
  }));
app.use(express.json());
mongoose.connect('mongodb+srv://chris-work_101:desbully1@cluster0.yojdwqt.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0')
// Routes
app.use('/api', taskRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
