import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function JobForm(props) {
  const [formData, setFormData] = useState({
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
    owner: props.user,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  ];

  const propertyTypeOptions = ["Commercial", "Residential", "Other"];
  const serviceTypeOptions = ["Repair", "Replace", "New Roof", "Maintenance", "Other"];
  const roofMaterialOptions = ["Shingles", "Metal", "Tile", "Flat", "Other"];

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required.";
    if (!formData.serviceType) newErrors.serviceType = "Service type is required.";
    if (!formData.roofMaterial) newErrors.roofMaterial = "Roof material is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.photo) newErrors.photo = "Photo URL is required.";
    if (formData.displayInGallery === undefined) newErrors.displayInGallery = "Display in gallery must be selected.";
    if (!formData.owner) newErrors.owner = "Owner is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (validate()) {
      try {
        await props.handleAddJob(formData);
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
        navigate("/jobs");  // Navigate to the jobs page after successful submission
      } catch (error) {
        console.error("Error submitting job:", error);
        alert("Error submitting the job. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Submit a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>

        <div>
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
          {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
        </div>

        <div>
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
            <p style={{ color: "red" }}>{errors.propertyType}</p>
          )}
        </div>

        <div>
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
            <p style={{ color: "red" }}>{errors.serviceType}</p>
          )}
        </div>

        <div>
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
            <p style={{ color: "red" }}>{errors.roofMaterial}</p>
          )}
        </div>

        <div>
          <label>Project Length:</label>
          <input
            type="text"
            name="projectLength"
            value={formData.projectLength}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Project Price:</label>
          <input
            type="text"
            name="projectPrice"
            value={formData.projectPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>

        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
          {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
        </div>

        <div>
          <label>Display in Gallery:</label>
          <input
            type="checkbox"
            name="displayInGallery"
            checked={formData.displayInGallery}
            onChange={handleChange}
            required
          />
          {errors.displayInGallery && (
            <p style={{ color: "red" }}>{errors.displayInGallery}</p>
          )}
        </div>

        <button type="submit">Submit Job</button>
      </form>
    </div>
  );
}
