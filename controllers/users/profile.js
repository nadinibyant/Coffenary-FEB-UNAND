const {
    response
} = require('express')
const User = require('../../models/user')
const controllers = {}
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        const role = decoded.role;
        if (role == 1) {
            next();
        } else {
            return res.redirect('/login');
        }
        
    } catch (error) {
        return res.redirect('/login');
    }
};

const profileView = async (req,res) => {
    res.render('users/profile/profile')
}
controllers.profileView = [verifyToken,profileView]

module.exports = controllers
