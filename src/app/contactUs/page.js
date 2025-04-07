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
          <div className="col-md-12 my-5">
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
          <div className="col-12 mb-5">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8594.779226653629!2d55.13540904263508!3d25.07952672068031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b54da9f59ef%3A0x811bc204f4003762!2sSadaf%202!5e0!3m2!1sen!2sae!4v1742205466278!5m2!1sen!2sae" width="100%" height="450"style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
