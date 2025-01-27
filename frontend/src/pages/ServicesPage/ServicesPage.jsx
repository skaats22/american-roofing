import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import CommercialContent from "../../components/ServiceComponents/CommercialContent";
import RoofRepairContent from "../../components/ServiceComponents/RoofRepairContent";
import RoofReplacementContent from "../../components/ServiceComponents/RoofReplacementContent";
import ConstructionConditionReport from "../../components/ServiceComponents/ConstructionConditionReport";
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
        <button
          className={styles.serviceButton}
          onClick={() => setServiceType("commercial")}
        >
          Commercial Roofing
        </button>
        <button
          className={styles.serviceButton}
          onClick={() => setServiceType("repair")}
        >
          Roof Repair
        </button>
        <button
          className={styles.serviceButton}
          onClick={() => setServiceType("replacement")}
        >
          Roof Replacement
        </button>
        <button
          className={styles.serviceButton}
          onClick={() => setServiceType("construction-condition-report")}
        >
          Construction Condition Report
        </button>
      </div>

      <div>
        {serviceType === "commercial" && <CommercialContent />}
        {serviceType === "repair" && <RoofRepairContent />}
        {serviceType === "replacement" && <RoofReplacementContent />}
        {serviceType === "construction-condition-report" && (
          <ConstructionConditionReport />
        )}
      </div>
    </div>
  );
}
