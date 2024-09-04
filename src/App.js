import React, { useState } from 'react';
import './App.css';
import BiodataPreview from './BiodataPreview';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    mobile: '',
    birthLocation: '',
  });
  const [photo, setPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className="App">
      {!showPreview ? (
        <header className="App-header">
          <h1>Biodata Form</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="birthLocation"
              placeholder="Birth Location"
              value={formData.birthLocation}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
            <button type="submit">Preview Biodata</button>
          </form>
        </header>
      ) : (
        <BiodataPreview formData={formData} photo={photo} />
      )}
    </div>
  );
}

export default App;
