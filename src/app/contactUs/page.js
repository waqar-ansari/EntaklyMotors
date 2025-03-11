import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { fonts } from "../../../public/fonts/fonts";
import Link from "next/link";
import { colors } from "../../../public/colors/colors";

const page = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5 py-5">
            <h2
              className="text-center"
              style={{
                fontFamily: fonts.helvetica900,
                textTransform: "uppercase",
                fontSize: 50,
                marginBottom: 50,
              }}
            >
              Contact Us
            </h2>
            <div style={styles.contactInfoBox}>
              <span>Telephone:  </span>
              <Link
                href="tel:+998333333331"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
               <span className="ms-1"> +998 33333333 1</span>
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <span>Whatsapp: </span>
              <Link
                href="https://wa.me/+971044536000"
                target="_blank"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                 <span className="ms-1"> +971 4 4536000</span>
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <span>Email: </span>
              <Link
                href="mailto:info@entaklymotors.com"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                <span className="ms-1">info@entaklymotors.com</span>
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <span >Location : </span>
              <Link
                href=""
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                <span className="ms-1">P30, Sadaf 2, JBR, Dubai, UAE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
const styles = {
  contactInfoBox: {
    display: "flex",
    marginBottom: 20,
  },
};
