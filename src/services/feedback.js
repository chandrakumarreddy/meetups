const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
  constructor(data) {
    this.data = data;
  }
  async getData() {
    const res = await readFile(this.data);
    if (!res) return [];
    return JSON.parse(res);
  }
  async addComment(newFeedback) {
    const feedbacks = await this.getData();
    feedbacks.unshift(newFeedback);
    return writeFile(this.data, JSON.stringify(feedbacks), "utf8");
  }
}
module.exports = FeedbackService;
