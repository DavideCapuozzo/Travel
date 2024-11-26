const express = require('express');
const { getAllUsers, creatUser, updateUser, delateUser } = require('../controllers/userController')
const  router = express.Router();

router.get('/getUser', getAllUsers);
router.post('/postUser', creatUser);
router.put('/:id', updateUser);
router.delete('/:id', delateUser);

module.exports = router;