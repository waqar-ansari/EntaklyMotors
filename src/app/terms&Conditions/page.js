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
              {t("we_strive_to_provide")}
            </p>
          </div>
          <div className="col-md-12">
            <div className="mb-5">
              <h5 className="mb-3">{t("1_eligibility_requirements")}</h5>
              <p style={styles.paraStyles} className="mb-3">
                {t("to_rent_a_vehicle")}:
              </p>
              <ul>
                <li style={styles.liStyle}>
                  {t("be_at_least_21_years")}
                </li>
                <li style={styles.liStyle}>
                  {t("hold_a_valid_driving_license")}
                </li>
                <li style={styles.liStyle}>
                  {t("provide_a_valid_passport")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("2_rental_duration_and_extensions")}</h5>
              <ul>
                <li style={styles.liStyle}>{t("minimum_rental_period")}</li>
                <li style={styles.liStyle}>
                  {t("rental_is_calculated")}
                </li>
                <li style={styles.liStyle}>
                  {t("late_returns_beyond")}
                </li>
                <li style={styles.liStyle}>
                  {t("extensions_must_be_requested")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("3_insurance_and_liability")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("all_vehicles_come")}
                </li>
                <li style={styles.liStyle}>
                  {t("additional_full_insurance")}
                </li>
                <li style={styles.liStyle}>{t("the_renter_is_liable_for")}:</li>
                <ul>
                  <li style={styles.liStyle}>
                    {t("any_damage_not_covered_by_insurance")}
                  </li>
                  <li style={styles.liStyle}>
                    {t("traffic_violations")}
                  </li>
                  <li style={styles.liStyle}>
                    {t("loss_of_car_accessories")}
                  </li>
                </ul>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("4_fuel_policy")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("vehicles_are_provided")}
                </li>
                <li style={styles.liStyle}>
                  {t("if_returned_with_less_fuel")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("5_usage_restrictions")}</h5>
              <ul>
                <li style={styles.liStyle}>{t("the_car_must_not_be_used_for")}:</li>
                <ul>
                  <li style={styles.liStyle}>
                    {t("off_roading_racing_illegal_activities")}
                  </li>
                  <li style={styles.liStyle}>
                    {t("transporting_hazardous_materials")}
                  </li>
                  <li style={styles.liStyle}>
                    {t("subletting_or_commercial_use")}
                  </li>
                </ul>
                <li style={styles.liStyle}>
                  {t("driving_outside_the_uae")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("6_traffic_fines_and_salik")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("the_renter_is_fully_responsible")}
                </li>

                <li style={styles.liStyle}>
                  {t("charges_will_be_deducted")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("7_breakdown_and_accidents")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("in_case_of_a_breakdown")}
                </li>

                <li style={styles.liStyle}>{t("in_the_event_of_an_accident")}:</li>
                <ul>
                  <li style={styles.liStyle}>
                    {t("call_the_police")}
                  </li>

                  <li style={styles.liStyle}>
                    {t("inform_our_support")}
                  </li>
                  <li style={styles.liStyle}>
                    {t("repairs_will_only_be_done")}
                  </li>
                </ul>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("8_vehicle_return_policy")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("the_car_must_be_returned")}
                </li>

                <li style={styles.liStyle}>
                 {t("any_damages_or_additional")}
                </li>
                <li style={styles.liStyle}>
                  {" "}
                  {t("failure_to_return_the_car")}
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">{t("9_Cancellation_and_refund_policy")}</h5>
              <ul>
                <li style={styles.liStyle}>
                  {t("cancellations_must_be_made")}
                </li>

                <li style={styles.liStyle}>
                  {t("last_minute_cancellations")}
                </li>
                <li style={styles.liStyle}>{t("no_refunds_for_early_returns")}</li>
              </ul>
            </div>
            <h6 style={styles.paraStyles} className="mb-5">
              {t("by_renting_a_car")}
              <Link href="/contactUs" className="text-decoration-none">
                {" "}
                {t("contact_our_customer_support")}
              </Link>
            </h6>
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
