import React, { useState } from "react";
import "./styles.css";
import Geo from "geoip-lite";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    city: "",
  });
  const [cityList, setCityList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const getLocation = async () => {
    const ip = await axios.get("https://api.ipify.org?format=json").then(res => res.data.ip);
    const location = Geo.lookup(ip);
    if (location) {
      const { city } = location;
      if (city) {
        setFormData({ ...formData, city });
        getCityList(location.country);
      }
    }
  };

  const getCityList = async (country) => {
    const response = await axios.get(
      `https://geo.api.gouv.fr/communes?fields=nom&limit=1000&country=${country}`
    );
    const cities = response.data.map((city) => city.nom);
    setCityList(cities);
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sex:
          <br />
          <label>
            Male
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === "male"}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Female
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === "female"}
              onChange={handleChange}
              required
            />
          </label>
        </label>
        <br />
        <label>
          City:
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select a city</option>
            {cityList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={getLocation}>Get Location</button>
    </div>
  );
}
