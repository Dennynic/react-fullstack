const { portfolios } = require("./data");
const Portfolio = require("../database/models/portfolio");

class FakeDb {
  async addData() {
    await Portfolio.create(portfolios);
  }

  async clean() {
    await Portfolio.deleteMany({});
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();
