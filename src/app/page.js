"use client";

import Link from "next/link";
import Header from "@/components/Header";
// import "../../styles/globals.css";
import { colors } from "../../public/colors/colors";
import Image from "next/image";
import { fonts } from "../../public/fonts/fonts";
import Footer from "@/components/Footer";
import PickupAndDropPicker from "@/components/PickupAndDropPicker";
import { FaWhatsapp } from "react-icons/fa";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { FaCar } from "react-icons/fa6";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ModalPickerMobile from "@/components/modals/ModalPickerMobile";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/context/LanguageProvider";
import { clearSelectedAddons } from "@/redux/slices/selectedAddonSlice";
import { clearSelectedPackage } from "@/redux/slices/selectedPackageSlice";
import { clearBookingOverview } from "@/redux/slices/bookingOverviewSlice";
export default function HomePage() {
  const { t, language } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSelectedAddons());
    dispatch(clearSelectedPackage());
    dispatch(clearBookingOverview());
  }, []);
  const styles = {
    subHeading: {
      marginBottom: 0,
      marginLeft: language === "ar" ? "auto" : 10, // If language is "ar", no marginLeft, else 10
      marginRight: language === "ar" ? 10 : "auto",
      fontSize: 16,
      fontFamily: fonts.helvetica400,
    },
    textContainer: {
      position: "absolute",
      bottom: "40px",
      left: "40px",
      height: "85%",
    },
    textContainer2: {
      position: "absolute",
      top: "30px",
      height: "85%",
    },
    textContainer3: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
    },
    imageHeading: {
      fontSize: "40px",
      textTransform: "uppercase",
      color: colors.white,
      fontFamily: fonts.helvetica700,
      marginBottom: 0,
    },
    imageHeading2: {
      fontSize: "28px",
      textTransform: "uppercase",
      color: colors.white,
      fontFamily: fonts.helvetica700,
      marginBottom: 0,
    },
    imageHeading3: {
      fontSize: "40px",
      color: colors.white,
      fontFamily: fonts.helvetica400,
      marginBottom: 0,
      lineHeight: "45px",
    },
    imageText: {
      fontSize: 16,
      color: colors.white,
      fontFamily: fonts.helvetica400,
      marginBottom: 20,
    },
    imageButton: {
      fontSize: 12,
      color: colors.white,
      fontFamily: fonts.helvetica400,
      border: "1px solid white",
      padding: "15px 50px",
      borderRadius: 30,
      textDecoration: "none",
      width: "fit-content",
    },
    marginB: {
      marginBottom: 40,
    },
    moreEntakly: {
      background: "#EBEBF0",
      padding: "60px 0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    heading: {
      fontFamily: fonts.helvetica900,
      fontSize: 60,
      textAlign: "center",
    },
    PickupAndDropPicker: {
      position: "sticky",
      top: "10px",
      maxWidth: "1320px",
      margin: "0 auto",
      padding: "20px 20px 10px 20px",
      background: colors.white,
      borderRadius: 8,
      zIndex: 1,
      marginTop: 10,
      boxShadow: "2px 2px 16px 1px rgba(0, 0, 0, 0.75)",
    },
    showCarsBtn: {
      padding: "10px 25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      background: colors.themeMain,
      color: colors.white,
      fontFamily: fonts.helvetica400,
      textDecoration: "none",
    },
  };
  const rentaldataa = useSelector((state) => state.rentalDetails);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div>
        <p
          className="text-danger text-center text-white mb-0 pt-1 styleForVeryTopHeader"
          style={{ backgroundColor: colors.themeMain }}
        >
          {t("11_years_of_entakly")}
        </p>
      </div>

      <Header />
      <div style={styles.PickupAndDropPicker} className="pickerForMob">
        <div className="mobDisplayNone">
          <PickupAndDropPicker showCarsButton={true} />
        </div>
        <div
          className="mobPickerAndDropPicker tabDisplayNone"
          onClick={() => setShow(true)}
        >
          <div
            className="input-group customInputGroup border-0 mb-0 align-items-center  inputGroupBorRad"
            style={{ height: 30 }}
          >
            <CiSearch
              style={{
                ...(language === "ar"
                  ? { marginLeft: 10 }
                  : { marginRight: 10 }),
              }}
            />
            {t("plan_a_journey")}
          </div>
        </div>
      </div>
      <div className="position-relative">
        <Image
          src="/images/heroImage.webp"
          alt="Hero Image"
          // width={600}
          // height={400}
          width={1280}
          height={720}
          className="marginTopHeroImage"
          // style={{ marginTop: "-200px" }}
          layout="responsive"
          priority
        />
      </div>

      <div
        style={{
          background: colors.themeMain,
          color: colors.white,
          padding: 24,
        }}
        className="text-center containerPaddingMob"
      >
        <h1
          style={{
            fontFamily: fonts.helvetica700,
            textTransform: "uppercase",
            fontSize: 68,
            lineHeight: "82px",
            marginBottom: 16,
          }}
          className="heroHeading"
        >
          {t("rent_first_class")} <br /> {t("pay_economy")}
        </h1>
        <p className="mb-md-3 mb-0">{t("premium_car_rental")}</p>
      </div>

      <div className="container">
        <div className="row p-section sec-3">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-sm-flex align-items-center flex-justify mb-2">
              <Image
                src="/icons/worldGlobe.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>{t("uae_reach")}</p>
            </div>
            <h4 className="subText">{t("500_entakly_stations")}</h4>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-sm-flex align-items-center flex-justify mb-2">
              <Image
                src="/icons/carBlack.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>{t("distinctive_fleet")}</p>
            </div>
            <h4 className="subText">{t("high_end_convertibles")}</h4>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-sm-flex align-items-center flex-justify mb-2">
              <Image
                src="/icons/handWithHeart.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>{t("exceptional_service")}</p>
            </div>
            <h4 className="subText">{t("stress_free")}</h4>
          </div>
        </div>
        <div className="row" style={styles.marginB}>
          <div className="col-md-12" style={{ position: "relative" }}>
            <Image
              src="/images/homeImage1.webp"
              alt="limousine"
              width={1400}
              height={560}
              layout="responsive"
              style={{ borderRadius: 20 }}
            />
            <div
              style={styles.textContainer}
              className="sec-4 d-flex flex-column justify-content-between"
            >
              <div>
                <p style={styles.imageHeading} className="heading">
                  {t("luxury_car_with_entakly")}
                </p>
                <p style={styles.imageText} className="text">
                  {t("enjoy_professional_journey")}
                </p>
              </div>
              <Link href="#" style={styles.imageButton} className="imageButton">
                {t("book_now")}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="row showdowForRow py-3 py-md-5 px-2 px-md-4 text-center text-md-start sec-5"
          style={styles.marginB}
        >
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div style={{ color: colors.black }} className="ps-md-3">
              <p
                style={{ fontFamily: fonts.helvetica700, fontSize: 24 }}
                className="heading"
              >
                {t("entakly_app_offers")}
              </p>
              <p
                style={{
                  fontFamily: fonts.helvetica400,
                  fontSize: 18,
                  color: colors.grey,
                }}
                className="text"
              >
                {t("download_the_dubai_app")}
              </p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Link href="https://wa.me/+971044536000" target="_blank">
              <Image
                src="/icons/whatsappQrCode.jpeg"
                alt="limousine"
                width={200}
                height={200}
                className="mb-3 mb-md-0 imgDimension"
              />
            </Link>
          </div>
          <div className="col-md-4 my-auto">
            <Link
              href="https://prodapi.linkgram.co.uk/api/v1/share/entakly.motors"
              target="_blank"
            >
              <Image
                src="/icons/linkGramLogo.webp"
                alt="limousine"
                width={924}
                height={295}
                layout="responsive"
                className="sec-5-linkGramLogo"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid" id="pickUpAndDropoff">
        <div className="row justify-content-center">
          <div style={styles.moreEntakly} className="sec-6">
            <p style={styles.heading} className="secHeading text-uppercase">
              {t("more_entakly")}
            </p>
            <div
              // style={{
              //   position: "relative",
              //   width: "25%",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
              // className="sec-6-width"
              className="col-12 col-md-4 mx-auto d-flex justify-content-center align-items-center sec-6-width"
              style={{ position: "relative" }}
            >
              <Image
                src="/images/homeImage2.webp"
                alt="limousine"
                width={465}
                height={697}
                layout="responsive"
                style={{ borderRadius: 20 }}
              />
              {/* Overlay text */}
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <div
                  style={styles.textContainer2}
                  className="textContainer d-flex justify-content-between flex-column align-items-center w-100"
                >
                  <div>
                    <p style={styles.imageHeading2} className="heading">
                      {/* {t("entakly_motors_business")} */}
                      ENTAKLY LUXURY TAXI
                    </p>
                    <p style={styles.imageText} className="text">
                      {t("pick_up_and_drop_off_across_uae")}
                    </p>
                  </div>
                  <div className="sec-6-box-container">
                    <div
                      style={{
                        color: "#fff",
                        display: "flex",
                        gap: 10,
                        width: "100%",
                      }}
                      className="mb-4 mb-md-4"
                    >
                      <Link
                        href="https://buy.stripe.com/14k9BfffC5fOgy49AH"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">DXB AIRPORT</p>
                        <p className="my-0">AED 250</p>
                      </Link>
                      <Link
                        href="https://buy.stripe.com/8wMaFj6J67nW2He8wE"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">FULL DAY 10 HOURS</p>
                        <p className="my-0">AED 1000</p>
                      </Link>
                      <Link
                        href="https://buy.stripe.com/aEU8xb0kIdMkfu0aEN"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">DUBAI TAXI</p>
                        <p className="my-0">AED 100</p>
                      </Link>
                    </div>
                    {/* <div
                      style={{
                        color: "#fff",
                        display: "flex",
                        gap: 10,
                        width: "100%",
                      }}
                      className="mb-3 mb-md-5"
                    >
                      <Link
                        href="https://buy.stripe.com/dR66p33wUbEc4PmfZ2"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">Abu Dhabi Airport</p>
                        <p className="my-0">AED 700</p>
                      </Link>
                      <Link
                        href="https://buy.stripe.com/9AQ00F6J69w4gy4dQV"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">10 hours/day</p>
                        <p className="my-0">AED 800</p>
                      </Link>
                      <Link
                        href="https://buy.stripe.com/dR64gV9Vi23CchObIK"
                        target="_blank"
                        className="entakly-business-services text-decoration-none text-white"
                      >
                        <p className="my-0">Inside Dubai</p>
                        <p className="my-0">AED 100</p>
                      </Link>
                    </div>  */}

                    <Link
                      href="https://wa.me/+971044536000"
                      className="chatNowButton mt-4"
                      style={styles.imageButton}
                      target="_blank"
                    >
                      <Image
                        src="/icons/whatsappLogo.png" 
                        alt="logo"
                        width={15}
                        height={15}
                        style={language === "ar" ? { marginLeft: 10 } : { marginRight: 10 }}
                      />
                      {t("chat_now")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div style={{ position: "relative" }} className="col-md-12 p-0 sec-7">
            <Image
              src="/images/homeImage3.webp"
              alt="limousine"
              width={931}
              height={400}
              layout="responsive"
            />
            <div style={styles.textContainer3} className="imageText">
              <p style={styles.imageHeading3} className="textOnImage">
                {t("amazing_experience_with_entakly")} <br />
                {t("we_provide_amazing_car")}
              </p>
              {/* <p style={styles.imageText} className="sub-text">
                {t("dubai")}
              </p> */}
              {/* <Link href="#" style={styles.imageButton}>
                Book now
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link> */}

      <ModalPickerMobile show={show} onHide={() => setShow(false)} />
    </div>
  );
}
