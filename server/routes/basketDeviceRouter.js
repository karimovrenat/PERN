const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.create)
router.put('/',basketController.change)
router.get('/', basketController.getAll)
router.delete('/',basketController.remove)

module.exports = router