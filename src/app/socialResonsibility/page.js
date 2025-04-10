"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { fonts } from "../../../public/fonts/fonts";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";

const page = () => {

  const {t} = useTranslation()
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <p className="mb-5" style={styles.paraStyles}>
             {t("we_believe_that_corporate_responsibility")}
            </p>
            <h3 className="mb-5">{t("our_corporate_responsibility_commitments")}</h3>
            <div className="mb-5">
              <h5 className="mb-4">{t("1_environmental_sustainability")}</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>{t("eco_friendly_fleet")}: </span>{" "}
                  {t("investing_in_hybrid_and_electric_vehicles")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    {t("sustainable_practices")}: 
                  </span>
                  {t("implementing_paperless_contracts")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>{t("responsible_disposal")}: </span>
                  {t("ensuring_eco_friendly_recycling")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">{t("2_customer_safety_and_satisfaction")}</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("regular_vehicle_maintenance")}: 
                  </span>{" "}
                  {t("ensuring_all_cars_meet")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    {t("247_roadside_assistance")}: 
                  </span>
                  {t("providing_immediate_support_in_case_of_emergencies")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    {t("transparent_pricing_and_policies")}: 
                  </span>
                  {t("no_hidden_charges")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">
                {t("3_community_engagement_and_social_initiatives")}
              </h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("employment_opportunities")}: 
                  </span>{" "}
                  {t("supporting_local_talent")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("charity_and_sponsorships")}: 
                  </span>
                  {t("partnering_with_organizations")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("accessible_mobility_solutions")}: 
                  </span>
                  {t("offering_affordable_rental_options")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">{t("4_ethical_business_practices")}</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("fair_and_inclusive_workplace")}: 
                  </span>{" "}
                  {t("promoting_diversity")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("compliance_and_integrity")}: 
                  </span>
                  {t("adhering_to_local_laws")}
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {t("data_privacy_and_security")}: 
                  </span>
                  {t("ensuring_customer_data_protection")}
                </li>
              </ul>
            </div>
            <p className="mb-4" style={styles.paraStyles}>
              {t("we_are_dedicated_to_making_a_difference")}
            </p>
            <div className="mb-5">
                <Link href="/contactUs" className=" text-decoration-none" style={styles.paraStyles}>
                {t("contact_us_today_to_learn_more")}!
                </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
const styles = {
  paraStyles: {
    fontFamily: fonts.helvetica400,
    fontSize: 16,
  },
  liStyle: {
    marginBottom: 10,
    fontFamily: fonts.helvetica400,
  },
};
