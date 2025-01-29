import React from "react";
import { Link } from "react-router";
import styles from "./ConstructionConditionResource.module.css";

export default function ConstructionConditionResource() {
  return (
    <div className={styles.resourceContainer}>
      <h1>Construction Condition Report</h1>
      <p>
        We provide detailed Construction Condition Reports to document the
        current state of properties before, during, or after construction
        projects.
      </p>
      <p>
        Our reports include thorough inspections, photographs, and clear
        documentation of any existing conditions or damages to protect all
        parties involved. Whether it’s for new builds, renovations, or
        neighboring properties, our comprehensive assessments ensure
        transparency, minimize disputes, and safeguard your investment.
      </p>
      <p>
        Trust our expertise to deliver accurate, professional reports tailored
        to your project’s needs.
      </p>
      <p>
        For more details, visit our <Link to="/about">About Us</Link> page.
      </p>
    </div>
  );
}
