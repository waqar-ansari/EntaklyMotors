"use client";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, CustomProvider, DateRangePicker, Input } from "rsuite";
import enUS from "rsuite/esm/locales/en_US";
import arEG from "rsuite/esm/locales/ar_EG";
import ruRU from "rsuite/esm/locales/ru_RU";
import "rsuite/dist/rsuite.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { FaCar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.css";
import "../styles/datePickerStyles.css";
import { IoMdAirplane } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { HiMiniHome } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import "../styles/inputFields.css";
import {
  clearRentalDetail,
  setRentalDetailDataSlice,
} from "@/redux/slices/rentalDetailSlice";
import { useTranslation } from "../context/LanguageProvider";
import { useRouter } from "next/navigation";
// import { getLocationData } from "../../public/locations/allLocations";



const PickupAndDropPicker = ({
  heading = true,
  showCarsButton = true,
  onShowCarsClick,
}) => {
  const [range, setRange] = useState([null, null]);
  const [hoveredItem, setHoveredItem] = useState({});

  const dispatch = useDispatch();
  const { t, language } = useTranslation();

  const rentalDetails = useSelector((state) => state.rentalDetail);

  const [showDateModal, setShowDateModal] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
  const [showReturnTimeModal, setShowReturnTimeModal] = useState(false);
  const [showReturnTimeModalMobile, setShowReturnTimeModalMobile] =
    useState(false);
  const [showPickupTimeModalMobile, setShowPickupTimeModalMobile] =
    useState(false);
  const [pickupLocationModal, setPickupLocationModal] = useState(false);
  const [returnLocationModal, setReturnLocationModal] = useState(false);
  const [showLocationHeading, setShowLocationHeading] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [error, setError] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const pickerRef = useRef(null);
  const showLocationsRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 1);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(pickupDate.getDate() + 2);
    setRange([pickupDate, returnDate]);
    setPickupTime("10:00 AM");
    setReturnTime("10:00 AM");
  }, []);
  const calendarLocales = {
    en: enUS,
    ar: arEG,
    ru: ruRU,
  };
  const openDatePicker = () => {
    if (pickerRef.current) {
      pickerRef.current.open();
    }
  };
  const locationData = [
    {
      locationName: t("dubai_international_airport_terminal_1"),
      address: t("dubai_international_airport_terminal_1"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("dubai_international_airport_terminal_2"),
      address: t("dubai_international_airport_terminal_2"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("dubai_international_airport_terminal_3"),
      address: t("dubai_international_airport_terminal_3"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("al_maktoum_international_airport_dwc"),
      address: t("al_maktoum_international_airport_dwc"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("five_luxe_jbr"),
      address: t("five_luxe_jbr"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("five_palm_jumeirah_hotel"),
      address: t("five_palm_jumeirah_hotel"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("five_jumeirah_village_hotel"),
      address: t("five_jumeirah_village_hotel"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("address_beach_resort"),
      address: t("address_beach_resort"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("address_sky_view"),
      address: t("address_sky_view"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("address_downtown"),
      address: t("address_downtown"),
      locationIcon: <HiMiniHome />,
    },
    // {
    //   locationName: "Address Dubai Marina",
    //   address: "Address Dubai Marina",
    //   locationIcon: <HiMiniHome />,
    // },
    {
      locationName: t("address_boulevard"),
      address: t("address_boulevard"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("address_montgmerie"),
      address: t("address_montgmerie"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("address_grand_creek_harbour"),
      address: t("address_grand_creek_harbour"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("rixos_the_palm_hotel_&_suites"),
      address: t("rixos_the_palm_hotel_&_suites"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("rixos_premium_dubai"),
      address: t("rixos_premium_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("the_ritz-carlton_dubai_international_financial"),
      address: t("the_ritz-carlton_dubai_international_financial"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("the_ritz-_carlton_jbr"),
      address: t("the_ritz-_carlton_jbr"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("mövenpick_hotel_apartments_downtown"),
      address: t("mövenpick_hotel_apartments_downtown"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("mövenpick_hotel_jumeirah_beach"),
      address: t("mövenpick_hotel_jumeirah_beach"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("mövenpick_hotel_&_apartments_bur_dubai"),
      address: t("mövenpick_hotel_&_apartments_bur_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("mövenpick_grand_al_bustan_dubai"),
      address: t("mövenpick_grand_al_bustan_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("mövenpick_hotel_ibn_battuta_gate_dubai"),
      address: t("mövenpick_hotel_ibn_battuta_gate_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("al_bandar_rotana"),
      address: t("al_bandar_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("al_jaddaf_rotana_suite_hotel"),
      address: t("al_jaddaf_rotana_suite_hotel"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("amwaj_rotana"),
      address: t("amwaj_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("arabian_park_dubai_-_edge_by_rotana"),
      address: t("arabian_park_dubai_-_edge_by_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("centro_barsha_by_rotana"),
      address: t("centro_barsha_by_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("centro_business_bay_by_rotana"),
      address: t("centro_business_bay_by_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("media_rotana"),
      address: t("media_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("rose_rayhaan_by_rotana"),
      address: t("rose_rayhaan_by_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("towers_rotana"),
      address: t("towers_rotana"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_dubai_al_habtoor_city"),
      address: t("hilton_dubai_al_habtoor_city"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_dubai_jumeirah"),
      address: t("hilton_dubai_jumeirah"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_dubai_the_walk"),
      address: t("hilton_dubai_the_walk"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_dubai_creek"),
      address: t("hilton_dubai_creek"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_al_muraqabat"),
      address: t("hilton_garden_inn_dubai_al_muraqabat"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_al_mina"),
      address: t("hilton_garden_inn_dubai_al_mina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_mall_of_the_emirates"),
      address: t("hilton_garden_inn_mall_of_the_emirates"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_al_jadaf_culture_village"),
      address: t("hilton_garden_inn_al_jadaf_culture_village"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_business_bay"),
      address: t("hilton_garden_inn_dubai_business_bay"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_al_barsha"),
      address: t("hilton_garden_inn_dubai_al_barsha"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_airport"),
      address: t("hilton_garden_inn_dubai_airport"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_media_city"),
      address: t("hilton_garden_inn_dubai_media_city"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_downtown"),
      address: t("hilton_garden_inn_dubai_downtown"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_marina"),
      address: t("hilton_garden_inn_dubai_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_dubai_silicon_oasis"),
      address: t("hilton_garden_inn_dubai_silicon_oasis"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hilton_garden_inn_world_trade_centre"),
      address: t("hilton_garden_inn_world_trade_centre"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_business_bay"),
      address: t("doubletree_by_hilton_dubai_-_business_bay"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_-_jumeirah_beach"),
      address: t("doubletree_by_hilton_-_jumeirah_beach"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_al_barsha"),
      address: t("doubletree_by_hilton_dubai_-_al_barsha"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_-_m_square_hotel_&_residences"),
      address: t("doubletree_by_hilton_-_m_square_hotel_&_residences"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_bay_square"),
      address: t("doubletree_by_hilton_dubai_-_bay_square"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_-_jumeirah_lakes_towers"),
      address: t("doubletree_by_hilton_-_jumeirah_lakes_towers"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_al_jadaf"),
      address: t("doubletree_by_hilton_dubai_-_al_jadaf"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_al_mankhool"),
      address: t("doubletree_by_hilton_dubai_-_al_mankhool"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_al_rigga"),
      address: t("doubletree_by_hilton_dubai_-_al_rigga"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("doubletree_by_hilton_dubai_-_al_qusais"),
      address: t("doubletree_by_hilton_dubai_-_al_qusais"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("conrad_dubai"),
      address: t("conrad_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("waldorf_astoria_dubai_palm_jumeirah"),
      address: t("waldorf_astoria_dubai_palm_jumeirah"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("waldorf_astoria_dubai_international_financial_centre"),
      address: t("waldorf_astoria_dubai_international_financial_centre"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("lxr_hotels_&_resorts_habtoor_palace_dubai"),
      address: t("lxr_hotels_&_resorts_habtoor_palace_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("canopy_by_hilton_dubai_al_seef"),
      address: t("canopy_by_hilton_dubai_al_seef"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("canopy_by_hilton_dubai_al_habtoor_city"),
      address: t("canopy_by_hilton_dubai_al_habtoor_city"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hampton_by_hilton_dubai_airport"),
      address: t("hampton_by_hilton_dubai_airport"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hampton_by_hilton_dubai_al_barsha"),
      address: t("hampton_by_hilton_dubai_al_barsha"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hampton_by_hilton_dubai_al_seef"),
      address: t("hampton_by_hilton_dubai_al_seef"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("jw_marriott_marquis_hotel_dubai"),
      address: t("jw_marriott_marquis_hotel_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("jw_marriott_hotel_marina"),
      address: t("jw_marriott_hotel_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("the_westin_dubai_mina_seyahi_beach_resort_&_marina"),
      address: t("the_westin_dubai_mina_seyahi_beach_resort_&_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("atlantis"),
      address: t("atlantis"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("le_méridien_mina_seyahi_resort_&_marina"),
      address: t("le_méridien_mina_seyahi_resort_&_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("le_méridien_dubai_hotel_&_conference_centre"),
      address: t("le_méridien_dubai_hotel_&_conference_centre"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("le_méridien_fairway"),
      address: t("le_méridien_fairway"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_al_rigga"),
      address: t("ibis_al_rigga"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_one_central"),
      address: t("ibis_one_central"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_world_trade_centre_dubai"),
      address: t("ibis_world_trade_centre_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_styles_dubai_jumeira"),
      address: t("ibis_styles_dubai_jumeira"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_styles_dubai_deira"),
      address: t("ibis_styles_dubai_deira"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ibis_mall_avenue_dubai"),
      address: t("ibis_mall_avenue_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ramada_hotel_&_suites_by_wyndham_dubai_jbr"),
      address: t("ramada_hotel_&_suites_by_wyndham_dubai_jbr"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ramada_by_wyndham_dubai_deira"),
      address: t("ramada_by_wyndham_dubai_deira"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ramada_by_wyndham_dubai_barsha_heights"),
      address: t("ramada_by_wyndham_dubai_barsha_heights"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ramada_downtown_dubai"),
      address: t("ramada_downtown_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("ramada_jumeirah_hotel"),
      address: t("ramada_jumeirah_hotel"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("crowne_plaza_dubai_festival_city"),
      address: t("crowne_plaza_dubai_festival_city"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("crowne_plaza_dubai_jumeirah"),
      address: t("crowne_plaza_dubai_jumeirah"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("crowne_plaza_dubai_deira"),
      address: t("crowne_plaza_dubai_deira"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("crowne_plaza_dubai_marina"),
      address: t("crowne_plaza_dubai_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sheraton_grand_hotel,_dubai"),
      address: t("sheraton_grand_hotel,_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sheraton_dubai_creek_hotel_&_towers"),
      address: t("sheraton_dubai_creek_hotel_&_towers"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sheraton_jumeirah_beach_resort"),
      address: t("sheraton_jumeirah_beach_resort"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sheraton_mall_of_the_emirates_hotel,_dubai"),
      address: t("sheraton_mall_of_the_emirates_hotel,_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("fairmont_the_palm"),
      address: t("fairmont_the_palm"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("fairmont_dubai"),
      address: t("fairmont_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("fairmont_dubai_skyline"),
      address: t("fairmont_dubai_skyline"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sofitel_dubai_the_obelisk"),
      address: t("sofitel_dubai_the_obelisk"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sofitel_dubai_jumeirah_beach"),
      address: t("sofitel_dubai_jumeirah_beach"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: "sofitel_dubai_the_palm",
      address: t("sofitel_dubai_the_palm"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("sofitel_dubai_downtown"),
      address: t("sofitel_dubai_downtown"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("radisson_blu_hotel,_dubai_deira_creek"),
      address: t("radisson_blu_hotel,_dubai_deira_creek"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("radisson_blu_hotel,_dubai_media_city"),
      address: t("radisson_blu_hotel,_dubai_media_city"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("radisson_blu_hotel,_dubai_waterfront"),
      address: t("radisson_blu_hotel,_dubai_waterfront"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("radisson_beach_resort_palm_jumeirah"),
      address: t("radisson_beach_resort_palm_jumeirah"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hyatt_regency_dubai"),
      address: t("hyatt_regency_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("hyatt_regency_dubai_creek_heights"),
      address: t("hyatt_regency_dubai_creek_heights"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("millennium_plaza_downtown_hotel,_dubai"),
      address: t("millennium_plaza_downtown_hotel,_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("the_biltmore_hotel_villas_dubai"),
      address: t("the_biltmore_hotel_villas_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("millennium_place_marina"),
      address: t("millennium_place_marina"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("copthorne_hotel_dubai"),
      address: t("copthorne_hotel_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("millennium_al_barsha"),
      address: t("millennium_al_barsha"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("studio_m_al_barsha"),
      address: t("studio_m_al_barsha"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("millennium_airport_hotel_dubai"),
      address: t("millennium_airport_hotel_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("grand_millennium_dubai"),
      address: t("grand_millennium_dubai"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("one&only_royal_mirage"),
      address: t("one&only_royal_mirage"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("one&only_the_palm"),
      address: t("one&only_the_palm"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("one&only_one_za’abeel"),
      address: t("one&only_one_za’abeel"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("armani_hotel_dubai"),
      address: t("armani_hotel_dubai"),
      locationIcon: <HiMiniHome />,
    },
    // {
    //   locationName: "Hilton Garden Inn Dubai Airport",
    //   address: "Hilton Garden Inn Dubai Airport",
    //   locationIcon: <HiMiniHome />,
    // }
  ]
  // const formatDate = (date) => {
  //   if (!date) return "";
  //   return date.toLocaleString("en-GB", {
  //     day: "numeric",
  //     month: "short",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };
  useEffect(() => {
    setFilteredLocations(locationData);
  }, []);
  const handlePickUpDateClick = () => {
    const isLargeScreen =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1200px)").matches;

    if (isLargeScreen) {
      openDatePicker();
    } else {
      setShowDateModal(true);
    }
  };
  // const handleLocationClick = (e, item) => {
  //   setPickupLocation(item.locationName)
  //   e.stopPropagation();
  // };
  const handleLocationClick = (e, item) => {
    e.stopPropagation();

    if (activeInput === "pickup") {
      setPickupLocation(item.locationName);
      setError("");
    } else if (activeInput === "drop") {
      setReturnLocation(item.locationName);
    }

    setShowLocations(false); // Hide the location list after selection
  };
  const timeSlots = [];
  const periods = ["AM", "PM"];

  periods.forEach((period) => {
    for (let hour = 0; hour < 12; hour++) {
      const displayHour = hour === 0 ? 12 : hour;
      timeSlots.push(`${displayHour}:00 ${period}`);
      timeSlots.push(`${displayHour}:30 ${period}`);
    }
  });
  const handleClose = () => setShowPickupTimeModal(false);
  const handleShowPickupTimeModal = () => setShowPickupTimeModal(true);
  const handleShowPickupTimeModalMobile = () =>
    setShowPickupTimeModalMobile(true);

  const handleShowReturnTimeModal = () => setShowReturnTimeModal(true);
  const handleInputClick = (inputType, heading) => {
    if (activeInput === inputType) {
      // Close the div only if the same input is clicked again
      setShowLocations(false);
      setActiveInput(null);
    } else {
      // Show the div with a new heading
      setShowLocations(true);
      setShowLocationHeading(heading);
      setActiveInput(inputType);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showLocationsRef.current &&
        !showLocationsRef.current.contains(event.target) &&
        event.target.id !== "pickupLocation" &&
        event.target.id !== "returnLocation"
      ) {
        setShowLocations(false);
        setActiveInput(null);
      }
    };

    if (showLocations) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLocations]);
  const handlePickUpTimeClick = () => {
    setShowPickupTimeModal(true);
  };
  const handleReturnTimeClick = () => {
    setShowReturnTimeModal(true);
  };
  const pickupDate = range[0]
    ? range[0].toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const returnDate = range[1]
    ? range[1].toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const handleShowCarsClick = (e) => {
    if (!pickupLocation && !rentalDetails.pickupLocation) {
      setError("Please select a pickup location.");
      e.preventDefault();
      return;
    }

    setError("");

    const rentalData = {
      pickupLocation: pickupLocation || rentalDetails.pickupLocation,
      returnLocation:
        returnLocation || rentalDetails.returnLocation || pickupLocation,
      pickupDate: pickupDate || rentalDetails.pickupDate,
      returnDate: returnDate || rentalDetails.returnDate,
      pickupTime: pickupTime || rentalDetails.pickupTime,
      returnTime: returnTime || rentalDetails.returnTime,
    };

    dispatch(setRentalDetailDataSlice(rentalData));

    router.push("/cars");
  };
  const handleLocationSearch = (input) => {
    setLocationSearch(input);
    if (input === "") {
      setFilteredLocations(locationData);
      return;
    }
    const result = locationData.filter((loc) =>
      loc.locationName.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredLocations(result);
  };
  return (
    <div>
      {heading && <p style={styles.heading}>{t("rent_a_car")}</p>}

      <div
        className="d-md-flex justify-content-center pickupAndDropPicker flex-wrap position-relative "
        style={{ gap: "15px", paddingBottom: error ? "0px" : "24px" }}
      >
        {showLocations && (
          <div
            ref={showLocationsRef}
            className="position-absolute mobDisplayNone"
            style={{
              top: 70,
              ...(language === "ar" ? { right: 40 } : { left: 40 }),
              width: "70%",
            }}
          >
            <div
              style={{
                background: colors.white,
                boxShadow: "rgba(0, 0, 0, 0.75) 2px 2px 16px 1px",
                borderRadius: 10,
                padding: 20,
                paddingTop: 20,
                position: "relative",
                zIndex: 999,
                height: "70vh",
                overflow: "hidden",
              }}
              onClick={handleLocationClick}
            >
              <div className="fs-4 mb-4 fw-bold" style={{ paddingLeft: 16 }}>
                {showLocationHeading}
              </div>

              <div className="container-fluid">
                <div className="row" style={{ height: "100%" }}>
                  <div
                    className="col-md-6"
                    style={{
                      // overflowY: "auto",
                      height: "100%",
                    }}
                  >
                    <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div>

                    <div
                      style={{
                        overflowY: "auto",
                        height: "60vh",
                        paddingBottom: 50,
                      }}
                    >
                      {filteredLocations.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingBottom: 40,
                              cursor: "pointer",
                            }}
                            onClick={(e) => handleLocationClick(e, item)}
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem("")}
                          >
                            <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                              {item.locationIcon}
                            </span>
                            <span className="mb-0">{item.locationName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="col-md-6"
                    style={
                      {
                        // height: "60vh", // Match the height of the first column
                        // overflowY: "hidden", // Disable scrolling
                        // paddingLeft: "20px", // Add some padding for spacing
                      }
                    }
                  >
                    {" "}
                    {hoveredItem ? (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="fs-2">{hoveredItem.locationIcon}</div>
                          <div>
                            <span className="pickupRetunSpanStyle me-2">
                              <MdKey className="me-2" />
                              {t("24_hour_pickup")}
                            </span>
                            <span className="pickupRetunSpanStyle">
                              <TbArrowBack className="me-2" />
                              {t("24_hour_return")}
                            </span>
                          </div>
                        </div>
                        <p className="hoverAddressStyle">
                          {hoveredItem.locationName}
                        </p>
                        <p className="hoverDetailedAddressStyle">
                          {hoveredItem.address}
                        </p>
                      </div>
                    ) : (
                      <div className="text-muted"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="input-group customInputGroup mobDisplayNone">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="pickupLocation"
              value={pickupLocation || rentalDetails.pickupLocation}
              placeholder="Pickup Location"
              onClick={() => {
                handleInputClick("pickup", t("pick_up_locations"));
              }}
            />
            <label htmlFor="pickupLocation">{t("pick_up")}</label>
          </div>
        </div>
        <div className="input-group customInputGroup tabDisplayNone">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              value={pickupLocation || rentalDetails.pickupLocation}
              id="pickupLocation"
              placeholder="Pickup Location"
              onClick={() => {
                setPickupLocationModal(true);
                handleInputClick("pickup", t("pick_up_locations"));
              }}
            />
            <label htmlFor="pickupLocation">{t("pick_up")}</label>
          </div>
        </div>
        <div className="mb-0 input-group customInputGroup tabDisplayNone ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="returnLocation"
              value={returnLocation || rentalDetails.returnLocation}
              placeholder="Drop Location"
              onClick={() => {
                setReturnLocationModal(true);
                handleInputClick("drop", t("return_locations"));
              }}
            />
            <label htmlFor="returnLocation">{t("return")}</label>
          </div>
        </div>

        <div className="mb-0 input-group customInputGroup mobDisplayNone ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              value={returnLocation || rentalDetails.returnLocation}
              id="returnLocation"
              placeholder="Drop Location"
              onClick={() => handleInputClick("drop", t("return_locations"))}
            />
            <label htmlFor="returnLocation">{t("return")}</label>
          </div>
        </div>
        <CustomProvider locale={calendarLocales[language]}>
          <DateRangePicker
            format="d MMMM yyyy"
            ref={pickerRef}
            value={range}
            onChange={setRange}
            shouldDisableDate={(date) => date < new Date()}
            showMeridiem
            style={{ width: 0, background: "transparent" }}
            showShortcuts={false}
            renderFooter={() => null}
            showHeader={false}
            character="to"
          />
        </CustomProvider>
        {/* date and time picker for mobile */}
        <div className="tabDisplayNone">
          <div className="d-flex gap-2">
            <div className="d-flex flex-column">
              <div
                className="input-group customInputGroup mb-0"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottom: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={pickupDate || rentalDetails.pickupDate}
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("pick_up_date")}
                  </label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <MdOutlineAccessTimeFilled />
                </span>
                <div className="form-floating">
                  <input
                    value={pickupTime || rentalDetails.pickupTime}
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handleShowPickupTimeModalMobile}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_date")}
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column">
              <div
                className="input-group customInputGroup mb-0"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottom: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={returnDate || rentalDetails.returnDate}
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_date")}
                  </label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <MdOutlineAccessTimeFilled />
                </span>
                <div className="form-floating">
                  <input
                    value={returnTime || rentalDetails.returnTime}
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handleShowReturnTimeModal}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_time")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="datePickerGroup mobDisplayNone">
          <div className="d-flex">
            <div
              className="input-group customInputGroup pcInputFixedWidth"
              style={
                language === "ar"
                  ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                  : {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
              }
            >
              <span className="input-group-text">
                <FaCalendarAlt />
              </span>
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[0]) : ""}
                  value={pickupDate || rentalDetails.pickupDate}
                  className="form-control"
                  placeholder="Pickup Date & Time"
                  onClick={handlePickUpDateClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("pick_up_date")}</label>
              </div>
            </div>
            <div
              className="input-group customInputGroup pcTimeInputFixedWidth"
              style={
                language === "ar"
                  ? {
                      borderRight: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {
                      borderLeft: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }
              }
            >
              {/* <span className="input-group-text">
                <FaCalendarAlt />
              </span> */}
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[0]) : ""}
                  value={pickupTime || rentalDetails.pickupTime}
                  className="form-control"
                  placeholder="Pickup Date & Time"
                  onClick={handlePickUpTimeClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("pick_up_time")}</label>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div
              className="input-group customInputGroup pcInputFixedWidth"
              style={
                language === "ar"
                  ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                  : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
              }
            >
              <span className="input-group-text">
                <FaCalendarAlt />
              </span>
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[1]) : ""}
                  value={returnDate || rentalDetails.returnDate}
                  className="form-control"
                  placeholder="Return Date"
                  onClick={handlePickUpDateClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("return_date")}</label>
              </div>
            </div>
            <div
              className="input-group customInputGroup pcTimeInputFixedWidth"
              style={
                language === "ar"
                  ? {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRight: 0,
                    }
                  : {
                      borderLeft: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }
              }
            >
              {/* <span className="input-group-text">
                <FaCalendarAlt />
              </span> */}
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[1]) : ""}
                  value={returnTime || rentalDetails.returnTime}
                  className="form-control"
                  placeholder="Return Date"
                  onClick={handleReturnTimeClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">Return Time</label>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/cars"
          onClick={handleShowCarsClick}
          style={styles.showCarsBtn}
          className="tabDisplayNone"
        >
          {t("show_cars")}
        </Link>
        {showCarsButton && (
          <button
            // href="/cars"
            data-bs-dismiss="modal"
            onClick={handleShowCarsClick}
            style={styles.showCarsBtn}
          >
            {t("show_cars")}
          </button>
        )}
      </div>
      {error && (
        <p style={{ color: "red", marginLeft: 40, marginBottom: 0 }}>{error}</p>
      )}
      <Modal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        fullscreen
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CustomProvider locale={calendarLocales[language]}>
          <DateRangePicker
            showOneCalendar
            style={{ width: 0, background: "transparent" }}
            onOk={() => setShowDateModal(false)}
            onClose={() => setShowDateModal(false)}
            ref={pickerRef}
            shouldDisableDate={(date) => date < new Date()}
            value={range}
            onChange={setRange}
            format="d MMMM yyyy"
            defaultOpen
            showMeridiem
            character="to"
            locale={arEG}
          />
          </CustomProvider>
        </Modal.Body>
      </Modal>
      <Modal
        show={showPickupTimeModal}
        scrollable
        centered
        onHide={handleClose}
        backdrop
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("pick_up_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: pickupTime === time ? "black" : "#f9f9f9",
                  color: pickupTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setPickupTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            className="btn btn-secondary"
            onClick={() => setShowPickupTimeModal(false)}
          >
            Close
          </Button> */}
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowPickupTimeModal(false);
              setShowReturnTimeModal(true);
            }}
          >
            {t("select_return_date")}{" "}
            <FaArrowRightLong style={{ marginLeft: 15 }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPickupTimeModalMobile} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("pick_up_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: pickupTime === time ? "black" : "#f9f9f9",
                  color: pickupTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setPickupTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowPickupTimeModalMobile(false)}
          >
            Close
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowPickupTimeModalMobile(false);
              setShowReturnTimeModalMobile(true);
            }}
          >
            {t("select_return_date")}
            <FaArrowRightLong style={{ marginLeft: 15 }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showReturnTimeModal}
        scrollable
        centered
        onHide={handleClose}
        backdrop
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("return_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: returnTime === time ? "black" : "#f9f9f9",
                  color: returnTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setReturnTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowReturnTimeModal(false)}
          >
            {t("close")}
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowReturnTimeModal(false);
            }}
          >
            {t("save_changes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReturnTimeModalMobile} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("return_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: returnTime === time ? "black" : "#f9f9f9",
                  color: returnTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setReturnTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowReturnTimeModalMobile(false)}
          >
            Close
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowReturnTimeModalMobile(false);
            }}
          >
            {t("save_changes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={pickupLocationModal}
        fullscreen
        onHide={handleClose}
        className="tabDisplayNone"
      >
        <Modal.Header>
          <Modal.Title>{t("pick_up_locations")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="position-absolute"> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="input-box form-floating mt-0">
                  <input
                    className="form-control"
                    type="text"
                    value={locationSearch}
                    name="searchLocation"
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    placeholder={t("search_location")}
                    id="searchLocation"
                  />
                  <label htmlFor="searchLocation" className="inputLabelBg">
                    {t("search_location")}
                  </label>
                </div>
                {filteredLocations.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 12,
                        cursor: "pointer",
                        marginBottom: 20,
                        borderRadius: 30,
                        background:
                          activeInput === "pickup" &&
                          item.locationName === pickupLocation
                            ? "black"
                            : "#f9f9f9",
                        color:
                          activeInput === "pickup" &&
                          item.locationName === pickupLocation
                            ? "white"
                            : "black",
                      }}
                      onClick={(e) => {
                        handleLocationClick(e, item);
                      }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem("")}
                    >
                      <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                        {item.locationIcon}
                      </span>
                      <span className="mb-0">{item.locationName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setPickupLocationModal(false);
              setActiveInput(null);
            }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: colors.themeMain, color: colors.white }}
            onClick={() => {
              setPickupLocationModal(false);
              setReturnLocationModal(true);
              setActiveInput("drop");
            }}
          >
            {t("select_return_location")} <FaArrowRightLong className="ms-2" />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={returnLocationModal}
        fullscreen
        onHide={handleClose}
        className="tabDisplayNone"
      >
        <Modal.Header>
          <Modal.Title>{t("return_locations")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="position-absolute">
            <div onClick={handleLocationClick}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    {/* <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div> */}
                    <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div>
                    {filteredLocations.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: 12,
                            cursor: "pointer",
                            marginBottom: 20,
                            borderRadius: 30,
                            background:
                              activeInput === "drop" &&
                              item.locationName === returnLocation
                                ? "black"
                                : "#f9f9f9",
                            color:
                              activeInput === "drop" &&
                              item.locationName === returnLocation
                                ? "white"
                                : "black",
                          }}
                          onClick={(e) => {
                            handleLocationClick(e, item);
                          }}
                          onMouseEnter={() => setHoveredItem(item)}
                          onMouseLeave={() => setHoveredItem("")}
                        >
                          <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                            {item.locationIcon}
                          </span>
                          <span className="mb-0">{item.locationName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setReturnLocationModal(false);
              setActiveInput(null);
            }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: colors.themeMain, color: colors.white }}
            onClick={() => {
              setReturnLocationModal(false);
              setActiveInput(null);
            }}
          >
            {t("save_changes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default PickupAndDropPicker;
const styles = {
  showCarsBtn: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    background: colors.themeMain,
    color: colors.white,
    fontFamily: fonts.helvetica400,
    textDecoration: "none",
  },
  heading: {
    fontFamily: fonts.helvetica700,
    fontSize: 26,
    marginBottom: 30,
  },
};
