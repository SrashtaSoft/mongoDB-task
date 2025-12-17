const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/category_test')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  image_url: String,
  is_active: Boolean
});

const Category = mongoose.model('Category', categorySchema, 'categories');

// Seed Endpoint
app.get('/api/seed', async (req, res) => {
  try {
    await Category.deleteMany({});
    const categories = await Category.insertMany([
      {
        name: "Electronics",
        slug: "electronics",
        image_url: "https://media.istockphoto.com/id/1207400224/photo/high-voltage-power-line-in-a-field-at-sunset.jpg?s=2048x2048&w=is&k=20&c=V_ITkq8aS_1WrPhxYcGKlj596lsTDww4JQ83oaiJyfU=",
        is_active: true
      },
      {
        name: "Books",
        slug: "books",
        image_url: "https://media.gettyimages.com/id/1190433900/photo/pile-of-reading-books.jpg?s=1024x1024&w=gi&k=20&c=Q5sy4ZXMUvL31gQunimSnDJ6do040UhKt6W5xnJqh2g=",
        is_active: true
      }
    ]);
    res.json({ message: 'Database seeded successfully', count: categories.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Categories Endpoint
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

