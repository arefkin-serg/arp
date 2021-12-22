import React from "react";
import Meta from "./../components/Meta";
import HeroSection from "./../components/HeroSection";
import PricingSection from "./../components/PricingSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Designed with developers in mind"
        subtitle="We've crafted the ultimate API to help you build the 24/7 livestream of your dreams. Built with configuration in mind, you can fully customize every aspect."
        image="https://uploads.divjoy.com/undraw-japan_ubgk.svg"
        buttonText="Get Started"
        buttonColor="primary"
        buttonPath="/pricing"
      />
      <PricingSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Pricing"
        subtitle="Choose the plan that makes sense for you. All plans include a 14-day free trial."
      />
    </>
  );
}

export default IndexPage;
