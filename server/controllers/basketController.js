const {BasketDevice,Device,User,Basket} = require('../models/models')
const {Op} = require("sequelize");
class BasketController{
        async create(req,res){
                let {deviceId,basketId,amount,end} = req.body;
                let basket_device;
                if(end !== 1){
                     basket_device = await BasketDevice.create({deviceId,basketId,amount});
                } else {
                    const basket = await Basket.findOne({where: {id: basketId}});
                   let {id} =  await Basket.create({userId: basket.userId});
                    basket_device = id;
                }

                return res.json(basket_device);
        }
        async change(req,res){
                const {deviceId,basketId,amount,id} = req.body;
                const basket = await BasketDevice.update({deviceId,basketId,amount},{where:{id:id}});
                return res.json(basket);
        }
        async getAll(req,res){
                let data ={};
                 data.basket = await BasketDevice.findAll({
                     attributes:['basketId','amount'],
                        include: [{model: Device,
                        attributes:['name','price','img','createdAt']},
                            {model: Basket,
                            include:{model:User}}
                        ],
                });
                 data.user = await Basket.findAll({attributes:['id'],
                     include:{model:User,as:'user',attributes:['email']}});
                return res.json(data);
        }
        async remove(req,res){
               const {id} = req.query;
               const basket = await BasketDevice.destroy({where: {id:id}});
               return res.json(basket);
        }
}
module.exports = new BasketController();