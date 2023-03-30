import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("18");
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

  return (
    <div className="App">
      <h1>Sign Ups</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <select value={age} onChange={handleAgeChange}>
            {Array.from({ length: 82 }, (_, i) => 18 + i).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Sex:
          <input type="radio" value="male" checked={sex === "male"} onChange={handleSexChange} />
          male
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
