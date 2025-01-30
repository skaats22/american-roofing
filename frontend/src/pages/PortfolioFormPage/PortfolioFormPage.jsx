import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as jobService from "../../services/jobService";
import styles from "./PortfolioFormPage.module.css";

export default function JobForm(props) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    propertyType: "",
    serviceType: "",
    roofMaterial: "",
    projectPrice: "",
    description: "",
    photo: "",
    displayInGallery: false,
    owner: "",
  });

  const [errors, setErrors] = useState({});

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
  const roofMaterialOptions = ["Shingles", "Metal", "Tile", "Flat", "Other"];

  useEffect(() => {
    async function fetchJob() {
      const jobData = await jobService.show(jobId);
      setFormData((prevData) => ({
        ...prevData,
        title: jobData.title,
        address: jobData.address,
        city: jobData.city,
        state: jobData.state,
        propertyType: jobData.propertyType,
        serviceType: jobData.serviceType,
        roofMaterial: jobData.roofMaterial,
        projectPrice: jobData.projectPrice,
        description: jobData.description,
        photo: jobData.photo,
        displayInGallery: false,
        owner: jobData.owner,
      }));
    }

    if (jobId) fetchJob();
  }, [jobId]);

  const validate = () => {
    const newErrors = {};
    // Validation for required fields
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.propertyType)
      newErrors.propertyType = "Property type is required.";
    if (!formData.serviceType)
      newErrors.serviceType = "Service type is required.";
    if (!formData.roofMaterial)
      newErrors.roofMaterial = "Roof material is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (formData.displayInGallery === undefined)
      newErrors.displayInGallery = "Display in gallery must be selected.";
    // if (!formData.owner) newErrors.owner = "Owner is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    const { name, value, type, checked } = evt.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (validate()) {
      let fileInput = formData.photo;
      try {
        const formData2 = new FormData();
        formData2.append("title", formData.title);
        formData2.append("address", formData.address);
        formData2.append("city", formData.city);
        formData2.append("state", formData.state);
        formData2.append("zipCode", formData.zipCode);
        formData2.append("propertyType", formData.propertyType);
        formData2.append("serviceType", formData.serviceType);
        formData2.append("roofMaterial", formData.roofMaterial);
        formData2.append("projectType", formData.projectType);
        formData2.append("projectPrice", formData.projectPrice);
        formData2.append("description", formData.description);
        formData2.append("displayInGallery", formData.displayInGallery);
        if (fileInputRef.current.files.length) {
          formData2.append("photo", fileInputRef.current.files[0]);
          fileInput = fileInputRef.current.files[0];
        }
        if (jobId) {
          await props.handleUpdateJob(jobId, formData);
        } else {
          await props.handleAddJob(formData2);
        }
        setFormData({
          title: "",
          address: "",
          city: "",
          state: "",
          propertyType: "",
          serviceType: "",
          roofMaterial: "",
          projectLength: "",
          projectPrice: "",
          description: "",
          photo: "",
          displayInGallery: false,
          owner: "",
        });
        navigate("/jobs");
      } catch (error) {
        console.error("Error submitting job:", error);
        alert("Error submitting the job. Please try again.");
      }
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>{jobId ? `Edit ${formData.title}` : "New Job"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className={styles.errorText}>{errors.city}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>State:</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">-- Select State --</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className={styles.errorText}>{errors.state}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Property Type:</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Property Type --</option>
            {propertyTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className={styles.errorText}>{errors.propertyType}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Service Type:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Service Type --</option>
            {serviceTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className={styles.errorText}>{errors.serviceType}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Roof Material:</label>
          <select
            name="roofMaterial"
            value={formData.roofMaterial}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Roof Material --</option>
            {roofMaterialOptions.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
          {errors.roofMaterial && (
            <p className={styles.errorText}>{errors.roofMaterial}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Project Price:</label>
          <input
            type="text"
            name="projectPrice"
            value={formData.projectPrice}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <p className={styles.errorText}>{errors.description}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Image File</label>
          <input
            type="file"
            accept=".png, .gif, .jpg, .jpeg"
            name="photo"
            ref={fileInputRef}
          />
          {errors.photo && <p className={styles.errorText}>{errors.photo}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Display in Gallery:</label>
          <input
            type="checkbox"
            name="displayInGallery"
            value="checked"
            checked={formData.displayInGallery}
            onChange={(evt) => {
              setFormData({
                ...formData,
                displayInGallery: evt.target.checked,
              });
            }}
          />
          {errors.displayInGallery && (
            <p className={styles.errorText}>{errors.displayInGallery}</p>
          )}
        </div>
        {!jobId ? (
          <button type="submit" className={styles.submitButton}>
            Submit New Job
          </button>
        ) : (
          <button type="submit" className={styles.submitButton}>
            Update Job
          </button>
        )}

        <Link to="/jobs">
          <button className={styles.cancelButton}>Cancel</button>
        </Link>
      </form>
    </div>
  );
}
