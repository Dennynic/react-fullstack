import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";

import NavBarComponent from "@/components/shared/navbar";
import HeroComponent from "@/components/shared/hero";
import Footer from "@/components/shared/footer";

function MyApp({ Component, pageProps }) {
  const nameComponent = Component.name;
  const isHomeComponent = nameComponent === "Home";
  return (
    <div className="portfolio-app">
      <NavBarComponent />
      {isHomeComponent && <HeroComponent />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {isHomeComponent && <Footer />}
    </div>
  );
}

export default MyApp;
