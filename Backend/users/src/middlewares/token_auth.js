import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const key= process.env.SECRET_KEY_LOGIN


export function authenticate_token(req, res, next) {


    const auth_header = req.headers['authorization'];

    const token = auth_header && auth_header.split(' ')[1];

    if(!token){

        return res.status(401).json({message: 'Token missing ~_~ get one and try again'});
    }

    jwt.verify(token, key, (error, payload) => {

        if(error) {
            return res.status(401).json({message : 'invalid or expired token ~_~'})
        }

        //esto es importante ya que es para poder usar los datos del usuario que viene en el token
        //por si es admin etc
        req.user = payload;
        next();
    })


}