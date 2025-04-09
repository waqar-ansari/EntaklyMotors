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
              <h4 className="mb-3">{t("lease_to_own")}</h4>
            </p>
            <p style={styles.paraStyles} className="mb-5">
              {t("are_you_looking_for_a_simple")}
            </p>
            <div className="mb-5">
              <h4 className="mb-3">{t("how_it_operates")}:</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>{t("make_a_20percent_down_payment")}</span> – {t("to_gain_immediate")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>{t("fixed_monthly_payments")}</span> – {t("for_24_months")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>{t("ownership_transfer")}</span> – {t("at_the_end_of_the_lease_term")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">{t("why_pick_our_lease")}</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>{t("short_term_ownership")}: </span>{t("rather_than_relying_on")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> {t("no_bank_financing_needed")}: </span> {t("a_streamlined_approval")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> {t("flexible_payment_options")}: </span>
                  {t("include_fixed_monthly_installments")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> {t("drive_your_car_right_away")}: </span>
                  {t("avoid_lengthy_wait")}
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>{t("all_car_models_are_eligible")}: </span>
                  {t("there_are_many_different")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">{t("qualifications_for_eligibility")}:</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> {t("minimum_age_21")}</span>
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    {" "}
                   {t("current_uae_drivers")}
                  </span>
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    {" "}
                    {t("evidence_of_income")}
                  </span>
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    {t("uae_residency")}
                  </span>
                </li>
              </ul>
            </div>
            <p style={styles.paraStyles}>{t("this_is_the_perfect_option")}</p>
            <p style={styles.paraStyles}>{t("interested")}.
            </p>
            <p style={styles.paraStyles} className="mb-5"><Link href="/contactUs" className="text-decoration-none">{t("contact_us")}</Link> {t("today_to_get_started")}!</p>

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
  bold: {
    fontWeight: "bold",
  },
};
