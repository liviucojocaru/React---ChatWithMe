import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const countryData = await axios.get("https://ipgeolocation.abstractapi.com/v1/?api_key=API_KEY");
    const country = countryData.data.country;

    await axios.post("/api/users", {
      name,
      age,
      sex,
      country,
    });

    setName("");
    setAge("");
    setSex("");
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <label>
          Age:
          <select value={age} onChange={handleAgeChange} required>
            <option value="" disabled>Select your age</option>
            {[...Array(82)].map((x, i) => (
              <option key={i} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Sex:
          <input type="radio" value="male" checked={sex === "male"} onChange={handleSexChange} />
          Male
          <input type="radio" value="female" checked={sex === "female"} onChange={handleSexChange} />
          Female
        </label>
        <br />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default App;
