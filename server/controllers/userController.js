const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
        return jwt.sign(
            {id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
}

class UserController{
        async registration(req,res,next){
                const {email,password,role} = req.body
                if(!email || !password){
                        return next(ApiError.badRequest('не корректный имейл и ли пароль'))
                }
                const candidate = await User.findOne({where: {email}});
                if(candidate){
                        return next(ApiError.badRequest('Пользователь с таким имейлом уже создан'))
                }
                const hashPassword = await bcrypt.hash(password,5);
                const user = await User.create({email, role, password: hashPassword})
                const basket = await Basket.create({user_id:user.id})
                return res.status(200).json(basket);
        }
        async login(req,res,next){
                const {email,password} = req.body;
                const user = await User.findOne({where:{email}});
                if(!user){
                        return next(ApiError.internal(' User with the same email doesnt find'));
                }
                const comparePassword = bcrypt.compareSync(password,user.password);
                if(!comparePassword){
                        return next(ApiError.internal(' Password error'));
                }
                const basket = JSON.stringify(await Basket.findOne({where:{user_id:user.id}}));
                const token = generateJwt(user.id, user.email, user.role);
                return res.json({token,basket});
        }
        async check(req,res){
                const token = generateJwt(req.user.id, req.user.email, req.user.role)
                return res.json({token})
        }
}
module.exports = new UserController();