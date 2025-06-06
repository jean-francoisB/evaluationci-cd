
const express = require('express');
const router = express.Router();
const ArticleService = require('../services/articleService'); 

// Route récupérer les articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleService.getAllArticles();
        res.json(articles); 
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
});

// Route récupérer article par son ID
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await ArticleService.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;