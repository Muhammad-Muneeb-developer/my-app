import React, { useState } from 'react';
import './DeviceLink.css';
import Deviceimg from './Device-Controller.png';
import List from './list.json';

const DeviceLink = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState(List);
  const [editIndex, setEditIndex] = useState(null);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (index) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
  };

  const handleEdit = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };

  const handleShowOnline = () => {
    setShowOnlineOnly(!showOnlineOnly);
  };

  const filteredList = devices.filter((item) => {
    const matchesSearchTerm =
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Nike_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Mac.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm && (!showOnlineOnly || item.isOnline);
  });

  return (
    <>
      <div className='main-div'>
        <div className='nav-bar-Device'>
          <img src={Deviceimg} alt="Device Controller" />
          <h1>Device Link</h1>
          <div className='search-container'>
            <input type="text" placeholder="Search..." onChange={handleSearch} />
          </div>
          <button className='online-button' onClick={handleShowOnline}>
            {showOnlineOnly ? 'Show All Devices' : 'Show Online Devices'}
          </button>
        </div>
      </div>
      <div className='main-card-div'>
        {filteredList.map((list, index) => (
          <div className={`small-card ${editIndex === index ? 'edit-mode' : ''}`} key={index}>
            <div className='circle'>
              {list.Name.charAt(0)}
              {list.isOnline && <span className='online-indicator'></span>}
            </div>
            <div className='name'>
              {list.Name}
            </div>
            <div className='nik-name'>
              {list.Nike_name}
              <button className='edit-button' onClick={() => handleEdit(index)}>Edit</button>
            </div>
            <div className='mac'>
              {list.Mac}
            </div>
            <button className='delete-button' onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeviceLink;
