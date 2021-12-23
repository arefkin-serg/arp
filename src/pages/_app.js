import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import PricingPage from "./pricing";
import DashboardPage from "./dashboard";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import DocsPage from './docs';
import { Switch, Route, Router } from "./../util/router";
import PurchasePage from "./purchase";
import NotFoundPage from "./404";
import Footer from "./../components/Footer";
import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";

function App(props) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <>
            <Navbar
              color="default"
                logo="./../assets/images/logo.svg"
                name="Streaming.dev"
              // logoInverted="https://uploads.divjoy.com/logo-white.svg"
              />

            <Switch>
              <Route exact path="/" component={IndexPage} />

              <Route exact path="/documentation" component={DocsPage} />

              <Route exact path="/about" component={AboutPage} />

              <Route exact path="/faq" component={FaqPage} />

              <Route exact path="/contact" component={ContactPage} />

              <Route exact path="/pricing" component={PricingPage} />

              <Route exact path="/dashboard" component={DashboardPage} />

              <Route exact path="/auth/:type" component={AuthPage} />

              <Route exact path="/settings/:section" component={SettingsPage} />

              <Route exact path="/legal/:section" component={LegalPage} />

              <Route exact path="/purchase/:plan" component={PurchasePage} />

              <Route component={NotFoundPage} />
            </Switch>

              <Footer
                bgColor="light"
                size="normal"
                bgImage=""
                bgImageOpacity={1}
                description="A short description of what you do here"
                copyright={`© ${new Date().getFullYear()} Company`}
                logo="./../assets/images/logo.svg"
                name="Streaming.dev"
                sticky={true}
              />
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
