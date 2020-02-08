const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class SpeakerService {
  constructor(data) {
    this.data = data;
  }
  async getNames() {
    const speakers = await this.getSpeakers();
    return speakers.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname
    }));
  }
  async getShortNames() {
    const speakers = await this.getSpeakers();
    return speakers.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title
    }));
  }
  async getList() {
    const speakers = await this.getSpeakers();
    return speakers.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title,
      summary: speaker.summary
    }));
  }
  async getAllArtworks() {
    const speakers = await this.getSpeakers();
    return speakers.reduce((acc, item) => {
      if (item && item.artwork) {
        acc = [...acc, ...item.artwork];
      }
      return acc;
    }, []);
  }
  async getSpeaker(name) {
    const speakers = await this.getSpeakers();
    return speakers.find(speaker => speaker.shortname === name);
  }
  async getSpeakers() {
    const res = await readFile(this.data, "utf8");
    if (!res) return [];
    return JSON.parse(res).speakers;
  }
}

module.exports = SpeakerService;
