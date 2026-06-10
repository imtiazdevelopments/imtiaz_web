"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function useUtm() {
  const searchParams = useSearchParams();
  const initialMedium = useRef("");

  useEffect(() => {
    const referrer = document.referrer || "";
    if (referrer.includes("google."))     initialMedium.current = "Google";
    else if (referrer.includes("bing."))  initialMedium.current = "Bing";
    else if (referrer.includes("yahoo.")) initialMedium.current = "Yahoo";

    if (!sessionStorage.getItem("landingUrl"))
      sessionStorage.setItem("landingUrl", window.location.href);
    if (!sessionStorage.getItem("landingRef"))
      sessionStorage.setItem("landingRef", referrer);
  }, []);

  const buildUtmPayload = () => {
    const keys = Array.from(searchParams.keys()).join(",");
    let platformSource = "";
    let medium = initialMedium.current;
    let campaign = "", adGroupId = "", adGroupName = "",
        adId = "", content = "", keyword = "",
        device = "", network = "", placement = "";

    if (searchParams.size > 0) {
      platformSource = searchParams.get("utm_source")      || "";
      campaign       = searchParams.get("utm_campaign")    || "";
      medium         = searchParams.get("utm_medium")      || medium;
      adGroupId      = searchParams.get("utm_adgroupid")   || "";
      adGroupName    = searchParams.get("utm_adgroupname") || "";
      adId           = searchParams.get("utm_adid")        || "";
      content        = searchParams.get("utm_content")     || "";
      keyword        = searchParams.get("utm_term")        || "";
      device         = searchParams.get("utm_device")      || "";
      network        = searchParams.get("utm_network")     || "";
      placement      = searchParams.get("utm_placement")   || "";

      if (!platformSource && !medium && keys.includes("clid")) {
        platformSource = "Paid_Search";
        medium = "Third_Party";
      }
    } else if (medium) {
      platformSource = "Organic_Search";
    } else {
      platformSource = "Landing Page";
      medium = "Direct";
    }

    return {
      utm_source:      platformSource,
      utm_medium:      medium,
      utm_campaign:    campaign,
      utm_term:        keyword,
      utm_content:     content,
      utm_adgroupid:   adGroupId,
      utm_adgroupname: adGroupName,
      utm_adid:        adId,
      utm_device:      device,
      utm_network:     network,
      utm_placement:   placement,
    };
  };

  return { buildUtmPayload };
}