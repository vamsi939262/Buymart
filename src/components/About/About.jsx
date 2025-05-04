import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <Container className={styles.aboutContainer}>
      <Typography variant="h2" className={styles.heading}>
        Welcome to BuyMart
      </Typography>

      <Box className={styles.content}>
        <Typography variant="h5" className={styles.subHeading}>
          Your one-stop destination for online shopping
        </Typography>

        {/* Point-wise content */}
        <Box className={styles.pointsList}>
          <Typography variant="body1" className={styles.point}>
            ✅ A wide range of products including groceries, electronics, fashion, toys, and more.
          </Typography>
          <Typography variant="body1" className={styles.point}>
            ✅ Quality products at unbeatable prices, ensuring maximum value for your money.
          </Typography>
          <Typography variant="body1" className={styles.point}>
            ✅ Hassle-free returns and excellent customer service to guarantee a smooth shopping experience.
          </Typography>
          <Typography variant="body1" className={styles.point}>
            ✅ Secure and easy payment options for your convenience.
          </Typography>
          <Typography variant="body1" className={styles.point}>
            ✅ Our mission is to make shopping easier, quicker, and more affordable for customers worldwide.
          </Typography>
        </Box>

        {/* Button linking to Home page */}
        <Link to="/" className={styles.buttonLink}>
          <Button className={styles.button} variant="contained">
            Shop Now
          </Button>
        </Link>
      </Box>

      
    </Container>
  );
};

export default About;
