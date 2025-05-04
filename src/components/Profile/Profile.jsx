import React, { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.css';
import { FaUserEdit, FaSignOutAlt, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', photo: '' });
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ name: '', email: '', photo: '' });
  const fileInputRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'Your Name',
      email: 'youremail@example.com',
      photo: '',
    };
    setUser(storedUser);
    setTempUser(storedUser);
  }, []);

  const handleEditToggle = () => setEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleImageClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempUser({ ...tempUser, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(tempUser);
    localStorage.setItem('user', JSON.stringify(tempUser));
    setEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage} onClick={handleImageClick}>
          <img
            src={
              tempUser.photo ||
              'https://api.dicebear.com/7.x/avataaars/svg?seed=profile'
            }
            alt="Profile"
          />
          {editing && <div className={styles.overlay}>Change</div>}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </div>

        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            name="name"
            value={tempUser.name}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            name="email"
            value={tempUser.email}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>

        <div className={styles.buttons}>
          {!editing ? (
            <>
              <button onClick={handleEditToggle} className={styles.edit}>
                <FaUserEdit /> Edit
              </button>
              <button onClick={handleLogout} className={styles.logout}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className={styles.save}>
                <FaSave /> Save
              </button>
              <button onClick={handleCancel} className={styles.cancel}>
                <FaTimes /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
