const router = require("express").Router();

module.exports = ({ feedbackService }) => {
  router.get("/", async (req, res) => {
    const feedbacks = await feedbackService.getData();
    res.render("feedback", {
      page: "Feedback",
      feedbacks,
      success: req.query.success
    });
  });
  router.post("/", async (req, res, next) => {
    const { fbName, fbTitle, fbMessage } = req.body;
    const feedbacks = await feedbackService.getData();
    const name = fbName.trim();
    const title = fbTitle.trim();
    const message = fbMessage.trim();
    if (!name || !title || !message) {
      return res.render("feedback", {
        fbName,
        fbTitle,
        fbMessage,
        feedbacks,
        page: "Feedback",
        error: true
      });
    }
    try {
      await feedbackService.addComment({ name, title, message });
      return res.redirect("/feedback?success=true");
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
