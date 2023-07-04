const router = require('express').Router();
const userRoutes = require('./user-routes');

//  set routes for users
router.use('/users', userRoutes);

module.exports = router;
