import React from "react";
import { colors } from "../../public/colors/colors";
import Image from "next/image";
import Link from "next/link";
import { fonts } from "../../public/fonts/fonts";

const Footer = () => {
  return (
    <div style={styles.footerContainer} className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center">
              <Image
                src="/icons/entaklyLogo.svg"
                alt="logo"
                width={200}
                height={53}
              />
              <div>
                <Link href="https://apps.apple.com/in/app/linkgram/id6502818815"
                target="_blank"
                >
                  <Image
                    src="/icons/linkGramAppLogo.webp"
                    alt="logo"
                    width={30}
                    height={30}
                    style={{ marginRight: 24, borderRadius: 10 }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/icons/instagramLogo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    style={{ marginRight: 24 }}
                  />
                </Link>
                <Link 
                  href="https://wa.me/+971044536000"
                  target="_blank">
                  <Image
                    src="/icons/whatsappLogo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    style={{ marginRight: 24 }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/icons/telegramLogo.png"
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <p style={styles.footerHeading}>Our Products</p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                ...styles.footerList,
              }}
            >
              <li style={styles.LinkItems}>
                <Link href="#" className="footerLinks">Car Rental</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#pickUpAndDropoff" className="footerLinks">Pick-up and Drop-off</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/leaseCar" className="footerLinks">Lease to on 24 months 20% down payment</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/luxuryMercedes" className="footerLinks">V class Maybach services</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p style={styles.footerHeading}>Help and more</p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                ...styles.footerList,
              }}
            >
              <li style={styles.LinkItems}>
                <Link href="/contactUs" className="footerLinks">Contact Us</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/aboutUs" className="footerLinks">About Us</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#" className="footerLinks">Corporate Responsibility</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/terms&Conditions" className="footerLinks">Terms And Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Image
              src="/icons/allPaymentMethodsWithBg.png"
              alt="logo"
              width={300}
              height={101}
            />
          </div>
        </div>
        {/* <div className="row mt-5">
          <div className="col-12">
            <Link href="#" style={styles.bottomLinks}>
              Contact
            </Link>
            <Link href="#" style={styles.bottomLinks}>
              Rental Information
            </Link>
            <Link href="#" style={styles.bottomLinks}>
              Privacy Policy
            </Link>
            <Link href="#" style={styles.bottomLinks}>
              Terms and Conditions
            </Link>
          </div>
        </div> */}
        <div className="row mt-4 text-white text-center">
          <div className="col-12">© 2025 Entakly. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const styles = {
  footerContainer: {
    background: colors.themeMain,
    padding: "40px 0px",
    marginTop: -1,
  },
  footerHeading: {
    fontFamily: fonts.helvetica400,
    fontSize: 16,
    color: colors.grey,
    marginBottom: 20,
  },
  footerList: {
    color: colors.white,
    fontFamily: fonts.helvetica400,
    fontSize: 16,
  },
  LinkItems: {
    marginBottom: 16,
    fontSize: 14,
    textDecoration: "none",
  },
  bottomLinks: {
    color: colors.white,
    marginRight: 25,
  },
};
