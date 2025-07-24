const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const postRoutes = require('./routes/posts');
const tagRoutes = require('./routes/tags');
const categoryRoutes = require('./routes/categories');

const app = express();
const port = 3000;

// لطفا رشته اتصال دیتابیس خود را اینجا قرار دهید
const dbURI = 'mongodb+srv://blog:blogpassword123@cluster0.2gc2dcq.mongodb.net/blog_db?retryWrites=true&w=majority&appName=Cluster0';mongoose.connect(dbURI)
  .then(() => {
    console.log('موفقیت در اتصال به MongoDB');
    app.listen(port, () => {
      console.log(`سرور در آدرس http://localhost:${port} در حال اجراست`);
    });
  })
  .catch((err) => console.log('خطا در اتصال به دیتابیس:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/categories', categoryRoutes);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'نام کاربری یا رمز عبور اشتباه است' });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/articals.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'articals.html')));
app.get('/artical_page.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'artical_page.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/admin.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));