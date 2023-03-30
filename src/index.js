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

    const locationData = await axios.get("/api/location");
    const country = locationData.data.location;

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

  const ageOptions = [];
  for (let i = 18; i <= 99; i++) {
    ageOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <select value={age} onChange={handleAgeChange}>
            <option value="">Select Age</option>
            {ageOptions}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;
