const router = require("express").Router();

module.exports = ({ speakersService }) => {
  router.get("/", async (req, res) => {
    const speakers = await speakersService.getList();
    const artwork = await speakersService.getAllArtworks();
    res.render("speakers", { page: "Speakers List", speakers, artwork });
  });
  router.get("/:name", async (req, res) => {
    const { name } = req.params;
    const speaker = await speakersService.getSpeaker(name);
    res.render("speakers/details", {
      page: name,
      speaker,
      artwork: speaker.artwork
    });
  });

  return router;
};
