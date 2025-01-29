import React from "react";
import { Link } from "react-router";
import styles from "./QuoteButton.module.css"

export default function QuoteButton() {

  return (
    <div className={styles.quoteButtonContainer}>
      <Link to="/quotes/new"><button className={styles.quoteButton}>Request a free quote!</button></Link>
    </div>
  )
}