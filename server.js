const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',  // Adjust the URL based on your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Uyghur', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a model for Riddle
const riddleSchema = new mongoose.Schema({
  category: String,
  riddle: String,
  answer: String,
  explanation: String,
});

const Riddle = mongoose.model('Riddle', riddleSchema);

// Example route to fetch all riddles
app.get('/api/riddles', async (req, res) => {
  try {
    const riddles = await Riddle.find();
    res.json(riddles);
  } catch (error) {
    console.error('Error fetching riddles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
