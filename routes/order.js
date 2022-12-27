const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl.js");
const auth = require("../middleware/auth.js");

router.delete("/:orderId", auth, orderCtrl.deleteOrder);
router.post("/", auth, orderCtrl.createOrder);
router.get("/all", orderCtrl.getOrdersInStore);
router.get("/", auth, orderCtrl.getOrderUser);
router.put("/:orderId", orderCtrl.updateStatusOrder);

module.exports = router;
