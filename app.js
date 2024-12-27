const express = require('express');
const app = express();

app.use(express.json());

// Static array to store records
let users = [
    { id: 1, BlogTitle: 'Times Of India', BlogDate: '22-12-24', Url: 'https://timesofindia.indiatimes.com/blogs/' },
    { id: 2, BlogTitle: 'World Bank Blogs', BlogDate: '21-12-24', Url: 'https://blogs.worldbank.org/en/home' }
];

// GET - View all records
app.get('/users', (req, res) => {
    res.json(users);
});

// POST - Create new record
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        BlogTitle: req.body.BlogTitle,
        BlogDate: req.body.BlogDate,
        Url: req.body.Url
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Edit record
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[index] = {
        id: id,
        BlogTitle: req.body.BlogTitle || users[index].BlogTitle,
        BlogDate: req.body.BlogDate || users[index].BlogDate,
        Url: req.body.Url || users[index].Url
    };

    res.json(users[index]);
});

// DELETE - Delete record
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter(user => user.id !== id);
    res.json({ message: 'User deleted successfully' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});