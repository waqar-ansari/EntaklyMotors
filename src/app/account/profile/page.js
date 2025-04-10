"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import "../navTabs.css";
import "../../../styles/inputFields.css";
import Bookings from "@/components/modals/Bookings";
import PhoneInput from "react-phone-input-2";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "@/redux/slices/profileSlice";
import api from "@/app/api/axiosInstance";
import { useTranslation } from "@/context/LanguageProvider";
import ar from "react-phone-input-2/lang/ar.json";
import ru from "react-phone-input-2/lang/ru.json";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "bookings";
  const profileSubTab = searchParams.get("subTab") || "profileInformation";
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [localUserId, setLocalUserId] = useState(null);
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [changePasswords, setChangePasswords] = useState({
    current_password: "",
    new_password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setLocalUserId(localStorage.getItem("userId"));
  }, []);

  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phonenumber: { countryCode: "", number: "" },
    address: {
      recipient: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  });

  const handleTabSelect = (key) => {
    router.push(`?tab=${key}`, { scroll: false });
  };

  const handleProfileSubTabSelect = (key) => {
    router.push(`?tab=profile&subTab=${key}`, { scroll: false });
  };

  useEffect(() => {
    dispatch(fetchProfile({ user_id: Number(localUserId) }));
  }, [dispatch, localUserId]);

  const profile = useSelector((state) => state.profile);
  console.log(profile, "profile");

  const { fullname, email, phonenumber, address, loading, error } = profile;

  const handleSubmit = (e, subTab) => {
    e.preventDefault();

    let updatedData = {};
    if (subTab === "profileInformation") {
      updatedData = {
        full_name: profileData.fullname,
        user_id: Number(localUserId),
        phone_number: profileData.phonenumber,
      };
    } else if (subTab === "email") {
      updatedData = {
        email: profileData.email,
        user_id: Number(localUserId),
      };
    } else if (subTab === "address") {
      updatedData = {
        address: profileData.address,
        user_id: Number(localUserId),
      };
    }
    console.log(updatedData, "updatedData sent to profile api");

    dispatch(updateProfile(updatedData));
    console.log(Number(localUserId), "Number(localUserId)");

    dispatch(fetchProfile({ user_id: Number(localUserId) }));
  };

  const handleCountryChange = (value) => {
    setProfileData((prev) => ({
      ...prev,
      phonenumber: { ...prev.phonenumber, countryCode: value },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => {
      if (name === "number") {
        return {
          ...prev,
          phonenumber: { ...prev.phonenumber, number: value },
        };
      } else if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: { ...prev[parent], [child]: value },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  useEffect(() => {
    if (!loading) {
      setProfileData({
        fullname: fullname || "",
        email: email || "",
        phonenumber: {
          countryCode: phonenumber?.countryCode || "",
          number: phonenumber?.number || "",
        },
        address: {
          recipient: address?.recipient || "",
          street: address?.street || "",
          city: address?.city || "",
          state: address?.state || "",
          zipcode: address?.zipcode || "",
          country: address?.country || "",
        },
      });
    }
  }, [fullname, email, phonenumber, address, loading, error]);
  const handleChangePassword = (e) => {
    setChangePasswordMessage("");
    const { name, value } = e.target;
    setChangePasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    const passwordsWithUserId = {
      ...changePasswords,
      user_id: Number(localUserId),
    };

    try {
      const response = await api.post(
        "/change_password.php",
        passwordsWithUserId
      );
      if (response.data.status === "error") {
        setChangePasswordMessage(response.data.message);
        return;
      } else {
        setChangePasswordMessage(response.data.message);
        setChangePasswords({ current_password: "", new_password: "" });
        return;
      }
    } catch (error) {
      // setMessage(error.response?.data?.error || "Something went wrong");
      console.error(
        "Error:",
        error.response?.data?.error || "Something went wrong"
      );
    }
  };
  const { t, language } = useTranslation();

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
              <Tab eventKey="bookings" title={t("bookings")}>
                <Bookings />
              </Tab>
              <Tab eventKey="profile" title={t("profile")}>
                <h3 className="mt-5">{t("profile")}</h3>
                <h5>{t("one_place_to_manage_your_account")}</h5>

                <Tabs
                  activeKey={profileSubTab}
                  onSelect={handleProfileSubTabSelect}
                  id="profile-tabs"
                  className="mb-3 custom-tabs border-0 mt-5"
                >
                  <Tab
                    eventKey="profileInformation"
                    title={t("profile_information")}
                  >
                    <form
                      onSubmit={(e) => handleSubmit(e, "profileInformation")}
                    >
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          value={profileData.fullname}
                          name="fullname"
                          onChange={handleInputChange}
                          placeholder={t("name")}
                          id="fullname"
                        />
                        <label htmlFor="fullname" className="inputLabelBg">
                          {t("name")}
                        </label>
                      </div>

                      <div className="d-flex align-items-center">
                        <PhoneInput
                          country={"ae"}
                          value={profileData?.phonenumber?.countryCode}
                          inputStyle={{ display: "none" }}
                          onChange={handleCountryChange}
                          name="countryCode"
                          enableSearch
                          searchPlaceholder="Search..."
                          localization={
                            language === "ar"
                              ? ar
                              : language === "ru"
                              ? ru
                              : undefined
                          }
                          searchStyle={{ width: 280, marginLeft: 0 }}
                        />
                        <div style={{ margin: "0px 10px" }}>
                          {profileData?.phonenumber?.countryCode}
                        </div>

                        <div className="input-box w-100 my-0">
                          <input
                            className="form-control"
                            type="text"
                            placeholder={t("phone_number")}
                            name="number"
                            id="phonenumber"
                            value={
                              profileData?.phonenumber?.number ||
                              phonenumber?.number
                            }
                            onChange={handleInputChange}
                          />
                          {/* <label htmlFor="phonenumber" className="inputLabelBg">
                            {t("phone_number")}
                          </label> */}
                        </div>
                      </div>
                      <button type="submit" className="submitButton mt-5">
                        {t("save")}
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="email" title={t("email_address")}>
                    <form onSubmit={(e) => handleSubmit(e, "email")}>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="email"
                          value={profileData.email}
                          name="email"
                          onChange={handleInputChange}
                          placeholder={t("email_address")}
                          id="email"
                        />
                        <label htmlFor="email" className="inputLabelBg">
                          {t("email_address")}
                        </label>
                      </div>
                      <button type="submit" className="submitButton">
                        {t("save")}
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="changepassword" title={t("change_password")}>
                    <form onSubmit={handleSubmitChangePassword}>
                      <div className="input-box form-floating position-relative">
                        <input
                          className="form-control"
                          type={showCurrentPassword ? "text" : "password"}
                          name="current_password"
                          value={changePasswords.current_password}
                          onChange={handleChangePassword}
                          placeholder={t("current_password")}
                          id="current_password"
                        />
                        <label
                          htmlFor="current_password"
                          className="inputLabelBg"
                        >
                          {t("current_password")}
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
                          name="new_password"
                          value={changePasswords.new_password}
                          onChange={handleChangePassword}
                          placeholder={t("new_password")}
                          id="new_password"
                        />
                        <label htmlFor="new_password" className="inputLabelBg">
                          {t("new_password")}
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
                      <p style={{ color: "red" }}>{changePasswordMessage}</p>
                      <button type="submit" className="submitButton">
                        {t("save")}
                      </button>
                    </form>
                  </Tab>
                  <Tab eventKey="address" title={t("address_optional")}>
                    <form onSubmit={(e) => handleSubmit(e, "address")}>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          name="address.recipient"
                          value={profileData.address.recipient}
                          onChange={handleInputChange}
                          placeholder={t("recipient")}
                          id="recipient"
                        />
                        <label htmlFor="recipient" className="inputLabelBg">
                          {t("recipient")}
                        </label>
                      </div>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={t("zipcode")}
                          name="address.zipcode"
                          value={profileData.address.zipcode}
                          onChange={handleInputChange}
                          id="zipcode"
                        />
                        <label htmlFor="zipcode" className="inputLabelBg">
                          {t("zipcode")}
                        </label>
                      </div>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          name="address.city"
                          value={profileData.address.city}
                          onChange={handleInputChange}
                          placeholder={t("city")}
                          id="city"
                        />
                        <label htmlFor="city" className="inputLabelBg">
                          {t("city")}
                        </label>
                      </div>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          name="address.state"
                          value={profileData.address.state}
                          onChange={handleInputChange}
                          placeholder={t("state")}
                          id="state"
                        />
                        <label htmlFor="state" className="inputLabelBg">
                          {t("state")}
                        </label>
                      </div>
                      <div className="input-box form-floating">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={t("country")}
                          name="address.country"
                          value={profileData.address.country}
                          onChange={handleInputChange}
                          id="country"
                        />
                        <label htmlFor="country" className="inputLabelBg">
                          {t("country")}
                        </label>
                      </div>
                      <button type="submit" className="submitButton">
                        {t("save")}
                      </button>
                    </form>
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
