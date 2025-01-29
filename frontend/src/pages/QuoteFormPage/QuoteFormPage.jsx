import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./QuoteFormPage.module.css";
import * as quoteService from "../../services/quoteService";

export default function QuoteForm(props) {
  const [formData, setFormData] = useState({
    firstName: props.user ? props.user.firstName : "",
    lastName: props.user ? props.user.lastName : "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "",
    serviceType: "",
    roofMaterial: "",
    description: "",
    photo: "",
  });

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const fileInputRef = useRef();

  const stateOptions = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const propertyTypeOptions = ["Commercial", "Residential", "Other"];
  const serviceTypeOptions = [
    "Repair",
    "Replace",
    "New Roof",
    "Maintenance",
    "Other",
  ];
  const roofMaterialOptions = [
    "Shingles",
    "Metal",
    "Tile",
    "Flat",
    "Other",
    "Not Sure",
  ];

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format xxx-xxx-xxxx.";
    }
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode || formData.zipCode.length !== 5) {
      newErrors.zipCode = "Zip code must be exactly 5 digits.";
    }
    if (!formData.propertyType)
      newErrors.propertyType = "Property type is required.";
    if (!formData.serviceType)
      newErrors.serviceType = "Service type is required.";
    if (!formData.roofMaterial)
      newErrors.roofMaterial = "Roof material is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrors({ ...errors, [evt.target.name]: null });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) {
      try {
        const formData2 = new FormData();
        formData2.append("firstName", formData.firstName);
        formData2.append("lastName", formData.lastName);
        formData2.append("phone", formData.phone);
        formData2.append("address", formData.address);
        formData2.append("city", formData.city);
        formData2.append("state", formData.state);
        formData2.append("zipCode", formData.zipCode);
        formData2.append("propertyType", formData.propertyType);
        formData2.append("serviceType", formData.serviceType);
        formData2.append("roofMaterial", formData.roofMaterial);
        formData2.append("description", formData.description);
        // 'image' will be the name we use to access the file on the server
        if (fileInputRef.current.files.length)
          formData2.append("photo", fileInputRef.current.files[0]);
        props.handleAddQuote(formData2);
        setFormData({
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          propertyType: "",
          serviceType: "",
          roofMaterial: "",
          description: "",
          photo: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Request a Quote{props.user ? `, ${props.user.firstName}` : ""}!</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* First Name & Last Name */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* Phone */}
        <div className={styles.inputGroup}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="xxx-xxx-xxxx"
            className={styles.input}
          />
        </div>

        {/* Address */}
        <div className={styles.inputGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* City, State, Zip */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={styles.stateInput}
            >
              <option value="">-- Select State --</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              maxLength="5"
              className={styles.input}
            />
          </div>
        </div>

        {/* Property Type, Service Type, Roof Material */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Property Type:</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">-- Property Type --</option>
              {propertyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Service Type:</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">-- Service Type --</option>
              {serviceTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Roof Material:</label>
            <select
              name="roofMaterial"
              value={formData.roofMaterial}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">-- Roof Material --</option>
              {roofMaterialOptions.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className={styles.inputGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>

        {/* Image File */}
        <div className={styles.inputGroup}>
          <label>Image File:</label>
          <input
            type="file"
            accept=".png, .gif, .jpg, .jpeg"
            ref={fileInputRef}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
