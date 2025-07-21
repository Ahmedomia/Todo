const { Router } = require("express");
const Controller = require("./controller");
const pool = require("../../db");

const router = Router();

router.get("/", Controller.gettodo);
router.post("/", Controller.addtodo);
router.put("/:id", Controller.updatetodo);
router.delete("/:id", Controller.deletetodo);
router.put("/:id/restore", Controller.restoretodo);

module.exports = router;
