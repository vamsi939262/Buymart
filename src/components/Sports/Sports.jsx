import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Rating,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import styles from './Sports.module.css'; // Make sure this CSS module exists and matches class names used below

const sportsProducts = [
  {
    id: 1,
    name: 'Running Shoes - Men',
    image: 'https://i.pinimg.com/474x/a7/51/e5/a751e57f89884241885cbf7a18ee4078.jpg',
    price: 3499,
    rating: 4.7,
    ratingCount: 420,
    discount: 30,
  },
  {
    id: 2,
    name: 'Yoga Mat - Premium',
    image: 'https://i.pinimg.com/474x/d0/fb/9a/d0fb9a86ce516eecdb209e588f31b740.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 180,
    discount: 25,
  },
  {
    id: 3,
    name: 'Wireless Sports Headphones',
    image: 'https://i.pinimg.com/474x/61/1a/d4/611ad494ef9e71dff6a45462ee55cef0.jpg',
    price: 2499,
    rating: 4.3,
    ratingCount: 310,
    discount: 20,
  },
  {
    id: 4,
    name: 'Fitness Tracker Smartwatch',
    image: 'https://i.pinimg.com/736x/15/b5/d1/15b5d17d9ef37c4ce1464747aa65580b.jpg',
    price: 3999,
    rating: 4.6,
    ratingCount: 290,
    discount: 35,
  },
  {
    id: 5,
    name: 'Dumbbell Set - 10kg',
    image: 'https://i.pinimg.com/736x/ed/16/12/ed16127406b30a5d21a36ebabb27dc79.jpg',
    price: 1799,
    rating: 4.4,
    ratingCount: 150,
    discount: 15,
  },
  {
    id: 6,
    name: 'Cycling Helmet',
    image: 'https://i.pinimg.com/474x/b3/86/55/b386550ca94a79b391d178f9b9b8c5a4.jpg',
    price: 1599,
    rating: 4.8,
    ratingCount: 230,
    discount: 40,
  },
  {
    id: 7,
    name: 'Resistance Bands Set',
    image: 'https://i.pinimg.com/736x/0d/e2/fe/0de2fe9eb90aab0d7ab98efabc73b324.jpg',
    price: 899,
    rating: 4.2,
    ratingCount: 190,
    discount: 20,
  },
  {
    id: 8,
    name: 'Sports Water Bottle',
    image: 'https://i.pinimg.com/474x/7c/2e/ec/7c2eecb46ff00ad985a5c1681987c129.jpg',
    price: 499,
    rating: 4.6,
    ratingCount: 270,
    discount: 10,
  },
  {
    id: 9,
    name: 'Football - Size 5',
    image: 'https://i.pinimg.com/474x/19/bd/e1/19bde1bd25fe16d2f972cbba185ac0ae.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 140,
    discount: 25,
  },
  {
    id: 10,
    name: 'Badminton Racket - Pro',
    image: 'https://i.pinimg.com/474x/c6/78/3a/c6783a99b27ac9a8ae498e70c405d717.jpg',
    price: 1999,
    rating: 4.7,
    ratingCount: 210,
    discount: 30,
  },
  {
    id: 11,
    name: 'Gym Gloves',
    image: 'https://i.pinimg.com/736x/d4/6f/47/d46f479551188256f1c11be8ebcaab93.jpg',
    price: 599,
    rating: 4.3,
    ratingCount: 180,
    discount: 15,
  },
  {
    id: 12,
    name: 'Jump Rope - Speed',
    image: 'https://i.pinimg.com/736x/a5/2c/01/a52c01cc5d2e750d6fa47e0eca711b3f.jpg',
    price: 399,
    rating: 4.4,
    ratingCount: 120,
    discount: 10,
  },
  {
    id: 13,
    name: 'Yoga Block Set',
    image: 'https://i.pinimg.com/474x/88/d9/a1/88d9a1619a02373d97cd3ff17240e7da.jpg',
    price: 699,
    rating: 4.6,
    ratingCount: 90,
    discount: 20,
  },
  {
    id: 14,
    name: 'Treadmill - Foldable',
    image: 'https://i.pinimg.com/474x/1c/9e/8f/1c9e8f11c07415480f77c58e84c31753.jpg',
    price: 24999,
    rating: 4.8,
    ratingCount: 150,
    discount: 40,
  },
  {
    id: 15,
    name: 'Sports Sunglasses',
    image: 'https://i.pinimg.com/474x/57/0c/4e/570c4e9cb41fc888adbc6d17cfc4869c.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 210,
    discount: 25,
  },
  {
    id: 16,
    name: 'Foam Roller',
    image: 'https://i.pinimg.com/474x/72/0b/57/720b57604407a93dad1005571f492794.jpg',
    price: 899,
    rating: 4.4,
    ratingCount: 130,
    discount: 15,
  },
  {
    id: 17,
    name: 'Basketball - Official Size',
    image: 'https://i.pinimg.com/736x/21/cd/45/21cd451bae3d60eb875ee903ca6c41a1.jpg',
    price: 1499,
    rating: 4.7,
    ratingCount: 110,
    discount: 20,
  },
  {
    id: 18,
    name: 'Sports Backpack',
    image: 'https://i.pinimg.com/736x/44/93/96/44939623956f7e83b821ee851005e38a.jpg',
    price: 1799,
    rating: 4.6,
    ratingCount: 190,
    discount: 30,
  },
  {
    id: 19,
    name: 'Swimming Goggles',
    image: 'https://i.pinimg.com/736x/1a/99/8f/1a998f6bc0368a489103ed429d6a1244.jpg',
    price: 799,
    rating: 4.3,
    ratingCount: 160,
    discount: 10,
  },
  {
    id: 20,
    name: 'Exercise Bike',
    image: 'https://i.pinimg.com/736x/06/1a/e1/061ae1bbd86b7bed50dc63b64b8bc276.jpg',
    price: 18999,
    rating: 4.9,
    ratingCount: 210,
    discount: 45,
  }
];

const Sports = () => {
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = [...sportsProducts].sort((a, b) => {
    if (sortOption === 'priceLowHigh') return a.price - b.price;
    if (sortOption === 'priceHighLow') return b.price - a.price;
    if (sortOption === 'ratingHighLow') return b.rating - a.rating;
    return 0;
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h3" className={styles.pageTitle}>
        🏋️‍♂️ Discover Trending Sports & Fitness Gear 🏃‍♀️
    </Typography>

      <div className={styles.sortBar}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
            <MenuItem value="ratingHighLow">Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.grid}>
        {sortedProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <span className={styles.discountBadge}>-{product.discount}%</span>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.content}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.price}>₹{product.price}</div>
              <Rating value={product.rating} precision={0.1} readOnly />
              <div className={styles.reviews}>{product.ratingCount} reviews</div>
              <Button
                className={styles.button}
                variant="contained"
                component={Link}
                to={`/sports/${product.id}`}
                fullWidth
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;