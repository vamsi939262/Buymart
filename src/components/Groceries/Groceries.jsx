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
import styles from './Groceries.module.css'; // Ensure this CSS module exists and matches class names used below

const groceryProducts = [
  {
    id: 1,
    name: 'Organic Brown Rice',
    image: 'https://i.pinimg.com/736x/7c/9d/c1/7c9dc1008678528992d723fbe7999bde.jpg',
    price: 120,
    rating: 4.6,
    ratingCount: 230,
    discount: 20,
  },
  {
    id: 2,
    name: 'Whole Wheat Atta - 5kg',
    image: 'https://i.pinimg.com/474x/4e/1e/ab/4e1eabe5896e29111f812169d33f7256.jpg',
    price: 250,
    rating: 4.4,
    ratingCount: 180,
    discount: 10,
  },
  {
    id: 3,
    name: 'Almonds - 500g',
    image: 'https://i.pinimg.com/474x/f7/63/45/f7634512c5892286b9068e706a69f7ac.jpg',
    price: 380,
    rating: 4.7,
    ratingCount: 310,
    discount: 15,
  },
  {
    id: 4,
    name: 'Honey - 1kg Bottle',
    image: 'https://i.pinimg.com/474x/44/97/69/449769e5626d5a5a135fb91e670509dc.jpg',
    price: 299,
    rating: 4.5,
    ratingCount: 190,
    discount: 25,
  },
  {
    id: 5,
    name: 'Cold Pressed Coconut Oil',
    image: 'https://i.pinimg.com/474x/6a/10/9f/6a109fc8f2f3c1371a55126d6d1f98aa.jpg',
    price: 399,
    rating: 4.8,
    ratingCount: 275,
    discount: 30,
  },
  {
    id: 6,
    name: 'Organic Turmeric Powder - 250g',
    image: 'https://i.pinimg.com/474x/98/c3/62/98c362b78374fa833368a932c56b8fa5.jpg',
    price: 149,
    rating: 4.6,
    ratingCount: 210,
    discount: 20,
  },
  {
    id: 7,
    name: 'A2 Desi Cow Ghee - 500ml',
    image: 'https://i.pinimg.com/474x/9f/c8/93/9fc893a214b4df6034b8739a0389d858.jpg',
    price: 599,
    rating: 4.9,
    ratingCount: 340,
    discount: 15,
  },
  {
    id: 8,
    name: 'Brown Rice - 5kg Bag',
    image: 'https://i.pinimg.com/474x/7f/d5/d0/7fd5d09d8846d59c2bb3974cee314a79.jpg',
    price: 499,
    rating: 4.4,
    ratingCount: 180,
    discount: 18,
  },
  {
    id: 9,
    name: 'Whole Urad Dal - 1kg',
    image: 'https://i.pinimg.com/474x/31/0e/6f/310e6f13f996b893a723b87425741b5a.jpg',
    price: 199,
    rating: 4.3,
    ratingCount: 120,
    discount: 22,
  },
  {
    id: 10,
    name: 'Multi-Grain Atta - 5kg',
    image: 'https://i.pinimg.com/474x/a4/d8/46/a4d8462b831c9e0fc147ea7f615de4a3.jpg',
    price: 349,
    rating: 4.7,
    ratingCount: 230,
    discount: 25,
  },
  {
    id: 11,
    name: 'Raw Forest Honey - 500g',
    image: 'https://i.pinimg.com/474x/2f/9b/33/2f9b33eeab0fdd707f0d7160b00802cc.jpg',
    price: 259,
    rating: 4.5,
    ratingCount: 200,
    discount: 10,
  },
  {
    id: 12,
    name: 'Rock Salt (Sendha Namak) - 1kg',
    image: 'https://i.pinimg.com/474x/61/10/f5/6110f5e4e8f66b681a35b39a608b6cb1.jpg',
    price: 89,
    rating: 4.4,
    ratingCount: 95,
    discount: 12,
  },
  {
    id: 13,
    name: 'Chia Seeds - 250g Pack',
    image: 'https://i.pinimg.com/474x/8a/66/5a/8a665af0cd6243e4c2561ad02268152c.jpg',
    price: 179,
    rating: 4.7,
    ratingCount: 170,
    discount: 28,
  },
  {
    id: 14,
    name: 'Organic Jaggery Powder - 1kg',
    image: 'https://i.pinimg.com/736x/66/8f/0e/668f0e357688ce9e4de9d54d9067bdaa.jpg',
    price: 159,
    rating: 4.6,
    ratingCount: 150,
    discount: 20,
  },
  {
    id: 15,
    name: 'Rolled Oats - 1kg',
    image: 'https://i.pinimg.com/474x/56/d3/ee/56d3ee2011d4be86e4bb0713a5e96781.jpg',
    price: 229,
    rating: 4.5,
    ratingCount: 200,
    discount: 26,
  },
  {
    id: 16,
    name: 'Green Tea - 100g Loose Leaf',
    image: 'https://i.pinimg.com/474x/c4/c0/35/c4c03535a8441f1862a16a1303d1aad5.jpg',
    price: 139,
    rating: 4.2,
    ratingCount: 110,
    discount: 15,
  }
  
];

const Groceries = () => {
  const [sortOption, setSortOption] = useState('');

  const sortedProducts = [...groceryProducts].sort((a, b) => {
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
        🥕 Discover Fresh Groceries 🛒
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
                to={`/groceries/${product.id}`}
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

export default Groceries;
