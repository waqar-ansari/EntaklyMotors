import React from "react";
import { colors } from "../../public/colors/colors";
import Image from "next/image";
import Link from "next/link";
import { fonts } from "../../public/fonts/fonts";

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center">
              <Image
                src="/icons/entaklyLogo.jpeg"
                alt="logo"
                width={120}
                height={97}
              />
              <div>
                <Link href="#">
                  <Image
                    src="/icons/facebook.png"
                    alt="logo"
                    width={24}
                    height={24}
                    style={{ marginRight: 12 }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/icons/instagram.png"
                    alt="logo"
                    width={24}
                    height={24}
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
                <Link href="#">Car Rental</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">Airport PickUp and Dropoff</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">Lease to on 24 months 20% down payment</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">V class Maybach services</Link>
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
                <Link href="#">Contact</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">Rental Information</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">Entakly Group</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="#">Corporate Responsibility</Link>
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
        <div className="row mt-5">
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
        </div>
        <div className="row mt-4 text-white text-center">
            <div className="col-12">
            © 2025 Entakly. All rights reserved.
            </div>
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
  },
  footerList: {
    color: colors.white,
    fontFamily: fonts.helvetica400,
    fontSize: 16,
  },
  LinkItems: {
    marginBottom: 16,
    fontSize: 14,
  },
  bottomLinks: {
    color: colors.white,
    marginRight: 25,
  },
};
