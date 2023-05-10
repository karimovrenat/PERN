const {BasketDevice} = require('../models/models')
class BasketController{
        async create(req,res){
                const {device_id,basket_id,amount} = req.body;
                const basket_device = await BasketDevice.create({device_id,basket_id,amount});
                return res.json(basket_device);
        }
        async change(req,res){
                const {device_id,basket_id,amount,id} = req.body;
                const basket = await BasketDevice.update({device_id,basket_id,amount},{where:{id:id}});
                return res.json(basket);
        }
        async getAll(req,res){
                const {id} = req.query;
                const basket = await BasketDevice.findAll({where:{basket_id:id}});
                return res.json(basket);
        }
        async remove(req,res){
               const {id} = req.query;
               const basket = await BasketDevice.destroy({where: {id:id}});
               return res.json(basket);
        }
}
module.exports = new BasketController();