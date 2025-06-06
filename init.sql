
DROP DATABASE IF EXISTS mydatabase;
CREATE DATABASE mydatabase;


USE mydatabase;


CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT DEFAULT NULL,
    dt_publication DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Fixtures pour BDD, merci chatGPT de m'avoir créer cela 
INSERT INTO articles (titre, contenu) VALUES
('Premier Article sur le DevOps', 'Ce contenu est le premier article sur l''integration continue et le deploiement continu.'),
('L''importance de Jenkins', 'Jenkins est un outil open-source puissant pour automatiser les taches de build, de test et de deploiement.'),
('La conteneurisation avec Docker', 'Docker permet d''empaqueter les applications et leurs dependances dans des conteneurs isoles.'),
('Bases de données relationnelles et MySQL', 'MySQL est un système de gestion de base de donnees relationnelle open-source tres populaire.'),
('Meilleures pratiques CI/CD', 'L''automatisation, les tests frequents et la surveillance sont essentiels pour un pipeline CI/CD efficace.');