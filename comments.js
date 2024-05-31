// Create web server and listen to port 5000
// This server will handle the comments and likes of the posts
// It will also handle the deletion of comments
// It will also handle the deletion of posts
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./comments.json')));
});

app.get('/comments/:postId', (req, res) => {
    const postId = req.params.postId;
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const postComments = comments.filter(comment => comment.postId == postId);
    res.json(postComments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    comments.push(comment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(comments);
});

app.delete('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const newComments = comments.filter(comment => comment.id != commentId);
    fs.writeFileSync('./comments.json', JSON.stringify(newComments));
    res.json(newComments);
});

app.delete('/comments/post/:postId', (req, res) => {
    const postId = req.params.postId;
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const newComments = comments.filter(comment => comment.postId != postId);
    fs.writeFileSync('./comments.json', JSON.stringify(newComments));
    res.json(newComments);
});

app.get('/likes', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./likes.json')));
});

app.get('/likes/:postId', (req, res) => {
    const postId = req.params.postId;
    const likes = JSON.parse(fs.readFileSync('./likes.json'));
    const postLikes = likes.filter(like => like.postId == postId);
    res.json(postLikes);
});

app.post('/likes', (req, res) => {
    const like = req.body;
    const likes = JSON.parse(fs.readFileSync('./likes.json'));
    likes.push(like);
    fs.writeFileSync('./likes.json', JSON.stringify(likes));
    res.json(likes);
});
