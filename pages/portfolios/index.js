import React from "react";
import axios from "axios";
import Link from "next/link";

import PortfolioCard from "@/components/portfolio_card";

class Portfolios extends React.Component {
  constructor(props) {
    super(props);

    const { portfolios } = props.data;

    this.state = {
      portfolios,
    };
  }

  static async getInitialProps() {
    const portfolios = await this.onFetchPortfolios();
    return { data: { portfolios } };
  }

  graphUpdatePortfolio = (id) => {
    const query = `
      mutation UpdatePortfolio{
        updatePortfolio(id: "${id}", input: {
          title: "Update Job in NetLogic"
          company: "Update NetLogic"
          companyWebsite: "www.xgoogle.com"
          location: "Paris, France"
          jobTitle: "Software Engineer"
          description: "Doing something, programing smth"
          startDate: "01/01/2015"
          endDate: "01/01/2017"
        }){
          _id, 
          title, 
          company, 
          companyWebsite,
          location,
          jobTitle,
          description,
          startDate,
          endDate
        }
    }`;
    return axios
      .post("http://localhost:3000/graphql", { query })
      .then(({ data: graph }) => graph.data)
      .then((data) => data.updatePortfolio);
  };

  graphCreatePortfolio = () => {
    const query = `
      mutation CreatePortfolio{
        createPortfolio(input: {
          title: "Job in NetLogic"
          company: "NetLogic"
          companyWebsite: "www.xgoogle.com"
          location: "Paris, France"
          jobTitle: "Software Engineer"
          description: "Doing something, programing smth"
          startDate: "01/01/2015"
          endDate: "01/01/2017"
        }){
          _id, 
          title, 
          company, 
          companyWebsite,
          location,
          jobTitle,
          description,
          startDate,
          endDate
        }
    }`;
    return axios
      .post("http://localhost:3000/graphql", { query })
      .then(({ data: graph }) => graph.data)
      .then((data) => data.createPortfolio);
  };

  graphDeletePortfolio = (id) => {
    const query = `
      mutation deletePortfolio{
        deletePortfolio(id: "${id}")
      }`;

    return axios
      .post("http://localhost:3000/graphql", { query })
      .then(({ data: graph }) => graph.data)
      .then((data) => data.deletePortfolio);
  };

  static onFetchPortfolios() {
    const query = `
      query Portfolios {
        portfolios {
          _id, 
          title, 
          company, 
          companyWebsite,
          location,
          jobTitle,
          description,
          startDate,
          endDate
         }
       }`;
    return axios
      .post("http://localhost:3000/graphql", { query })
      .then(({ data: graph }) => graph.data)
      .then((data) => data.portfolios);
  }

  createPortfolio = async () => {
    const { portfolios } = this.state;
    const newPortfolio = await this.graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    this.setState({ portfolios: newPortfolios });
  };

  updatePortfolio = async (id) => {
    const { portfolios } = this.state;
    const index = portfolios.findIndex((p) => p._id === id);
    const updatedPortfolio = await this.graphUpdatePortfolio();
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatedPortfolio;
    this.setState({ portfolios: newPortfolios });
  };

  deletePortfolio = async (id) => {
    const { portfolios } = this.state;
    const deletedID = await this.graphDeletePortfolio();
    const index = portfolios.findIndex((p) => p._id === deletedID);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
    this.setState({ portfolios: newPortfolios });
  };

  render() {
    const { portfolios } = this.state;

    return (
      <>
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Portfolios</h1>
            </div>
          </div>
          <button onClick={this.createPortfolio} className="btn btn-primary">
            Create Portfolio
          </button>
        </section>
        <section className="pb-5">
          <div className="row">
            {portfolios.map((portfolio) => {
              return (
                <div key={portfolio._id} className="col-md-4">
                  <Link
                    href="/portfolios/[id]"
                    as={`/portfolios/${portfolio._id}`}
                  >
                    <a className="card-link">
                      <PortfolioCard portfolio={portfolio} />
                    </a>
                  </Link>
                  <button
                    onClick={() => this.updatePortfolio(portfolio._id)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.deletePortfolio(portfolio._id)}
                    className="btn btn-warning"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default Portfolios;
