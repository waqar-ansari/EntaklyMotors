"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import "../navTabs.css";
import "../../../../styles/inputFields.css";
import Bookings from "@/components/modals/Bookings";
import PhoneInput from "react-phone-input-2";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "@/redux/slices/ProfileSlice";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "bookings";
  const profileSubTab = searchParams.get("subTab") || "profileInformation";
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phonenumber: { countryCode: "", number: "" },
    address: { street: "", city: "", state: "", zip: "" },
  });

  const handleTabSelect = (key) => {
    router.push(`?tab=${key}`, { scroll: false });
  };

  const handleProfileSubTabSelect = (key) => {
    router.push(`?tab=profile&subTab=${key}`, { scroll: false });
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const profile = useSelector((state) => state.profile);


  const { fullname, email, phonenumber, address, loading, error } = profile;

console.log(profile,"profile data from api fetch");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData,"profiledataaa");
    dispatch(updateProfile(profileData));
  };
  console.log(profileData,"profileDataprofileDataprofileData");
  
  const handleCountryChange = (value) => {
    
    setProfileData({
      ...profileData,
      phonenumber: {
        ...profileData.phonenumber,
        // number: profileData.phonenumber.number,
        countryCode: value,
      },
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      setProfileData({
        ...profileData,
        phonenumber: {
          ...profileData.phonenumber,
          // countryCode:profileData.phonenumber.countryCode,
          number: value,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
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
                    <form onSubmit={handleSubmit}>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          value={ profileData.fullname || fullname}
                          name="fullname"
                          onChange={handleInputChange}
                          placeholder="Name"
                          id="fullname"
                        />
                        <label for="fullname" className="inputLabelBg">
                          Name
                        </label>
                      </div>

                      <div className="d-flex align-items-center">
                        <PhoneInput
                          country={"ae"}
                          value={
                            profileData.phonenumber.countryCode
                            || phonenumber.countryCode 
                          }
                          inputStyle={{ display: "none" }}
                          onChange={handleCountryChange}
                          name="countryCode"
                          enableSearch
                          searchPlaceholder="Search..."
                          searchStyle={{ width: 280, marginLeft: 0 }}
                        />
                        <div style={{ margin: "0px 10px" }}>
                          { profileData.phonenumber.countryCode
                            || phonenumber.countryCode }
                        </div>

                        <div className="input-box form-floating w-100 my-0">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Phone Number"
                            name="number"
                            id="phonenumber"
                            value={
                              profileData.phonenumber.number || phonenumber.number 
                            }
                            onChange={handleInputChange}
                          />
                          <label for="phonenumber" className="inputLabelBg">
                            Phone Number
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="submitButton mt-5">
                        Save
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="email" title="Email Address">
                    <form onSubmit={handleSubmit}>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="email"
                          value={profileData.email || email}
                          name="email"
                          onChange={handleInputChange}
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
                          name="currentPassword"
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
                          name="newPassword"
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
                        name="recipient"
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
                        type="text"
                        placeholder="Zipcode"
                        name="zipcode"
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
                        name="city"
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
                        name="state"
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
                        name="country"
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
