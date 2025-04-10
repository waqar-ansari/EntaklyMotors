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
          <div className="col-md-12 my-5">
            <p style={styles.paraStyles}>
              {t("your_trusted_partner")}
            </p>
            <p style={styles.paraStyles} className="mb-5">
             {t("we_specialize_in_providing")}
            </p>
          </div>
          <div className="row">
            <h2 className="text-center mb-5">{t("our_services")}</h2>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">{t("car_rental")}:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                {t("short_term_and_long_term_rentals")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("luxury_sports_and_economy_cars")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("chauffeur_and_self_drive_options")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("corporate_and_individual_leasing")}
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">{t("car_export")}:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                {t("global_vehicle_shipping")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("wide_selection_of_new_and_pre_owned_cars")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("hassle_free_paperwork_and_logistics")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("competitive_pricing_and_secure_transactions")}
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">{t("car_sales")}:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                {t("new_and_used_car_sales")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("flexible_financing_and_lease_to_own_options")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("trade_in_services_available")}
              </li>
              <li className="liTick" style={styles.liStyle}>
                {t("quality_checked_vehicles_with_warranty")}
              </li>
            </ul>
          </div>
        </div>
        <p style={styles.paraStyles} className="mb-5 mt-5">
          {t("with_a_commitment_to_quality")}
        </p>
        <p style={styles.paraStyles} className="mb-5">
          <Link href="/contactUs" className="text-decoration-none">
            {t("contact_us")}
          </Link>{" "}
          {t("today_to_learn_more")}!
        </p>
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
