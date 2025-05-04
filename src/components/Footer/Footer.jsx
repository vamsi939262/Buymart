import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <span>BUYMART</span>
        </div>

        <nav className={styles.footerNav}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </nav>

        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} BUYMART. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
