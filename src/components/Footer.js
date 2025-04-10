"use client"
import React from "react";
import { colors } from "../../public/colors/colors";
import Image from "next/image";
import Link from "next/link";
import { fonts } from "../../public/fonts/fonts";
import { useTranslation } from "@/context/LanguageProvider";

const Footer = () => {
  const {t, language} = useTranslation()

  return (
    <div style={styles.footerContainer} className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
              <Image
                src="/icons/entaklyLogo.svg"
                alt="logo"
                width={200}
                height={53}
              />
              <div className="d-flex">
                <Link href="https://apps.apple.com/in/app/linkgram/id6502818815"
                target="_blank"
                >
                  <Image
                    src="/icons/linkGramAppLogo.webp"
                    alt="logo"
                    width={30}
                    height={30}
                    style={
                      
                      language==="ar"?{marginRight: 0,borderRadius: 10}:
                      
                      { marginRight: 24, borderRadius: 10 }}
                  />
                </Link>
                <Link href="https://www.instagram.com/entaklymotors?igsh=aDQ3bDBpeGo2cXkz&utm_source=qr">
                  <Image
                    src="/icons/instagramLogo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    style={{ marginRight: 24 }}
                  />
                </Link>
                <Link href="https://www.facebook.com/share/1BqqnjbLqC/?mibextid=wwXIfr"
                target="_blank"
                >
                  <Image
                    src="/icons/facebookLogo.png"
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
                <Link href="https://t.me/ENTAKLY_MOTORS"
                target="_blank"
                >
                  <Image
                    src="/icons/telegramLogo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    style={ language==="ar"?{ marginRight:24}:{}}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mt-4">
            <p style={styles.footerHeading}>{t("our_services")}</p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                paddingRight:0,
                ...styles.footerList,
              }}
            >
              <li style={styles.LinkItems}>
                <Link href="/cars" className="footerLinks">{t("car_rental")}</Link>
              </li>
              <li style={styles.LinkItems}>
              <Link 
                  href="https://wa.me/+971044536000"
                  target="_blank" className="footerLinks">
                    {/* {t("pick_up_and_drop_off")} */}
                    {t("dubai_luxury_taxi")}
                    </Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/leaseCar" className="footerLinks">{t("lease_for_24_months")}</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/luxuryMercedes" className="footerLinks">{t("v_class_maybach_services")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mt-4">
            <p style={styles.footerHeading}>{t("help_and_more")}</p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                paddingRight:0,
                ...styles.footerList,
              }}
            >
              <li style={styles.LinkItems}>
                <Link href="/contactUs" className="footerLinks">{t("contact_us")}</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/aboutUs" className="footerLinks">{t("about_us")}</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/socialResonsibility" className="footerLinks">{t("corporate_responsibility")}</Link>
              </li>
              <li style={styles.LinkItems}>
                <Link href="/terms&Conditions" className="footerLinks">{t("terms_and_conditions")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 my-auto text-end">
          <Image
              src="/icons/allPaymentMethodsWithBg.webp"
              alt="logo"
              width={1200}
              height={104}
              layout="responsive"
              style={{maxWidth:600}}
            />
          </div>
        </div>
        {/* <div className="row mt-sm-5 mt-3">
          <div className="col-12 col-md-6">
            <Image
              src="/icons/allPaymentMethodsWithBg.webp"
              alt="logo"
              width={1200}
              height={104}
              layout="responsive"
              style={{maxWidth:600}}
            />
          </div>
        </div> */}
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
          <div className="col-12">{t("copyright_text")}</div>
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
