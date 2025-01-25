import { useState } from "react";

export default function QuoteForm(props) {
  const [formData, setFormData] = useState({
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
    // If no keys in the newError object, then validate() = true
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });

    // Remove error message on change
    setErrors({ ...errors, [evt.target.name]: null });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) {
      props.handleAddQuote(formData);
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
    }
  };

  return (
    <>
      <h1>Request a quote{props.user ? `, ${props.user.firstName}` : ""}!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="xxx-xxx-xxxx"
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>
        <div>
          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange}>
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
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            maxLength="5"
          />
          {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
        </div>
        <div>
          <label>Property Type:</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
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
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>
        <div>
          <label>Photo URL (optional):</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
