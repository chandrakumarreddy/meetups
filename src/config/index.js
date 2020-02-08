const path = require("path");

module.exports = {
  development: {
    siteName: "Meetups[development]"
  },
  production: {
    siteName: "Meetups"
  },
  data: {
    speakers: path.resolve(__dirname, "../data/speakers.json"),
    feedback: path.resolve(__dirname, "../data/feedback.json")
  }
};
