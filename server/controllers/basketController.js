const {BasketDevice,Device} = require('../models/models')
class BasketController{
        async create(req,res){
                const {deviceId,basketId,amount} = req.body;
                const basket_device = await BasketDevice.create({deviceId,basketId,amount});
                return res.json(basket_device);
        }
        async change(req,res){
                const {deviceId,basketId,amount,id} = req.body;
                const basket = await BasketDevice.update({deviceId,basketId,amount},{where:{id:id}});
                return res.json(basket);
        }
        async getAll(req,res){
                const basket = await BasketDevice.findAll({
                        include: [{model: Device,as:'device'}]
                });
                return res.json(basket);
        }
        async remove(req,res){
               const {id} = req.query;
               const basket = await BasketDevice.destroy({where: {id:id}});
               return res.json(basket);
        }
}
module.exports = new BasketController();