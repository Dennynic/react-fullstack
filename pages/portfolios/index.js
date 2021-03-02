import React from "react";
import axios from "axios";
import Link from "next/link";

import PortfolioCard from "@/components/portfolio_card";

class Portfolios extends React.Component {
  static async getInitialProps() {
    const portfolios = await this.onFetchPortfolios();
    return { portfolios };
  }

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

  render() {
    const { portfolios } = this.props;

    return (
      <>
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Portfolios</h1>
            </div>
          </div>
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
