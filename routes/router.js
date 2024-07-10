const express = require('express')
const userController = require('../controllers/userController')
const propertyController = require('../controllers/propertyController')
const feedbackController = require('../controllers/feedbackController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
 

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//add property
router.post('/property/add',jwtMiddleware,multerMiddleware.single('propertyImg'),propertyController.addPropertyController)

//all properties
router.get('/all-properties',jwtMiddleware,propertyController.getAllPropertyController)

//user properties
router.get('/user-properties',jwtMiddleware,propertyController.getUserPropertyController)

// get property by ID
router.get('/property/:id', jwtMiddleware, propertyController.getPropertyByIdController);
 
// Get user details by ID
router.get('/user/:userId', userController.getUserDetailsById); // Add this route for fetching user details


//edit property
router.put('/property/:pid/edit',jwtMiddleware,multerMiddleware.single('propertyImg'),propertyController.editPropertyController)


//remove property
router.delete('/property/:pid/remove',jwtMiddleware,propertyController.removePropertyController) 

//save feedback
router.post('/feedback', feedbackController.saveFeedbackController);


module.exports = router