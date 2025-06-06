
const { pool } = require('../config/db'); 
const Article = require('../models/article'); 

class ArticleService {
    /**
     * Récupère les articles de la BDD.
     * @returns {Promise<Array<Article>>} 
     */
    static async getAllArticles() {
        let connection;
        try {
            connection = await pool.getConnection(); 
            const [rows] = await connection.query('SELECT * FROM articles');
            return rows.map(row => new Article(row.id, row.titre, row.contenu, row.dt_publication));
        } catch (error) {
            console.error('Erreur lors de la récupération des articles :', error);
            throw new Error('Impossible de récupérer les articles.'); 
        } finally {
            if (connection) connection.release(); 
        }
    }

    /**
     * Récupère un article par son ID.
     * @param {number} id 
     * @returns {Promise<Article|null>} 
     */
    static async getArticleById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null; 
            }
            const row = rows[0];
            return new Article(row.id, row.titre, row.contenu, row.dt_publication);
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'article avec l'ID ${id} :`, error);
            throw new Error(`Impossible de récupérer l'article avec l'ID ${id}.`);
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = ArticleService;