"use client";

import { useEffect } from "react";

const BootstrapJs = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  },[]);
  return null;
}

export default BootstrapJs
