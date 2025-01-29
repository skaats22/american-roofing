import React from "react";
import { Link } from "react-router"
import styles from "./NoticeToOwnerResource"

export default function NoticeToOwnerResource() {

  return (
    <div className={styles.resourceDetail}>
      <h1>Understanding a Notice to Owner</h1>
      <p>This law protects the homeowner from paying for their materials twice.</p>
      <p>
        Under California’s construction lien law, a Notice to Owner is a preliminary notice provided to the property owner. It is typically used by subcontractors and other construction-related entities that do not have a direct contract with the property owner. This document ensures the homeowner is informed about the services and materials being provided, which could potentially lead to a lien if payment issues arise.
      </p>
      <p>
        For a full list of services available to property owners, visit our <Link to="/about">About Us</Link> page.
      </p>
    </div>
  );
}