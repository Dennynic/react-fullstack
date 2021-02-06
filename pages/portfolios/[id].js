import React from "react";

class PortfolioDetail extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    const { id } = this.props.query;
    return <h1>Detail Page: {id}</h1>;
  }
}

export default PortfolioDetail;
