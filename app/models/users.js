// Import de Mongoose
const mongoose = require('mongoose');
// Création du schéma pour la collection "users"
const userSchema = new mongoose.Schema({
// firsname: { type: String, required: true},
// lastname: { type: String, required: true },
email: { type: String, required: true, unique: true,
    validate: {
        validator: function(email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
        },
        message: 'Veuillez fournir une adresse e-mail valide'
        }
    },
password: { type: String, required: true,

    validate: {
        validator: function(password) {
        return password.length >= 10; 
        },
        message: 'Le mot de passe doit contenir au moins 10 caractéres'
    }
},
});


const User = mongoose.model(User, userSchema);

module.exports = userSchema;