const {Router} = require('express')
const Auth = require('../middlewares/auth');
const imgController = require('../controllers/ImgController')
const fileUpload = require('express-fileupload')
const router = new Router()

router.get('/', Auth.admin, imgController.getAll );

router.post('/', Auth.user, fileUpload({useTempFiles: true }),
  imgController.upload);

module.exports = router