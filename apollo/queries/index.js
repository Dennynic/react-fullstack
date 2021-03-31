import { gql } from "apollo-boost";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "Job in NetLogic"
        company: "NetLogic"
        companyWebsite: "www.xgoogle.com"
        location: "Paris, France"
        jobTitle: "Software Engineer"
        description: "Doing something, programing smth"
        startDate: "01/01/2015"
        endDate: "01/01/2017"
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;
export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(
      id: $id
      input: {
        title: "Update Job in NetLogic"
        company: "Update NetLogic"
        companyWebsite: "www.xgoogle.com"
        location: "Paris, France"
        jobTitle: "Software Engineer"
        description: "Doing something, programing smth"
        startDate: "01/01/2015"
        endDate: "01/01/2017"
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation deletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
