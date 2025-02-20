"use client";
import AddonService from "@/components/AddonService";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import Link from "next/link";
import React, { useState } from "react";
import { colors } from "../../../../../../public/colors/colors";
import { IoInformationCircleSharp } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCarOn } from "react-icons/fa6";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { fonts } from "../../../../../../public/fonts/fonts";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { IoInformationCircleOutline } from "react-icons/io5";

const addons = [
  {
    addonName: "Additional Driver",
    icon: <AiOutlineUsergroupAdd />,
    overview: "Addional Driver",
    info: "info for additional driver",
  },
  {
    addonName: "Roadside Protection",
    icon: <FaCarOn />,
    overview: "Roadside Protection",
    info: "info for roadside protection",
  },
  {
    addonName: "Baby seat (0-18 kg / Group 0+/1)",
    icon: <MdOutlineAirlineSeatReclineExtra />,
    overview: "Baby seat (0-18 kg / Group 0+/1)",
    info: "info for baby seat",
  },
];

const page = () => {
  const [activeAddons, setActiveAddons] = useState({});
  const toggleAddon = (index) => {
    setActiveAddons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  console.log(activeAddons, "activeAddons");

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end align-items-center">
              <PriceDetailsModal />
              <Link
                href="/cars/offerCheckout/addOns"
                className="mt-0"
                style={styles.nextButton}
              >
                Continue
              </Link>
            </div>

            <div className="d-flex align-items-center mb-5">
              <IoInformationCircleSharp
                style={{ fontSize: 20, marginRight: 20 }}
              />
              <p>
                Drivers must have held their driver's license for at least 1
                year(s) for this vehicle
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {addons.map((addon, index) => {
              console.log("activeAddons:", activeAddons);

              return (
                <AddonService
                  key={index}
                  icon={addon.icon}
                  addonName={addon.addonName}
                  isActive={activeAddons[index]}
                  toggleActive={() => toggleAddon(index)}
                />
              );
            })}
          </div>
          <div className="col-md-4">
            <p style={{ fontFamily: fonts.helvetica700 }}>
              Your booking overview
            </p>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {addons
              .filter((_, index) => activeAddons[index])
              .map((addon, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
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
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
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
    marginLeft: 15,
  },
};
