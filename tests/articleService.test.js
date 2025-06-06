

// Import des modules
const ArticleService = require('../services/articleService');
const { pool, testDbConnection } = require('../config/db'); 
const Article = require('../models/article'); 


require('dotenv').config();

describe('ArticleService', () => {
    beforeAll(async () => {
        let connection;
        try {
            await testDbConnection();

            connection = await pool.getConnection();

            await connection.query('DELETE FROM articles');

            await connection.query('ALTER TABLE articles AUTO_INCREMENT = 1');

            await connection.query(
                "INSERT INTO articles (titre, contenu) VALUES (?, ?)",
                ["Article Test 1", "Contenu du test 1"]
            );
            await connection.query(
                "INSERT INTO articles (titre, contenu) VALUES (?, ?)",
                ["Article Test 2", "Contenu du test 2"]
            );
            console.log('Base de données de test préparée avec succès.');
        } catch (error) {
            console.error("Échec de la préparation de la BDD pour les tests :", error);
            process.exit(1);
        } finally {
            if (connection) connection.release(); 
        }
    });

    afterAll(async () => {
        await pool.end();
        console.log('Pool de connexions à la BDD fermé.');
    });


    test('getAllArticles doit retourner un tableau d\'articles', async () => {
        const articles = await ArticleService.getAllArticles();
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThanOrEqual(2); 
        expect(articles[0]).toBeInstanceOf(Article); 
        expect(articles[0]).toHaveProperty('id');
        expect(articles[0]).toHaveProperty('titre');
        expect(articles[0]).toHaveProperty('contenu');
        expect(articles[0]).toHaveProperty('dt_publication');
    });

    test('getArticleById doit retourner un article par son ID', async () => {
        const article = await ArticleService.getArticleById(1);
        expect(article).not.toBeNull(); 
        expect(article.id).toBe(1); 
        expect(article.titre).toBe("Article Test 1"); 
        expect(article).toBeInstanceOf(Article); 
    });

    test('getArticleById doit retourner null si l\'article n\'est pas trouvé', async () => {
        const article = await ArticleService.getArticleById(9999);
        expect(article).toBeNull(); 
    });
});