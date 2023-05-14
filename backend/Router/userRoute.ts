const router = require("express").Router();

router.get("/", async (req: any, res: any) => {
  res.send("i love chess");
});

module.exports = router;
