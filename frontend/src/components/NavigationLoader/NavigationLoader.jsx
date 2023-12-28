"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "../Loader/Loader";

function NavigationLoader() {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoader(true);
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 750);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{showLoader && <Loader />}</>;
}

export default NavigationLoader;
