const { Router } = require("express");
const Controller = require("./controller");

const router = Router();

router.get("/", Controller.gettodo);
router.post("/", Controller.addtodo);
router.put("/:id", Controller.updatetodo);
router.delete("/:id", Controller.deletetodo);

module.exports = router;
