import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";

import NavBar from "@/components/shared/navbar";
import HeroComponent from "@/components/shared/hero";

function MyApp({ Component, pageProps }) {
  const nameComponent = Component.name;
  const isHomeComponent = nameComponent === "Home";
  return (
    <div className="portfolio-app">
      <NavBar />
      {isHomeComponent && <HeroComponent />}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
export default MyApp;
