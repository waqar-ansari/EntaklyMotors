"use client";
import AddonService from "@/components/AddonService";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../../public/colors/colors";
import { IoInformationCircleSharp } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCarOn } from "react-icons/fa6";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddon } from "@/redux/slices/selectedAddonSlice";
import { calculateTotalPrice } from "@/redux/thunks/totalPriceThunk";
import { fonts } from "../../../../../public/fonts/fonts";
import { useTranslation } from "@/context/LanguageProvider";
import {
  selectBookingOverview,
  setAddonBookingOverview,
} from "@/redux/slices/bookingOverviewSlice";
import api from "@/app/api/axiosInstance";

const page = () => {
  const [activeAddons, setActiveAddons] = useState({});

  const dispatch = useDispatch();
  const { t, language } = useTranslation();

  const addons = [
    {
      id: "1",
      addonName: t("additional_driver"),
      icon: <AiOutlineUsergroupAdd />,
      overview: t("additional_driver"),
      info: "info for additional driver",
      addonPrice: 250,
    },
    {
      id: "2",
      addonName: t("roadside_protection"),
      icon: <FaCarOn />,
      overview: t("roadside_protection"),
      info: "info for roadside protection",
      addonPrice: 50,
    },
    {
      id: "3",
      addonName: t("baby_seat"),
      icon: <MdOutlineAirlineSeatReclineExtra />,
      overview: t("baby_seat"),
      info: "info for baby seat",
      addonPrice: 40,
    },
  ];

  const toggleAddon = (addon) => {
    setActiveAddons((prev) => {
      const isSelected = !prev[addon.id];

      const updatedAddonDetails = isSelected
        ? [
            ...(prev.addonDetails || []),
            { id: addon.id, name: addon.addonName, price: addon.addonPrice },
          ]
        : (prev.addonDetails || []).filter((item) => item.id !== addon.id);
      const updatedAddonBookingOverview = isSelected
        ? [...(prev.addonBookingOverview || []), addon.overview]
        : (prev.addonBookingOverview || []).filter(
            (overview) => overview !== addon.overview
          );

      dispatch(setAddonBookingOverview(updatedAddonBookingOverview));
      return {
        ...prev,
        [addon.id]: isSelected,
        addonDetails: updatedAddonDetails,
        addonBookingOverview: updatedAddonBookingOverview,
      };
    });
  };

  useEffect(() => {
    dispatch(setSelectedAddon(activeAddons.addonDetails));
  }, [activeAddons]);

  useEffect(() => {
    dispatch(setAddonBookingOverview([]));
  }, []);
  const bookingOverview = useSelector(selectBookingOverview);
  const translatedBookingOverview = bookingOverview.map(item => {
    // if (item === "Free Cancellation") return t("free_cancellation");
    // if (item === "Zero Deposit") return t("zero_deposit");
    // if (item === "200 km are included, each additional kilometer costs AED 0.65") return t("200_km_included");
    // if (item === "All Inclusive Protection - No excess") return t("all_inclusive_protection_no_excess");
    // if (item === "Additional Driver") return t("additional_driver");
    // if (item === "Smart Protection - No excess") return t("smart_protection_no_excess");
    // if (item === "Roadside Protection") return t("roadside_protection");
    // return item;

    if (item === "Free Cancellation") return t("free_cancellation");
    if (item === "Zero Deposit") return t("zero_deposit");
    if (
      item ===
        "200 km are included, each additional kilometer costs AED 0.65" ||
      item ===
        "Включено 200 км, каждый дополнительный километр стоит AED 0.65" ||
      item === "يشمل السعر 200 كم، كل كيلومتر إضافي يكلف 0.65 درهم إماراتي"
    )
      return t("200_km_included");
    if (
      item === "All Inclusive Protection - No excess" ||
      item === "حماية شاملة - لا تحمل ذاتي" ||
      item === "Защита Все включено - Без защиты"
    )
      return t("all_inclusive_protection_no_excess");
    if (
      item === "Basic Protection - Excess: up to AED3,000.00" ||
      item === "الحماية الأساسية - تحمل ذاتي: حتى ٣,٠٠٠ درهم" ||
      item === "Базовая защита - франшиза: до AED 3,000.00"
    )
      return t("basic_protection_excess_upto");
    if (
      item === "Additional Driver" ||
      item === "سائق إضافي" ||
      item === "Дополнительный водитель"
    )
      return t("additional_driver");
    if (
      item === "Smart Protection - No excess" ||
      item === "حماية ذكية بدون مبالغة" ||
      item === "Умная защита - без франшизы"
    )
      return t("smart_protection_no_excess");
    if (
      item === "Roadside Protection" ||
      item === "Защита на дороге" ||
      item === "مساعدة على الطريق"
    )
      return t("roadside_protection");
    return item;
  });

  const totalPrice = useSelector((state) => state.totalPrice);
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [activeAddons]);
  const styles = {
    nextButton: {
      backgroundColor: colors.themeMain,
      color: colors.white,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      width: 200,
      padding: 10,
      fontSize: 16,
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
      marginTop: 15,
      marginLeft: language === "ar" ? 0 : 15,
      marginRight: language === "ar" ? 15 : 0,
    },
    iIcon: {
      flex: "0 0 auto",
      fontSize: 16,
    },
  };
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between justify-content-sm-end align-items-center mb-3 mb-md-4">
              <div>
                <p className="mb-0 fw-bold">
                  {t("total")}: {totalPrice} {t("aed")}
                </p>
                <PriceDetailsModal />
              </div>
              <Link
                href="/booking/paymentAndReview"
                className="mt-0"
                style={styles.nextButton}
              >
                {t("continue")}
              </Link>
            </div>

            <div className="d-flex align-items-center mb-3 mb-md-5">
              <IoInformationCircleSharp
                style={{
                  fontSize: 20,
                  ...(language === "ar"
                    ? { marginLeft: 20 }
                    : { marginRight: 20 }),
                  fontSize: 16,
                  flex: "0 0 auto",
                }}
              />
              <p className="mb-0">{t("drivers_must_have_held")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {addons.map((addon, index) => {
              return (
                <AddonService
                  key={addon.id}
                  icon={addon.icon}
                  addonPrice={addon.addonPrice}
                  addonName={addon.addonName}
                  isActive={activeAddons[addon.id]}
                  toggleActive={() => toggleAddon(addon)}
                />
              );
            })}
          </div>
          <div className="col-md-4">
            <p style={{ fontFamily: fonts.helvetica700 }}>
              {t("booking_overview")}
            </p>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {translatedBookingOverview.map((item, index) => {
                return (
                  <div className="liContainer" key={index}>
                    <li className="liTick">{item}</li>
                    {/* <Whisper
                      placement="left"
                      trigger="hover"
                      speaker={<Tooltip>Information Information</Tooltip>}
                    >
                      <IoInformationCircleOutline style={styles.iIcon} />
                    </Whisper> */}
                  </div>
                );
              })}
            </ul>
            {/* <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {addons
                .filter((addon) => activeAddons[addon.id])
                .map((addon) => (
                  <div key={addon.id} style={{ marginBottom: 10 }}>
                    <div className="liContainer">
                      <li className="liTick">{addon.overview}</li>
                      <Whisper
                        placement="left"
                        trigger="hover"
                        speaker={<Tooltip>{addon.info}</Tooltip>}
                      >
                        <IoInformationCircleOutline style={styles.iIcon} />
                      </Whisper>
                    </div>
                  </div>
                ))}
            </ul> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
