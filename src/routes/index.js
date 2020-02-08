const router = require("express").Router();
const speakers = require("./speakers");
const feedback = require("./feedback");

module.exports = ({ speakersService, feedbackService }) => {
  router.get("/", async (req, res) => {
    try {
      const promises = [];
      promises.push(speakersService.getShortNames());
      promises.push(speakersService.getAllArtworks());
      const [speakersList, artwork] = await Promise.all(promises);
      res.render("index", { page: "Home", speakersList, artwork });
    } catch (error) {
      next(error);
    }
  });
  router.use("/speakers", speakers({ speakersService }));
  router.use("/feedback", feedback({ feedbackService }));
  return router;
};
