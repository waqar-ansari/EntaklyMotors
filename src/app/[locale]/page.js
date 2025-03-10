"use client";
import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/routing";
import Link from "next/link";
import Header from "@/components/Header";
// import "../../styles/globals.css";
import { colors } from "../../../public/colors/colors";
import Image from "next/image";
import { fonts } from "../../../public/fonts/fonts";
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
import { useSelector } from "react-redux";
export default function HomePage() {
  const t = useTranslations("HomePage");


const rentaldataa = useSelector((state)=>state.rentalDetails)

console.log(rentaldataa,"rentaldataa");

  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        <p
          className="text-danger text-center text-white mb-0 pt-1 styleForVeryTopHeader"
          style={{ backgroundColor: colors.themeMain }}
        >
          11 years of Entakly. 11 years of tradition.
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
            {/* <span className="input-group-text">
              <FaCar />
            </span>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="rentYourCar"
                placeholder="Rent your car"
              />
              <label htmlFor="rentYourCar">Rent your car</label>
            </div> */}
            <CiSearch style={{ marginRight: 10 }} />
            Plan a journey...
          </div>
        </div>
      </div>
      <div className="position-relative">
        <Image
          src="/images/heroImage.webp"
          alt="Hero Image"
          width={1600}
          height={686}
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
          Rent first class. <br /> Pay economy.
        </h1>
        <p className="mb-md-3 mb-0">Premium car rental at affordable rates.</p>
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
              <p style={styles.subHeading}>UAE reach</p>
            </div>
            <h4 className="subText">500+ Entakly stations in Dubai</h4>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-sm-flex align-items-center flex-justify mb-2">
              <Image
                src="/icons/carBlack.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>Distinctive fleet</p>
            </div>
            <h4 className="subText">
              From high-end convertibles to premium SUVs
            </h4>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="d-sm-flex align-items-center flex-justify mb-2">
              <Image
                src="/icons/handWithHeart.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>Exceptional service</p>
            </div>
            <h4 className="subText">
              Stress-free, trustworthy, no hidden costs
            </h4>
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
            />
            <div style={styles.textContainer} className="sec-4">
              <p style={styles.imageHeading} className="heading">
                Luxury Car Service with ENTAKLY
              </p>
              <p style={styles.imageText} className="text">
                Enjoy a professional journey with Entakly’s premium luxury car
                service
              </p>
              <Link href="#" style={styles.imageButton} className="imageButton">
                Book now
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
                ENTAKLY App Offers
              </p>
              <p
                style={{
                  fontFamily: fonts.helvetica400,
                  fontSize: 18,
                  color: colors.grey,
                }}
                className="text"
              >
                Download the Dubai App now and get a 10% discount! LinkGram:
                Phase One Launch – Your All-in-One App with 250+ Features! Note:
                The app is still under construction.
              </p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
              src="/icons/whatsappQrCode.jpeg"
              alt="limousine"
              width={200}
              height={200}
              className="mb-3 mb-md-0"
            />
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
            <p style={styles.heading} className="secHeading">
              More Entakly
            </p>
            <div
              style={{
                position: "relative",
                width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="sec-6-width"
            >
              <Image
                src="/images/homeImage3.webp"
                alt="limousine"
                width={465}
                height={697}
                layout="responsive"
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
                <div style={styles.textContainer2} className="textContainer">
                  <p style={styles.imageHeading2} className="heading">
                    Entakly Business
                  </p>
                  <p style={styles.imageText} className="text">
                    Pick-up and drop-off across UAE
                  </p>
                  <Link
                    href="https://wa.me/+971044536000"
                    target="_blank"
                    style={styles.imageButton}
                    className="chatNowButton"
                  >
                    <FaWhatsapp style={{ marginBottom: 2, marginRight: 3 }} />{" "}
                    Chat now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div style={{ position: "relative" }} className="col-md-12 p-0 sec-7">
            <Image
              src="/images/homeImage4.png"
              alt="limousine"
              width={1441}
              height={619}
              layout="responsive"
            />
            <div style={styles.textContainer3} className="imageText">
              <p style={styles.imageHeading3} className="textOnImage">
                Amazing experience with ENTAKLY. They provide amazing cars and{" "}
                <span className="d-md-block"></span>
                quick service!
              </p>
              <p style={styles.imageText} className="sub-text">
                Dubai
              </p>
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
const styles = {
  subHeading: {
    marginBottom: 0,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.helvetica400,
  },
  textContainer: {
    position: "absolute",
    bottom: "48px",
    left: "40px",
  },
  textContainer2: {
    position: "absolute",
    top: "48px",
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
    padding: "10px 14px",
    borderRadius: 30,
    textDecoration: "none",
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
    padding: "20px",
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
