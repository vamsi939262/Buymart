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
import styles from './HomeDecor.module.css'; // Create this CSS module with appropriate styles

const homeDecorProducts = [
  
    {
      id: 1,
      name: 'Modern Sofa',
      image: 'https://i.pinimg.com/474x/34/d6/f5/34d6f5f4ab3e38e4e75d660d1da374e3.jpg',
      price: 14999,
      rating: 4.8,
      ratingCount: 120,
      discount: 20,
    },
    {
      id: 2,
      name: 'Luxury King Bed',
      image: 'https://i.pinimg.com/474x/49/a2/6a/49a26ad80034c89dce7f18e5a7d4c98f.jpg',
      price: 23999,
      rating: 4.7,
      ratingCount: 200,
      discount: 15,
    },
    {
      id: 3,
      name: 'Wooden Dining Table',
      image: 'https://i.pinimg.com/474x/eb/2b/d2/eb2bd24bd82f90707452317e3fb5a25d.jpg',
      price: 8999,
      rating: 4.5,
      ratingCount: 95,
      discount: 10,
    },
    {
      id: 4,
      name: 'Minimalist Coffee Table',
      image: 'https://i.pinimg.com/474x/3d/cb/09/3dcb09571e51bf91735d3f4a40358a8f.jpg',
      price: 4999,
      rating: 4.6,
      ratingCount: 150,
      discount: 12,
    },
    {
      id: 5,
      name: 'Industrial Shelf',
      image: 'https://i.pinimg.com/474x/91/dc/98/91dc98989d0b9057eca9016e9a92535b.jpg',
      price: 6999,
      rating: 4.3,
      ratingCount: 180,
      discount: 18,
    },
    {
      id: 6,
      name: 'Soft Armchair',
      image: 'https://i.pinimg.com/474x/a5/fa/54/a5fa54d9c476665d035d37c194038562.jpg',
      price: 1599,
      rating: 4.6,
      ratingCount: 220,
      discount: 15,
    },
    {
      id: 7,
      name: 'Elegant Bookshelf',
      image: 'https://i.pinimg.com/474x/fa/7c/9c/fa7c9c173483a58826870a262b024c68.jpg',
      price: 7999,
      rating: 4.7,
      ratingCount: 75,
      discount: 25,
    },
    {
      id: 8,
      name: 'Abstract Wall Art',
      image: 'https://i.pinimg.com/474x/82/f2/ca/82f2cae276598d5bc2b0e6bd5ca9b5d2.jpg',
      price: 999,
      rating: 4.8,
      ratingCount: 250,
      discount: 10,
      category: 'Home Decor',
    },
    {
      id: 9,
      name: 'Indoor Plant Pot',
      image: 'https://i.pinimg.com/474x/eb/36/8b/eb368bf298fc1be4edd49489a6452dc8.jpg',
      price: 599,
      rating: 4.7,
      ratingCount: 110,
      discount: 20,
      category: 'Home Decor',
    },
    {
      id: 10,
      name: 'Decorative Throw Pillow',
      image: 'https://i.pinimg.com/474x/d7/f4/60/d7f460897056a5632f659313caf53610.jpg',
      price: 799,
      rating: 4.6,
      ratingCount: 130,
      discount: 15,
      category: 'Home Decor',
    },
    {
      id: 11,
      name: 'Modern Table Lamp',
      image: 'https://i.pinimg.com/474x/0d/98/e5/0d98e51600b0401b49d18621d7b445ce.jpg',
      price: 1499,
      rating: 4.7,
      ratingCount: 190,
      discount: 25,
      category: 'Home Decor',
    },
    {
      id: 12,
      name: 'Framed Mirror',
      image: 'https://i.pinimg.com/474x/8a/86/da/8a86da6028d27fc55e8a28369655fc9d.jpg',
      price: 2499,
      rating: 4.9,
      ratingCount: 320,
      discount: 30,
      category: 'Home Decor',
    }

  
];

const HomeDecor = () => {
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = [...homeDecorProducts].sort((a, b) => {
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
  🏡 Discover Stylish Home Decor 🪴
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
                to={`/homedecor/${product.id}`}
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

export default HomeDecor;
