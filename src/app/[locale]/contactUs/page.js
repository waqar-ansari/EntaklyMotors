import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { fonts } from "../../../../public/fonts/fonts";
import Link from "next/link";
import { colors } from "../../../../public/colors/colors";

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
              <p>Telephone : </p>
              <Link
                href="tel:+97144536000"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                +97144536000
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <p>Whatsapp : </p>
              <Link
                href="https://wa.me/+971044536000"
                target="_blank"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                +97144536000
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <p>Email : </p>
              <Link
                href="mailto:info@entaklymotors.com"
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                info@entaklymotors.com
              </Link>
            </div>
            <div style={styles.contactInfoBox}>
              <p>Location : </p>
              <Link
                href=""
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                }}
              >
                P30, Sadaf 2, JBR, Dubai, UAE
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
