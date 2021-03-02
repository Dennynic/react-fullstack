import React from "react";
import Link from "next/link";
import axios from "axios";

class PortfolioDetail extends React.Component {
  static async getInitialProps({ query }) {
    const portfolio = await this.onFetchPortfolioById(query.id);
    return { portfolio };
  }

  static onFetchPortfolioById(id) {
    const query = `
      query Portfolio($id: ID) {
        portfolio(id: $id) {
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
    const variables = { id };
    return axios
      .post("http://localhost:3000/graphql", { query, variables })
      .then(({ data: graph }) => graph.data)
      .then((data) => data.portfolio);
  }

  render() {
    const {
      id,
      title,
      company,
      companyWebsite,
      location,
      startDate,
      endDate,
      description,
    } = this.props.portfolio;

    return (
      <div className="portfolio-detail">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-3">{title}</h1>
            <p className="lead">{company}</p>

            <a
              className="btn btn-lg btn-success"
              role="button"
              href={companyWebsite}
            >
              See Company
            </a>
          </div>

          <div className="row marketing">
            <div className="col-lg-6">
              <h4 className="title">Location</h4>
              <p className="text">{location}</p>

              <h4 className="title">Start Date</h4>
              <p className="text">{startDate}</p>
            </div>

            <div className="col-lg-6">
              {/* TODO: days later... */}
              <h4 className="title">Days</h4>
              <p className="text">44</p>

              <h4 className="title">End Date</h4>
              <p className="text">{endDate}</p>
            </div>
            <div className="col-md-12">
              <hr />
              <h4 className="title">Description</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioDetail;
