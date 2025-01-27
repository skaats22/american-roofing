import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ResidentialContent from "../../components/ServiceComponents/ResidentialContent";
import CommercialContent from "../../components/ServiceComponents/CommercialContent";
import WaterproofingContent from "../../components/ServiceComponents/WaterproofingContent";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
  const [serviceType, setServiceType] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    if (type) setServiceType(type);
  }, [location]);

  return (
    <div>
      <div className={styles.dropdownMenu}>
        <button onClick={() => setServiceType("residential")}>Residential Roofing</button>
        <button onClick={() => setServiceType("commercial")}>Commercial Roofing</button>
        <button onClick={() => setServiceType("waterproofing")}>Waterproofing</button>
      </div>

      <div>
        {serviceType === "residential" && <ResidentialContent />}
        {serviceType === "commercial" && <CommercialContent />}
        {serviceType === "waterproofing" && <WaterproofingContent />}
      </div>
    </div>
  );
}
