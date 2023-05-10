const {Brand} = require('../models/models')
class BrandController{
        async create(req,res){
                const {name} = req.body;
                const brand = await Brand.create({name});
                return res.json(brand);
        }
        async getAll(req,res){
                const brands = await Brand.findAll();
                return res.json(brands);
        }
        async remove(req,res){
                try{
                        const brand_id = req.query.id;
                        const brand = await Brand.findByPk(brand_id);
                        if(brand){
                                await Brand.destroy({where:{id:brand_id}});
                                return res.status(200).json('The row with '+ brand_id+'has been destroyed');
                        }
                        else{
                                return res.status(400).json('The row with id '+ brand_id+'do not find');
                        }
                }
                catch (e) {
                        return res.status(500).json("Server error");
                }



        }
}
module.exports = new BrandController();