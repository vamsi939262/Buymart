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
import styles from './Toys.module.css'; // Make sure this CSS module exists

const toyProducts = [
    {
        id: 1,
        name: 'Wooden Building Blocks Set',
        image: 'https://m.media-amazon.com/images/I/71O+FL9SJtL._SX679_.jpg',
        price: 599,
        rating: 4.8,
        ratingCount: 320,
        discount: 10,
    },
    {
        id: 2,
        name: 'Remote Control Car',
        image: 'https://m.media-amazon.com/images/I/61Ub07nNT7L._SX679_.jpg',
        price: 1299,
        rating: 4.5,
        ratingCount: 180,
        discount: 25,
    },
    {
        id: 3,
        name: 'Soft Plush Teddy Bear',
        image: 'https://m.media-amazon.com/images/I/51CMYpX22SL.jpg',
        price: 799,
        rating: 4.9,
        ratingCount: 450,
        discount: 15,
    },
    {
        id: 4,
        name: 'Educational Robot Kit',
        image: 'https://m.media-amazon.com/images/I/71ClGrcSrZL._SX679_.jpg',
        price: 1999,
        rating: 4.7,
        ratingCount: 210,
        discount: 30,
    },
    {
        id: 5,
        name: 'Doll House with Furniture',
        image: 'https://a.media-amazon.com/images/I/51NTq9KaTOL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 1599,
        rating: 4.6,
        ratingCount: 160,
        discount: 20,
    },
    {
        id: 6,
        name: 'Board Game: Strategy Edition',
        image: 'https://a.media-amazon.com/images/I/51nImImenuL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 699,
        rating: 4.4,
        ratingCount: 95,
        discount: 5,
    },
    {
        id: 7,
        name: 'Science Experiment Kit',
        image: 'https://a.media-amazon.com/images/I/61yXbrdKkGL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 999,
        rating: 4.7,
        ratingCount: 130,
        discount: 18,
    },
    {
        id: 8,
        name: 'Art Easel for Kids',
        image: 'https://a.media-amazon.com/images/I/711HrPSCNbL._SX569_.jpg',
        price: 1199,
        rating: 4.5,
        ratingCount: 70,
        discount: 22,
    },
    {
        id: 9,
        name: 'Musical Keyboard Toy',
        image: 'https://a.media-amazon.com/images/I/51m8eRPD5wL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 899,
        rating: 4.6,
        ratingCount: 110,
        discount: 12,
    },
    {
        id: 10,
        name: 'Toy guns',
        image: 'https://a.media-amazon.com/images/I/41egYnepFTL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 499,
        rating: 4.9,
        ratingCount: 280,
        discount: 8,
    },
    {
        id: 11,
        name: 'Action Figure Set',
        image: 'https://a.media-amazon.com/images/I/610ajJwBcBL._SX450_.jpg',
        price: 749,
        rating: 4.7,
        ratingCount: 155,
        discount: 28,
    },
    {
        id: 12,
        name: 'Construction Vehicle Set',
        image: 'https://a.media-amazon.com/images/I/51od06ncUgL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 949,
        rating: 4.4,
        ratingCount: 105,
        discount: 19,
    },
    {
        id: 13,
        name: 'Puzzle Collection for Kids',
        image: 'https://a.media-amazon.com/images/I/910li7k10pL._SY450_.jpg',
        price: 399,
        rating: 4.6,
        ratingCount: 220,
        discount: 11,
    },
    {
        id: 14,
        name: 'Play Kitchen Set',
        image: 'https://a.media-amazon.com/images/I/41rjoP5RMAL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 1799,
        rating: 4.8,
        ratingCount: 190,
        discount: 32,
    },
    {
        id: 15,
        name: 'Outdoor Play Tent',
        image: 'https://a.media-amazon.com/images/I/51KlkXKohFL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 1099,
        rating: 4.5,
        ratingCount: 85,
        discount: 21,
    },
    {
        id: 16,
        name: 'Drawing Tablet for Kids',
        image: 'https://a.media-amazon.com/images/I/51I7J2alveL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 1399,
        rating: 4.7,
        ratingCount: 140,
        discount: 26,
    },
    {
        id: 17,
        name: 'Ride-On Toy Car',
        image: 'https://a.media-amazon.com/images/I/51QdcCdnKaL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 2499,
        rating: 4.6,
        ratingCount: 65,
        discount: 17,
    },
    {
        id: 18,
        name: 'Baby Walker with Activities',
        image: 'https://a.media-amazon.com/images/I/41VYkXe3e5L._SX300_SY300_QL70_FMwebp_.jpg',
        price: 1149,
        rating: 4.5,
        ratingCount: 115,
        discount: 23,
    },
    {
        id: 19,
        name: 'Stacking Rings for Toddlers',
        image: 'https://a.media-amazon.com/images/I/31US-v6XvKL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 299,
        rating: 4.8,
        ratingCount: 255,
        discount: 9,
    },
    {
        id: 20,
        name: 'Interactive Learning Globe',
        image: 'https://a.media-amazon.com/images/I/51FCX7EZehL._SY300_SX300_QL70_FMwebp_.jpg',
        price: 1699,
        rating: 4.7,
        ratingCount: 175,
        discount: 31,
    },
];

const Toys = () => {
    const [sortOption, setSortOption] = useState('');

    const sortedProducts = [...toyProducts].sort((a, b) => {
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
        🧸 Discover Fun Toys for Kids 🚂
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
                                to={`/toys/${product.id}`}
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

export default Toys;