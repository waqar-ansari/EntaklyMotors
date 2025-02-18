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

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div>
        <p
          className="text-danger text-center text-white mb-0 py-2"
          style={{ backgroundColor: colors.themeMain }}
        >
          11 years of Entakly. 11 years of tradition.
        </p>
      </div>
      <Header />
      <div style={styles.PickupAndDropPicker}>
        <PickupAndDropPicker />
      </div>
      <div className="position-relative">
        <Image
          src="/images/heroImage.webp"
          alt="Hero Image"
          width={1600}
          height={686}
          style={{ marginTop: "-180px" }}
          layout="responsive"
          priority
        />
      </div>

      <div
        className="text-center"
        style={{
          background: colors.themeMain,
          color: colors.white,
          padding: 24,
        }}
      >
        <h1
          style={{
            fontFamily: fonts.helvetica700,
            textTransform: "uppercase",
            fontSize: 68,
            lineHeight: "82px",
            marginBottom: 16,
          }}
        >
          Rent first class. <br /> Pay economy.
        </h1>
        <p>Premium car rental at affordable rates.</p>
      </div>

      <div className="container">
        <div className="row p-section">
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/icons/worldGlobe.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>UAE reach</p>
            </div>
            <h4>500+ Entakly stations in Dubai</h4>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/icons/carBlack.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>Distinctive fleet</p>
            </div>
            <h4>From high-end convertibles to premium SUVs</h4>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/icons/handWithHeart.png"
                alt="globe"
                width={32}
                height={32}
              />
              <p style={styles.subHeading}>Exceptional service</p>
            </div>
            <h4>Stress-free, trustworthy, no hidden costs</h4>
          </div>
        </div>
        <div className="row" style={styles.marginB}>
          <div className="col-md-12" style={{ position: "relative" }}>
            <Image
              src="/images/homeImage1.png"
              alt="limousine"
              width={1441}
              height={619}
              layout="responsive"
            />
            <div style={styles.textContainer}>
              <p style={styles.imageHeading}>Luxury Car Service with ENTAKLY</p>
              <p style={styles.imageText}>
                Enjoy a professional journey with Entakly’s premium luxury car pickup and dropoff
                service
              </p>
              <Link href="#" style={styles.imageButton}>
                Book now
              </Link>
            </div>
          </div>
        </div>
        <div className="row showdowForRow" style={styles.marginB}>
          {/* <div className="col-md-12" style={{ position: "relative" }}>
            <Image
              src="/images/homeImage2.png"
              alt="limousine"
              width={1441}
              height={619}
              layout="responsive"
            />
            <div style={styles.textContainer}>
              <p style={styles.imageHeading}>ENTAKLY App Offers</p>
              <p style={styles.imageText}>Download the Entakly app</p>
              <Link href="#" style={styles.imageButton}>
                Download the app
              </Link>
            </div>
          </div> */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div style={{ color: colors.black }} className="ps-3">
              <p style={{ fontFamily: fonts.helvetica700, fontSize: 24 }}>
                ENTAKLY App Offers
              </p>
              <p
                style={{
                  fontFamily: fonts.helvetica400,
                  fontSize: 18,
                  color: colors.grey,
                }}
              >
                “Download the Dubai App now and get a 10% discount! LinkGram:
                Phase One Launch – Your All-in-One App with 250+ Features!”
                Note: The app is still under construction.
              </p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
              src="/icons/linkGramQr.svg"
              alt="limousine"
              width={200}
              height={200}
            />
          </div>
          <div className="col-md-4">
            <Image
              src="/icons/linkGramLogo.jpeg"
              alt="limousine"
              width={1168}
              height={992}
              layout="responsive"
            />
          </div>
        </div>
        <div className="row"></div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div style={styles.moreEntakly}>
            <p style={styles.heading}>More Entakly</p>
            <div
              style={{
                position: "relative",
                width: "25%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/homeImage3.png"
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
                <div style={styles.textContainer2}>
                  <p style={styles.imageHeading2}>Entakly Business</p>
                  <p style={styles.imageText}>Pickup and dropoff to airport</p>
                  <Link href="#" style={styles.imageButton}>
                    <FaWhatsapp style={{ marginBottom: 2, marginRight: 3 }} />{" "}
                    Chat now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0" style={{ position: "relative" }}>
            <Image
              src="/images/homeImage4.png"
              alt="limousine"
              width={1441}
              height={619}
              layout="responsive"
            />
            <div style={styles.textContainer3}>
              <p style={styles.imageHeading3}>
                Amazing experience with ENTAKLY. They provide amazing cars and{" "}
                <br />
                quick service!
              </p>
              <p style={styles.imageText}>Dubai</p>
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
    // left: "50%",
    // width: "100%",
    maxWidth: "1320px",
    margin: "0 auto",
    padding: "20px",
    background: colors.white,
    borderRadius: 20,
    zIndex: 1,
    marginTop: 10,
    // transform: "translate(-50%, -50%)",

    // position: "sticky",
    // top: 0, // Sticks at the top when scrolled
    // background: "green", // Ensures visibility
    // zIndex: 1000, // Keeps it above other content
    // padding: "10px", // Adjust for better spacing
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};
