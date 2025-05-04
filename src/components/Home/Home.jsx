import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography
} from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Home.module.css';
import { motion } from 'framer-motion';

// Slider Images
const sliderImages = [
  "https://i.pinimg.com/1200x/72/e0/ad/72e0ad3de8223c4f98bc9196535c5cb4.jpg",
  "https://i.pinimg.com/1200x/ca/42/41/ca42412b0f642b9cf95f35e806a2d190.jpg",
  "https://i.pinimg.com/1200x/49/39/f8/4939f804a4baedf87da725dbe5cc2e96.jpg",
  "https://i.pinimg.com/1200x/2c/1c/4c/2c1c4ca3758a59236fbbaa8ff3de0d68.jpg"
];

// Categories
const categories = [
  { name: "Electronics", image: "https://i.pinimg.com/736x/e1/22/34/e122343ac7ddb125851689e1fb05cc4a.jpg", path: "/electronics" },
  { name: "Fashion", image: "https://i.pinimg.com/474x/7d/90/a3/7d90a3b7e61031af72f310337b669f1f.jpg", path: "/fashion" },
  { name: "Home Decor", image: "https://i.pinimg.com/474x/d6/eb/f2/d6ebf261a2fb51fb33df19962cea3f91.jpg", path: "/home-decor" },
  { name: "Stationery", image: "https://i.pinimg.com/736x/7f/d5/f7/7fd5f7827113be84f292ae191d3d619c.jpg", path: "/books" },
  { name: "Sports & Fitness", image: "https://i.pinimg.com/736x/c5/42/a9/c542a9719a3da15a7b4019c647194f12.jpg", path: "/sports" },
  { name: "Toys & Games", image: "https://i.pinimg.com/736x/49/b0/7b/49b07b74c115a24fde2df3ce822d1d74.jpg", path: "/toys" },
  { name: "Groceries", image: "https://i.pinimg.com/474x/b3/70/1a/b3701a7eb4c87e9958e537bef9f56761.jpg", path: "/groceries" }
];

// Deals of the Day
const deals = [
  {
    title: "Wireless Earbuds",
    price: "₹999",
    image: "https://i.pinimg.com/474x/8d/6d/f8/8d6df8d9ffe7036181c420711ae7fc5f.jpg",
    path: "/electronics"
  },
  {
    title: "Stylish Sneakers",
    price: "₹1,499",
    image: "https://i.pinimg.com/736x/ef/2f/28/ef2f28afdb59afe60293a1dc8e523eba.jpg",
    path: "/fashion"
  },
  {
    title: "Wall Lamp",
    price: "₹799",
    image: "https://i.pinimg.com/474x/c9/6e/1e/c96e1e00e0e960355cad47896926a203.jpg",
    path: "/home-decor"
  },
  {
    title: "Tecno",
    price: "₹9,999",
    image: "https://i.pinimg.com/474x/56/6d/36/566d3699d08fe22c2c8be8db234639b0.jpg",
    path: "/electronics"
  },
  {
    title: "Dumbbell Set",
    price: "₹1,299",
    image: "https://i.pinimg.com/736x/6d/8c/88/6d8c881b6f3b2e7ee37c50c674ef8408.jpg",
    path: "/sports"
  },
  {
    title: "Coloring Books",
    price: "₹299",
    image: "https://i.pinimg.com/474x/b0/e7/8c/b0e78c506b89b86f8e4faa7c587dcfb8.jpg",
    path: "/books"
  }
];

// Top Rated Products
const topRated = [
  {
    title: "Noise Smart Watch",
    price: "₹1,999",
    image: "https://i.pinimg.com/474x/df/7b/26/df7b26d5b7a14584d165717a4c3699f6.jpg",
    path: "/electronics"
  },
  {
    title: "Leather Wallet",
    price: "₹799",
    image: "https://i.pinimg.com/474x/52/3f/5b/523f5beea9e505a2f8c2cb3a125da6c3.jpg",
    path: "/fashion"
  },
  {
    title: "LED Mirror Light",
    price: "₹1,299",
    image: "https://i.pinimg.com/474x/c2/22/dd/c222dd3b4b6647a735aa7ce716fb5b43.jpg",
    path: "/home-decor"
  },
  {
    title: "Leather Jacket",
    price: "₹3,499",
    image: "https://i.pinimg.com/474x/55/79/23/5579230ce841fa6d33826078aac964b6.jpg",
    path: "/fashion"
  },
  {
    title: "Skateboard",
    price: "₹2,399",
    image: "https://i.pinimg.com/474x/02/82/d3/0282d362946b15ae25cfbd1ed962cf87.jpg",
    path: "/sports"
  },
  {
    title: "Paint Set",
    price: "₹499",
    image: "https://i.pinimg.com/736x/c7/71/43/c7714365944cc9e3e9c5be0265fa8ef9.jpg",
    path: "/books"
  }
];

