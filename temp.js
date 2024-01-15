const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for blog posts

let blogPosts = [
    
        {
          "id": "1",
          "title": "Introduction to JavaScript",
          "content": "JavaScript is a versatile programming language used for web development.",
          "author": "John Doe",
          "timestamp": "2023-11-28T12:34:56.789Z"
        },
        {
          "id": "2",
          "title": "Machine Learning Basics",
          "content": "An overview of machine learning concepts and algorithms.",
          "author": "Jane Smith",
          "timestamp": "2023-11-28T13:45:28.501Z"
        },
        
        {
          "id": "3",
          "title": "Healthy Eating Habits",
          "content": "Tips and tricks for maintaining a healthy diet and lifestyle.",
          "author": "Alice Johnson",
          "timestamp": "2023-11-28T14:56:31.234Z"
        },
        {
          "id": "4",
          "title": "Exploring National Parks",
          "content": "A travelogue describing the beauty of various national parks.",
          "author": "Bob Anderson",
          "timestamp": "2023-11-28T15:59:43.210Z"
        },

        {
          "id": "5",
          "title": "Getting Started with React",
          "content": "A beginner's guide to building web applications with React.js.",
          "author": "Emily Wilson",
          "timestamp": "2023-11-28T16:21:57.890Z"
        },

        {
    "id": "6",
    "title": "Intermediate React Concepts",
    "content": "Exploring state management, component lifecycle, and advanced React features.",
    "author": "Alex Turner",
    "timestamp": "2023-11-29T10:45:21.123Z"
  },
  {
    "id": "7",
    "title": "Mastering React Hooks",
    "content": "A comprehensive guide to understanding and using React Hooks for functional components.",
    "author": "Jessica Lee",
    "timestamp": "2023-11-30T14:02:45.678Z"
  },
  {
    "id": "8",
    "title": "Optimizing Performance in React Apps",
    "content": "Tips and techniques to enhance the performance of React applications for better user experiences.",
    "author": "Michael Chen",
    "timestamp": "2023-12-01T08:30:00.000Z"
  }
      
      
];

const validateBlogPost = (req, res, next) => {
    const { title, content, author } = req.body;
  
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required fields' });
    }
  
    // You can add more specific validation checks if needed
  
    next();
  };
// Route to get all blog posts
app.get('/posts', (req, res) => {
  const fs = require('fs');

  // Specify the path to your JSON file
  const filePath = 'data.json';
  var jsonData;
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      try {
        // Parse the JSON data
         jsonData = JSON.parse(data);
  
        // Now you can work with jsonData, which contains the data from the file
        console.log(jsonData);
        res.json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
    }
  });
    
});

// Route to get a single blog post by ID
app.get('/posts/:id', (req, res) => {
    // console.log(req)
    const post = blogPosts.find(post => post.id === req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

// Route to create a new blog post
app.post('/posts',validateBlogPost, (req, res) => {
    const newPost = {
        id: ((blogPosts.length) + 1).toString(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        timestamp: new Date().toISOString()
    };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// Implement other CRUD operations similarly

// Route to update a single blog post by ID
app.put('/posts/:id',validateBlogPost, (req, res) => {
    // console.log(req)
    const post = blogPosts.find(post => post.id === req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    else{
        post.title = req.body.title,
        post.content = req.body.content,
        post.author = req.body.author
    }
    res.json(post);
});

// Route to delete a single blog post by ID
app.delete('/posts/:id', (req, res) => {
    // console.log(req)
    const post = blogPosts.find(post => post.id === req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    else{
        blogPosts.splice(blogPosts.findIndex(post => post.id === req.body.id), 1);
    }
    res.json({message: "Blogpost Deleted!"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${3000}`);
});