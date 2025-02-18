"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
// import "../../../../styles/globals.css";
import "../navTabs.css";
import "../../../../styles/inputFields.css";
import Bookings from "@/components/modals/Bookings";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "react-phone-input-2/lib/bootstrap.css";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "bookings";
  const profileSubTab = searchParams.get("subTab") || "profileInformation";
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleTabSelect = (key) => {
    router.push(`?tab=${key}`, { scroll: false });
  };

  const handleProfileSubTabSelect = (key) => {
    router.push(`?tab=profile&subTab=${key}`, { scroll: false });
  };
  const handleCountryChange = (value, country) => {
    setCountryCode(`+${country.dialCode}`);
  };
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabSelect}
              id="nav-tabs"
              className="mb-3 custom-tabs border-0"
            >
              <Tab eventKey="bookings" title="Bookings">
                <Bookings />
              </Tab>
              <Tab eventKey="profile" title="Profile">
                <h3 className="mt-5">Profile</h3>
                <h5>One place to manage your account</h5>
                <Tabs
                  activeKey={profileSubTab}
                  onSelect={handleProfileSubTabSelect}
                  id="profile-tabs"
                  className="mb-3 custom-tabs border-0 mt-5"
                >
                  <Tab
                    eventKey="profileInformation"
                    title="Profile Information"
                  >
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        id="name"
                      />
                      <label for="name" className="inputLabelBg">
                        Name
                      </label>
                    </div>

                    <div className="d-flex align-items-center">
                      <PhoneInput
                        country={"ae"}
                        value={""}
                        inputStyle={{ display: "none" }}
                        onChange={handleCountryChange}
                        enableSearch
                        searchPlaceholder="Search..."
                        searchStyle={{width:280,marginLeft:0}}
                      />
                    <div style={{margin:"0px 10px"}}>{countryCode}</div>

                      <div className="input-box form-floating w-100">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Phone Number"
                          id="phoneNumber"
                          // value={`${countryCode} ${phoneNumber}`}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label for="phoneNumber" className="inputLabelBg">
                          Phone Number
                        </label>
                      </div>
                      
                    </div>

                    <button type="submit" className="submitButton">
                      Save
                    </button>
                  </Tab>
                  <Tab eventKey="email" title="Email">
                    <form action="/">
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email Address"
                          id="email"
                        />
                        <label for="email" className="inputLabelBg">
                          Email Address
                        </label>
                      </div>
                      <button type="submit" className="submitButton">
                        Save
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="changepassword" title="Change Password">
                    <form action="/">
                      <div className="input-box form-floating position-relative">
                        <input
                          className="form-control"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Current Password"
                          id="currentPassword"
                        />
                        <label
                          htmlFor="currentPassword"
                          className="inputLabelBg"
                        >
                          Current Password
                        </label>
                        <span
                          className="password-toggle-icon"
                          onClick={() =>
                            setShowCurrentPassword((prev) => !prev)
                          }
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>

                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                          id="newPassword"
                        />
                        <label for="newPassword" className="inputLabelBg">
                          New Password
                        </label>
                        <span
                          className="password-toggle-icon"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <button type="submit" className="submitButton">
                        Save
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="address" title="Address (optional)">
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Recipient"
                        id="recipient"
                      />
                      <label for="recipient" className="inputLabelBg">
                        Recipient
                      </label>
                    </div>
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Zipcode"
                        id="zipcode"
                      />
                      <label for="zipcode" className="inputLabelBg">
                        Zipcode
                      </label>
                    </div>
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                        id="city"
                      />
                      <label for="city" className="inputLabelBg">
                        City
                      </label>
                    </div>
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="State"
                        id="state"
                      />
                      <label for="state" className="inputLabelBg">
                        State
                      </label>
                    </div>
                    <div className="input-box form-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Country"
                        id="country"
                      />
                      <label for="country" className="inputLabelBg">
                        Country
                      </label>
                    </div>
                    <button type="submit" className="submitButton">
                      Save
                    </button>
                  </Tab>
                </Tabs>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
