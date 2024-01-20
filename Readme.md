# Projet de Gestion de Recettes avec Authentification

## Introduction

Ce projet de gestion de recettes, développé avec Express.js et MongoDB, a été enrichi d'une couche d'authentification pour renforcer la sécurité et le contrôle d'accès à l'API. Les fonctionnalités principales comprennent la création d'utilisateurs, l'authentification sécurisée avec l'utilisation de JSON Web Tokens (JWT), et la protection des routes sensibles.

## Description
Bienvenue dans l'API de gestion de recettes pour le 'Livre de Recettes en Ligne' de FlavorWorld. Cette API, construite avec Express.js et MongoDB, offre des fonctionnalités complètes pour explorer, ajouter, modifier et supprimer des recettes.

## Objectifs Principaux

### 1. Implémentation de l'Authentification

Le développement inclut la mise en place d'un système d'authentification robuste. Les utilisateurs peuvent créer des comptes, s'authentifier de manière sécurisée, et obtenir un jeton d'accès pour les interactions ultérieures avec l'API.

### 2. Protection des Routes Sensibles

Les routes sensibles, comme celles permettant la création, la mise à jour ou la suppression de recettes, sont désormais protégées. Seuls les utilisateurs authentifiés et munis d'un jeton valide sont autorisés à accéder à ces fonctionnalités.

### 3. Gestion des Erreurs

Un système de gestion d'erreurs clair a été implémenté pour fournir des retours d'information précis en cas d'échec d'authentification ou d'accès non autorisé.

### 4. Mise à Jour de la Documentation

La documentation de l'API a été enrichie pour inclure des instructions détaillées sur la création de comptes, l'authentification, et l'utilisation du jeton d'accès pour interagir avec les fonctionnalités protégées.

## Ajout de l'Authentification

Une couche d'authentification a été ajoutée à l'API existante de gestion de recettes. Cette extension permet la création d'utilisateurs, l'authentification via des mécanismes sécurisés tels que JWT, et la protection des routes sensibles. Les utilisateurs authentifiés sont les seuls autorisés à accéder et à effectuer des opérations telles que la création, la mise à jour, ou la suppression de recettes.

## Instructions d'Authentification

Pour utiliser l'API avec authentification, suivez les étapes ci-dessous :

1. **Création de Comptes :**
   - Utilisez un endpoint dédié pour créer un compte utilisateur.

2. **Authentification :**
   - Utilisez vos identifiants pour vous authentifier et obtenir un jeton d'accès.

3. **Utilisation du Jeton :**
   - Incluez le jeton d'accès dans les en-têtes de vos requêtes pour accéder aux fonctionnalités protégées.

## Fonctionnalités Principales
- Exploration des recettes.
- Obtention de détails complets sur chaque recette.
- Ajout de nouvelles recettes.
- Modification des recettes existantes.
- Suppression de recettes inappropriées.

## Technologie Utilisée
- Express.js pour la gestion des requêtes HTTP.
- MongoDB pour le stockage efficace et sécurisé des données.
## Installation et Utilisation

## Installation
1. Clonez le repo : `git clone `
2. Installez les dépendances : `npm install`

## Configuration
- Configurez la connexion à MongoDB dans le fichier `configs/db.js`.
- Assurez-vous d'ajuster les paramètres de sécurité et d'autorisation selon vos besoins.

## Utilisation
1. Lancez l'API : `npm start`
2. Explorez les différentes fonctionnalités via les endpoints définis dans la documentation.
   ```bash
   git clone https://github.com/votre-utilisateur/projet-gestion-recettes.git
