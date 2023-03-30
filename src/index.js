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

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <select className="form-control" id="age" value={age} onChange={handleAgeChange}>
            <option value="">Select Age</option>
            {[...Array(82)].map((_, i) => (
              <option key={i} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sex:</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sex" value="male" checked={sex === "male"} onChange={handleSexChange} />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sex" value="female" checked={sex === "female"} onChange={handleSexChange} />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Start
        </button>
      </form>
    </div>
  );
}

export default App;
