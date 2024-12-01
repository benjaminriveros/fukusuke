const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const router = express.Router();

// Rutas para usuarios
router.post('/register', registerUser); // Registro de usuarios
router.post('/login', loginUser);       // Inicio de sesión
router.get('/', getUsers);             // Listar todos los usuarios (para pruebas)

module.exports = router;
