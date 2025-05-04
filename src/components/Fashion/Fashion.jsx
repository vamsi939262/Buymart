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
import styles from './Fashion.module.css'; // Make sure this CSS module exists and matches class names used below

const fashionProducts = [
  {
    id: 1,
    name: 'Cotton Crew Neck T-Shirt',
    image: 'https://i.pinimg.com/736x/58/2b/9a/582b9a0c2a186e203065faa8c3ad5b3a.jpg',
    price: 499,
    rating: 4.5,
    ratingCount: 780,
    discount: 75,
  },
  {
    id: 2,
    name: 'Slim Fit Jeans - Blue',
    image: 'https://i.pinimg.com/736x/8c/cd/04/8ccd04d276d45ae7140c53bbed4ed6a0.jpg',
    price: 799,
    rating: 4.2,
    ratingCount: 90,
    discount: 20,
  },
  {
    id: 3,
    name: 'Sneakers Men',
    image: 'https://i.pinimg.com/474x/8b/c2/06/8bc206b782f9bf29540c814e853a269e.jpg',
    price: 1299,
    rating: 4.7,
    ratingCount: 230,
    discount: 30,
  },
  {
    id: 4,
    name: 'Leather Handbag',
    image: 'https://i.pinimg.com/474x/31/ea/30/31ea304dc17ed396a253db9adc125f36.jpg',
    price: 1599,
    rating: 4.6,
    ratingCount: 150,
    discount: 40,
  },
  {
    id: 5,
    name: 'Formal Blazer',
    image: 'https://i.pinimg.com/474x/e4/ee/36/e4ee366faa3118d39e9997e4f8e3ba5c.jpg',
    price: 2499,
    rating: 4.3,
    ratingCount: 85,
    discount: 25,
  },
  {
    id: 6,
    name: 'Unisex Oversized Hoodie',
    image: 'https://i.pinimg.com/474x/5d/8d/d4/5d8dd4cea275a9cea16c5ce583f53854.jpg',
    price: 1199,
    rating: 4.8,
    ratingCount: 320,
    discount: 45,
  },
  {
    id: 7,
    name: 'Denim Jacket',
    image: 'https://i.pinimg.com/474x/e4/65/83/e46583dbf08a14907c28d7e3f64c9845.jpg',
    price: 1799,
    rating: 4.4,
    ratingCount: 210,
    discount: 30,
  },
  {
    id: 8,
    name: 'Chinos - Beige',
    image: 'https://i.pinimg.com/474x/f7/d9/35/f7d935cf3ce5ee0456f9cff4a48fd8d0.jpg',
    price: 899,
    rating: 4.1,
    ratingCount: 150,
    discount: 15,
  },
  {
    id: 9,
    name: 'Canvas Backpack',
    image: 'https://i.pinimg.com/474x/09/33/5a/09335aee6b2d03e7931681ac44f15b9e.jpg',
    price: 799,
    rating: 4.6,
    ratingCount: 120,
    discount: 35,
  },
  {
    id: 10,
    name: 'Woolen Scarf',
    image: 'https://i.pinimg.com/474x/84/3a/fc/843afc619073c1deb6361b1eb13febbc.jpg',
    price: 499,
    rating: 4.7,
    ratingCount: 60,
    discount: 50,
  },
  
  {
    id: 11,
    name: 'Cotton Sleeveless Top',
    image: 'https://i.pinimg.com/474x/fd/cf/93/fdcf939c67cad577e6e10c916a448d65.jpg',
    price: 399,
    rating: 4.4,
    ratingCount: 210,
    discount: 15
},
{
    id: 12,
    name: 'Chunky Sneakers - White/Red',
    image: 'https://i.pinimg.com/474x/bb/01/58/bb01585c85cd801e8c045897d2e6bd00.jpg',
    price: 2199,
    rating: 4.5,
    ratingCount: 150,
    discount: 30
},
{
    id: 13,
    name: 'Vintage Leather Jacket',
    image: 'https://i.pinimg.com/474x/ff/73/27/ff732746821d1640e9a11a5e3bca8fe0.jpg',
    price: 3499,
    rating: 4.8,
    ratingCount: 250,
    discount: 20
},
{
    id: 14,
    name: 'High-Waist Leggings - Black',
    image: 'https://i.pinimg.com/474x/50/11/db/5011dbf4d32863720b70831b45ad92ab.jpg',
    price: 799,
    rating: 4.3,
    ratingCount: 320,
    discount: 35
},
{
    id: 15,
    name: 'Tote Bag - Canvas',
    image: 'https://i.pinimg.com/474x/cf/8c/3a/cf8c3a3ac4a496028fc61a4d92fd8d1c.jpg',
    price: 999,
    rating: 4.7,
    ratingCount: 180,
    discount: 15
},
{
    id: 16,
    name: 'Lightweight Down Jacket',
    image: 'https://i.pinimg.com/474x/52/69/fe/5269fec2433c0a87c39b534de1250a20.jpg',
    price: 2299,
    rating: 4.6,
    ratingCount: 120,
    discount: 40
},
{
    id: 17,
    name: 'Sunglasses - Black',
    image: 'https://i.pinimg.com/474x/67/83/32/67833249433662daa82f0b2dcb3933cb.jpg',
    price: 799,
    rating: 4.5,
    ratingCount: 150,
    discount: 10
},
{
    id: 18,
    name: 'Cotton Linen Blouse - White',
    image: 'https://i.pinimg.com/474x/e7/c9/3c/e7c93c2555234a0fe974bd386161ac6e.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 250,
    discount: 30
},
{
    id: 19,
    name: 'A-Line Denim Skirt',
    image: 'https://i.pinimg.com/474x/79/ba/6a/79ba6ab19217be7f937c5a95676f1103.jpg',
    price: 899,
    rating: 4.3,
    ratingCount: 120,
    discount: 15
},
{
    id: 20,
    name: 'Chunky Knit Sweater - Beige',
    image: 'https://i.pinimg.com/474x/a5/e1/04/a5e104b76d8c763bb1f4ca50ac431cd0.jpg',
    price: 1799,
    rating: 4.6,
    ratingCount: 180,
    discount: 20
}

  
];

const Fashion = () => {
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = [...fashionProducts].sort((a, b) => {
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
  👗 Discover Trending Fashion 👠
</Typography>

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
                to={`/fashion/${product.id}`}
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

export default Fashion;
