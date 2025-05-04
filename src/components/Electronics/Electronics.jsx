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
import styles from './Electronics.module.css';

const electronicsProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S23 Ultra',
    image: 'https://i.pinimg.com/474x/5b/d8/93/5bd893c5ec4277bc4cff54fbb3e79afb.jpg',
    price: 111099,
    rating: 4.8,
    ratingCount: 250,
    description: 'The latest flagship from Samsung with a powerful camera and S Pen.',
    discount: 10,
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    image: 'https://i.pinimg.com/474x/d0/bb/77/d0bb77b9cad3e9c94e2423f6bf24d366.jpg',
    price: 111099,
    rating: 4.7,
    ratingCount: 200,
    description: "Apple's premium smartphone with a dynamic island and pro camera system.",
    discount: 8,
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    image: 'https://i.pinimg.com/474x/a7/ed/cb/a7edcb1a09186d60420ea7a39865f365.jpg',
    price: 17999,
    rating: 4.6,
    ratingCount: 180,
    description: 'Known for its exceptional camera and pure Android experience.',
    discount: 12,
  },
  {
    id: 4,
    name: 'OnePlus 11',
    image: 'https://i.pinimg.com/474x/55/68/f5/5568f5c32e07c23c260b33bdf35b6bc8.jpg',
    price: 18499,
    rating: 4.5,
    ratingCount: 150,
    description: 'Offers a smooth, fast experience with high refresh rate display.',
    discount: 15,
  },
  {
    id: 5,
    name: 'Xiaomi 13 Pro',
    image: 'https://i.pinimg.com/474x/39/23/42/392342f06861fece391b2e6acaf6aa97.jpg',
    price: 19499,
    rating: 4.4,
    ratingCount: 120,
    description: 'Features a Leica-branded camera and fast charging technology.',
    discount: 18,
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://i.pinimg.com/474x/a6/c2/a4/a6c2a4a81485499028f820a446a5765a.jpg',
    price: 29999,
    rating: 4.8,
    ratingCount: 100,
    description: 'Industry-leading noise cancellation and premium sound quality.',
    discount: 20,
  },
  {
    id: 7,
    name: 'Dell XPS 13 Laptop',
    image: 'https://i.pinimg.com/474x/68/6c/62/686c62e9940dec3da4e8d7d27d749297.jpg',
    price: 119999,
    rating: 4.6,
    ratingCount: 80,
    description: 'Compact, powerful laptop with a beautiful InfinityEdge display.',
    discount: 15,
  },
  {
    id: 8,
    name: 'Apple Watch Series 9',
    image: 'https://i.pinimg.com/474x/7a/74/ca/7a74caa8afed5f2272207bc5564b65b4.jpg',
    price: 45999,
    rating: 4.7,
    ratingCount: 130,
    description: 'Advanced health features with a new double-tap gesture.',
    discount: 10,
  },
  {
    id: 9,
    name: 'Canon EOS R50 Mirrorless Camera',
    image: 'https://i.pinimg.com/474x/c4/41/16/c44116e0db979e92bb6395bf54f496b1.jpg',
    price: 71999,
    rating: 4.5,
    ratingCount: 95,
    description: 'High-resolution 4K video and fast autofocus for content creators.',
    discount: 12,
  },
  {
    id: 10,
    name: 'Logitech MX Master 3S Mouse',
    image: 'https://i.pinimg.com/474x/b8/d4/56/b8d4562936acd64bfb9d2591db858fda.jpg',
    price: 8999,
    rating: 4.9,
    ratingCount: 160,
    description: 'Silent, precise, and designed for comfort and productivity.',
    discount: 18,
  },
  {
    id: 11,
    name: 'Apple AirPods Pro (2nd Generation)',
    image: 'https://i.pinimg.com/474x/c4/40/e9/c440e9b643d9e56966e6b684537c36ac.jpg',
    price: 24999,
    rating: 4.8,
    ratingCount: 240,
    description: 'Premium sound quality with active noise cancellation and transparency mode.',
    discount: 10,
  },
  {
    id: 12,
    name: 'Samsung Galaxy Watch 5',
    image: 'https://i.pinimg.com/474x/83/84/50/8384501b233049050629bba030ed1f3c.jpg',
    price: 19999,
    rating: 4.6,
    ratingCount: 125,
    description: 'Smartwatch with health tracking, sleep monitoring, and long battery life.',
    discount: 15,
  }
  
  
];

const Electronics = () => {
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = [...electronicsProducts].sort((a, b) => {
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
      <div className={styles.heroHeader}>
        <Typography variant="h3" className={styles.pageTitle}>
          ⚡ Explore Top Electronics ⚡
        </Typography>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.sortBar}>
        <FormControl sx={{ minWidth: 150 }}>
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
                to={`/electronics/${product.id}`}
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

export default Electronics;