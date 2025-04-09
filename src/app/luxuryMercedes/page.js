"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { fonts } from "../../../public/fonts/fonts";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";

const page = () => {
     const { t, language } = useTranslation();
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <p style={styles.paraStyles}>
              {t("luxury_mercedes_benz")}
            </p>
            <p style={styles.paraStyles} className="mb-5">
              {t("experience_premium_comfort")}
            </p>
            <div className="mb-5">
              <h4 className="mb-3">
                {t("why_choose_our_vclass")}
              </h4>
              <ul style={{ listStyleType: "none" }}>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("spacious_and_comfortable")}</span> –
                  {t("luxury_seating")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("professional_chauffeurs")}</span> –
                  {t("highly_trained")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("privacy_and_convenience")}</span> –
                  {t("tinted_windows")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("flexible_booking")}</span> – {t("hourly_daily_or")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("airport_and_hotel_transfers")}</span> –
                  {t("hassle_free_pickup")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>{t("business_and_leisure_travel")}</span> –
                  {t("ideal_for_corporate")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">{t("services_offered")}:</h4>
              <ul style={{ listStyleType: "none" }}>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> {t("airport_transfers")}</span> – {t("vip_service_with")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> {t("business_travel")}</span> –{t("stylish_transport")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> {t("city_tours")}</span> –
                  {t("explore_in_luxury")}
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> {t("special_events")}</span> –
                  {t("elegant_chauffeur_service")}
                </li>
              </ul>
            </div>
            <p style={styles.paraStyles}>
              {t("book_your_mercedes_benz")}
            </p>
            <div className=" mb-5">
              <Link
                href="/contactUs"
                className="text-decoration-none"
                style={styles.paraStyles}
              >
                {t("contact_us_now")}
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
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
};
