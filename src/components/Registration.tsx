import React, { useState } from "react";
import "./regis.css";
import { Console } from "console";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    shippingAddress: {
      name: "",
      country: "",
      city: "",
      street: "",
      zip: "",
      phoneNumber: "",
    },
    billingAddress: {
      name: "",
      country: "",
      city: "",
      street: "",
      zip: "",
      taxNumber: "",
    },
    
  });

  const  [sameAddress , setsameAddress] = useState(false);

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      shippingAddress: {
        name: "",
        country: "",
        city: "",
        street: "",
        zip: "",
        phoneNumber: "",
      },
      billingAddress: {
        name: "",
        country: "",
        city: "",
        street: "",
        zip: "",
        taxNumber: "",
      },
    });
    
  };

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, dataset } = e.target;
    const addressType = dataset.addressType;

    switch (addressType) {
      case "shippingAddress":
      case "billingAddress":
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
    console.log(formData);

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
      <form
        className="registration-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="basic-info">
          <label htmlFor="username">Felhasználónév:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            //pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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

          <label htmlFor="passwordConfirm">Jelszó megerősítése:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <label htmlFor="lastName">Vezetéknév</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="firstName">Keresztnév</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
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
            name="taxNumber"
            data-address-type="billingAddress"
            value={formData.billingAddress.taxNumber}
            onChange={handleChange}
          />
        </div>

        <label>
          <input
            type="checkbox"
            name="sameAddress"
            checked={sameAddress}
            onChange={handleChange}
          />
          A számlázási cím megegyezik a szállítási címmel
        </label>

        {!sameAddress && (
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