// Recently Viewed
const recentlyViewed = [
  {
    title: "Headphones",
    price: "₹499",
    image: "https://i.pinimg.com/474x/c7/7c/cf/c77ccfe95ac7e2d9cb2aded75f1581d8.jpg",
    path: "/electronics"
  },
  {
    title: "Running Shoes",
    price: "₹1,199",
    image: "https://i.pinimg.com/474x/5f/31/ab/5f31ab666b03fee0ebe75b665ed8b554.jpg",
    path: "/fashion"
  },
  {
    title: "Wooden Wall Art",
    price: "₹2,999",
    image: "https://i.pinimg.com/474x/29/31/6e/29316eb8db6e4345305c6c8f4d7ab800.jpg",
    path: "/home-decor"
  },
  {
    title: "Iphone 16 Pro",
    price: "₹99,000",
    image: "https://i.pinimg.com/474x/a3/54/11/a35411e27d7197d56df29601855adb35.jpg",
    path: "/electronics"
  },
  {
    title: "Resistance Bands",
    price: "₹899",
    image: "https://i.pinimg.com/474x/14/bd/e1/14bde180d83e3d324e5c4817490d470b.jpg",
    path: "/sports"
  },
  {
    title: "Color Pencils",
    price: "₹250",
    image: "https://i.pinimg.com/474x/c4/2a/85/c42a8560faa2ab4546809f9c58068dd6.jpg",
    path: "/books"
  }
];

// Trending Now
const trending = [
  {
    title: "Speaker",
    price: "₹1,599",
    image: "https://i.pinimg.com/474x/02/2c/c7/022cc73c2fdeb0dbf1a46d798d51073e.jpg",
    path: "/electronics"
  },
  {
    title: "Sling Bag",
    price: "₹899",
    image: "https://i.pinimg.com/474x/1e/1d/56/1e1d565239da009fcbf963f89b109cab.jpg",
    path: "/fashion"
  },
  {
    title: "Table Lamp",
    price: "₹1,099",
    image: "https://i.pinimg.com/474x/d1/c2/cd/d1c2cd75bac7e344c86bdc0b072db0b3.jpg",
    path: "/home-decor"
  },
  {
    title: "Yoga Mat",
    price: "₹749",
    image: "https://i.pinimg.com/474x/e8/15/8c/e8158c57657ce3aa426c4725874c831c.jpg",
    path: "/sports"
  },
  {
    title: "Men Gift Hamper",
    price: "₹1,099",
    image: "https://i.pinimg.com/736x/ff/f7/e0/fff7e018fa56990a7bc03a362f66204d.jpg",
    path: "/fashion"
  },
  {
    title: "Board Game",
    price: "₹349",
    image: "https://i.pinimg.com/474x/8e/e3/91/8ee39126d82afcef589116cd5578b204.jpg",
    path: "/toys"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Authentication check
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Render product grid function
  const renderProductGrid = (title, products) => (
    <motion.section className={styles.dealsSection}>
      <Typography variant="h4" className={styles.dealsTitle}>{title}</Typography>
      <Grid container spacing={2}>
        {products.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <motion.div
              className={styles.dealCard}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body1" color="primary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.section>
  );

  // Prevent rendering if no user
  if (!user) return null;

  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        {/* Slider Section */}
        <Box className={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {sliderImages.map((img, index) => (
              <div key={index} className={styles.slide}>
                <motion.div
                  className={styles.slideContent}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardMedia
                    component="img"
                    alt={`Slide ${index + 1}`}
                    height="400"
                    image={img}
                  />
                </motion.div>
              </div>
            ))}
          </Slider>
        </Box>

        {/* Deals of the Day */}
        {renderProductGrid("Deals of the Day", deals)}

        {/* Categories Section */}
        <motion.section className={styles.categories}>
          <Typography variant="h4" className={styles.categoriesTitle}>
            Explore Our Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  className={styles.categoryCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.8 }}
                >
                  <Link to={category.path} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={category.image}
                        alt={category.name}
                      />
                      <CardContent>
                        <Typography variant="h6" color="textPrimary">
                          {category.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.section>

        {/* Additional Product Sections */}
        {renderProductGrid("Top Rated Products", topRated)}
        {renderProductGrid("Recently Viewed", recentlyViewed)}
        {renderProductGrid("Trending Now", trending)}
      </Container>
    </div>
  );
};

export default Home;