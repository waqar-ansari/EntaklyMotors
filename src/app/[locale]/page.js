import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import "../../styles/globals.css";
import { colors } from "../../../public/colors/colors";
import Image from "next/image";
import { fonts } from "../../../public/fonts/fonts";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div>
        <p
          className="text-danger text-center text-white mb-0 py-2"
          style={{ backgroundColor: colors.themeMain }}
        >
          112 years of Entakly. 112 years of tradition.
        </p>
      </div>
      <Header />

      <Image
        src="/images/heroImage.webp"
        alt="Hero Image"
        width={1600}
        height={686}
        layout="responsive"
        priority
      />
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
          }}
        >
          Rent first class. <br /> Pay economy.
        </h1>
        <p>Premium car rental at affordable rates. Worldwide.</p>
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
              <p style={styles.subHeading}>Global reach</p>
            </div>
            <h4>2,000+ Entalky stations in over 105 countries</h4>
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
              <p style={styles.imageHeading}>Limousine Service with ENTALKY</p>
              <p style={styles.imageText}>
                Enjoy a professional journey with Entalky’s premium limousine
                service
              </p>
              <Link href="#" style={styles.imageButton}>
                Book now
              </Link>
            </div>
          </div>
        </div>
        <div className="row" style={styles.marginB}>
          <div className="col-md-12" style={{ position: "relative" }}>
            <Image
              src="/images/homeImage2.png"
              alt="limousine"
              width={1441}
              height={619}
              layout="responsive"
            />
            <div style={styles.textContainer}>
              <p style={styles.imageHeading}>ENTALKY App Offers</p>
              <p style={styles.imageText}>Download the Entalky app</p>
              <Link href="#" style={styles.imageButton}>
                Download the app
              </Link>
            </div>
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
              <div style={{ position: "relative" }}>
                <div style={styles.textContainer2}>
                  <p style={styles.imageHeading2}>
                    Limousine Service with ENTALKY
                  </p>
                  <p style={styles.imageText2}>
                    Enjoy a professional journey with Entalky’s premium
                    limousine service
                  </p>
                  <Link href="#" style={styles.imageButton}>
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
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
  textContainer2: {},
  imageHeading: {
    fontSize: "40px",
    textTransform: "uppercase",
    color: colors.white,
    fontFamily: fonts.helvetica700,
    marginBottom: 0,
  },
  imageText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.helvetica400,
  },
  imageButton: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.helvetica400,
    border: "1px solid white",
    padding: "10px 14px",
    borderRadius: 30,
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
};
