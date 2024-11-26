const express = require('express');
const { getAllOrder, createOrder, filterOrders, updateOrder, delateUser } = require('../controllers/orderController');
const router = express.Router();

router.get('/getOrder', getAllOrder);
router.post('/postOrder', createOrder);
router.get('/filterOrders', filterOrders);
router.put('/:id', updateOrder);
router.delete('/:id', delateUser)

module.exports = router;