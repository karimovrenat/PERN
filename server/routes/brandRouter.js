const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/roleMiddleware')


router.post('/',checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/',brandController.remove)

module.exports = router