const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());



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
        }

     
      
      
];


const validateBlogPost = (req, res, next) => {
    const { title, content, author } = req.body;
  
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required fields' });
    }
  
   
  
    next();
  };

app.get('/posts', (req, res) => {
    res.json(blogPosts);
});


app.get('/posts/:id', (req, res) => {
   
    const post = blogPosts.find(post => post.id === req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});




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


app.put('/posts/:id',validateBlogPost, (req, res) => {
   
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


app.delete('/posts/:id', (req, res) => {
    
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




