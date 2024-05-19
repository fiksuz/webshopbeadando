import React, { useState } from "react";
import "./regis.css";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    lastname: "",
    firstname: "",
    billingAddress: {
      name: "",
      country: "",
      city: "",
      street: "",
      zip: "",
      phoneNumber: "",
    },
    shippingAddress: {
      name: "",
      country: "",
      city: "",
      street: "",
      zip: "",
      phoneNumber: "",
    },
    sameAddress: false,
  });
  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      lastname: "",
      firstname: "",
      billingAddress: {
        name: "",
        country: "",
        city: "",
        street: "",
        zip: "",
        phoneNumber: "",
      },
      shippingAddress: {
        name: "",
        country: "",
        city: "",
        street: "",
        zip: "",
        phoneNumber: "",
      },
      sameAddress: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, dataset } = e.target;
    const addressType = dataset.addressType;

    switch (addressType) {
      case "billingAddress":
      case "shippingAddress":
        setFormData((prevState) => ({
          ...prevState,
          [addressType]: {
            ...prevState[addressType],
            [name]: value,
          },
        }));
        break;
      default:
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Sikeres regisztráció!");
      } else {
        const errorData = await response.json();
        switch (response.status) {
          case 400:
            alert(errorData.message || "A bevitt adatok érvénytelenek.");
            break;
          case 409:
            alert(errorData.message || "A felhasználó már létezik.");
            break;
          default:
            alert(errorData.message || "Ismeretlen hiba történt.");
            break;
        }
      }
    } catch (error) {
      console.error("Hiba történt:", error);
      alert("Hiba történt a regisztráció során.");
    }
  };

  return (
    <div className="registration-container">
    <h2>Regisztráció</h2>
    <form className="registration-form" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="basic-info">
        <label htmlFor="username">Felhasználónév:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          autoComplete="username"
        />
  
        <label htmlFor="password">Jelszó:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
  
        <label htmlFor="confirmPassword">Jelszó megerősítése:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
  
        <label htmlFor="lastname">Vezetéknév</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="firstname">Keresztnév</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="billing-info">
        <h3>Számlázási cím</h3>
        <label htmlFor="billingName">Név:</label>
        <input
          type="text"
          name="name"
          data-address-type="billingAddress"
          value={formData.billingAddress.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="billingCountry">Ország:</label>
        <input
          type="text"
          name="country"
          data-address-type="billingAddress"
          value={formData.billingAddress.country}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="billingCity">Város:</label>
        <input
          type="text"
          name="city"
          data-address-type="billingAddress"
          value={formData.billingAddress.city}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="billingStreet">Utca:</label>
        <input
          type="text"
          name="street"
          data-address-type="billingAddress"
          value={formData.billingAddress.street}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="billingZip">Irányítószám:</label>
        <input
          type="text"
          name="zip"
          data-address-type="billingAddress"
          value={formData.billingAddress.zip}
          onChange={handleChange}
          required
        />
  
        <label htmlFor="billingPhoneNumber">Telefonszám:</label>
        <input
          type="text"
          name="phoneNumber"
          data-address-type="billingAddress"
          value={formData.billingAddress.phoneNumber}
          onChange={handleChange}
        />
      </div>
  
      <label>
        <input
          type="checkbox"
          name="sameAddress"
          checked={formData.sameAddress}
          onChange={handleChange}
        />
        A számlázási cím megegyezik a szállítási címmel
      </label>
  
      {!formData.sameAddress && (
        <div className="shipping-info">
          <h3>Szállítási cím</h3>
          <label htmlFor="shippingName">Név:</label>
          <input
            type="text"
            name="name"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.name}
            onChange={handleChange}
          />
          <label htmlFor="shippingCountry">Ország:</label>
          <input
            type="text"
            name="country"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.country}
            onChange={handleChange}
          />
          <label htmlFor="shippingCity">Város:</label>
          <input
            type="text"
            name="city"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.city}
            onChange={handleChange}
          />
          <label htmlFor="shippingStreet">Utca:</label>
          <input
            type="text"
            name="street"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.street}
            onChange={handleChange}
          />
          <label htmlFor="shippingZip">Irányítószám:</label>
          <input
            type="text"
            name="zip"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.zip}
            onChange={handleChange}
          />
          <label htmlFor="shippingPhoneNumber">Telefonszám:</label>
          <input
            type="text"
            name="phoneNumber"
            data-address-type="shippingAddress"
            value={formData.shippingAddress.phoneNumber}
            onChange={handleChange}
          />
        </div>
      )}
  
      <div className="buttons">
        <button type="submit">Regisztráció</button>
        <button type="reset">Mégsem</button>
      </div>
    </form>
  </div>
  
  );
};

export default RegistrationForm;
