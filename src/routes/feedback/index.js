const router = require("express").Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("feedback", { page: "Feedback" });
  });
  router.post("/", (req, res) => {
    const { fbName, fbTitle, fbMessage } = req.body;
    const name = fbName.trim();
    const title = fbTitle.trim();
    const message = fbMessage.trim();
    if (!name || !title || !message) {
      return res.render("feedback", {
        fbName,
        fbTitle,
        fbMessage,
        error: true
      });
    }
    res.send("feedback post");
  });

  return router;
};
