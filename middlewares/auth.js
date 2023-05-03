const JWT = require('jsonwebtoken');
require('dotenv').config();
const UserSchema = require('../models/userSchema');

async function verifyToken(req, res, next) {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
        return res.status(401).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
        const decode = JWT.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.user = await UserSchema.findById({ _id: decode.id });

        if (!req.user)
        {
            res.status(404).json({
                success: false,
                error: "Wrong credentials"
              });      
        }

        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

module.exports =  {
    verifyToken,
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userid
            }
            const secret = process.env.SECRET_KEY
            const options = {
                expiresIn: "1y"
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }
};