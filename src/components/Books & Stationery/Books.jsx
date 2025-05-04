import React, { useState } from 'react';
import styles from './Books.module.css';
import { motion } from 'framer-motion';
import {
    Container,
    Typography,
    Button,
    Box,
    Rating,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';

const booksProducts = [
    {
        id: 1,
        name: 'The Great Gatsby',
        image: 'https://i.pinimg.com/474x/67/d7/95/67d795fac5fc8f00856ec649aed25674.jpg',
        price: 599,
        rating: 4.7,
        ratingCount: 1200,
        discount: 10,
        author: 'F. Scott Fitzgerald',
        link: '/product/the-great-gatsby',
    },
    {
        id: 2,
        name: '1984',
        image: 'https://i.pinimg.com/474x/43/75/b7/4375b7d9bf24b88aa53744b417227485.jpg',
        price: 499,
        rating: 4.8,
        ratingCount: 1400,
        discount: 15,
        author: 'George Orwell',
        link: '/product/1984',
    },
    {
        id: 3,
        name: 'To Kill a Mockingbird',
        image: 'https://i.pinimg.com/474x/f2/e7/d9/f2e7d93f94a4ee9acfb0c862c69581b5.jpg',
        price: 699,
        rating: 4.9,
        ratingCount: 2500,
        discount: 12,
        author: 'Harper Lee',
        link: '/product/to-kill-a-mockingbird',
    },
    {
        id: 4,
        name: 'Brave New World',
        image: 'https://i.pinimg.com/474x/33/8b/be/338bbe46d1fb11cf70f1bfffa5e14b4d.jpg',
        price: 550,
        rating: 4.6,
        ratingCount: 1800,
        discount: 10,
        author: 'Aldous Huxley',
        link: '/product/brave-new-world',
    },
    {
        id: 5,
        name: 'Moby-Dick',
        image: 'https://i.pinimg.com/474x/78/f1/a9/78f1a9d67c5f90ecae81977ae3b0ef4f.jpg',
        price: 799,
        rating: 4.4,
        ratingCount: 1600,
        discount: 5,
        author: 'Herman Melville',
        link: '/product/moby-dick',
    },
    {
        id: 6,
        name: 'Pride and Prejudice',
        image: 'https://i.pinimg.com/474x/8c/09/00/8c0900fdfd2cb4435ed105e055d43bf9.jpg',
        price: 499,
        rating: 4.8,
        ratingCount: 2000,
        discount: 8,
        author: 'Jane Austen',
        link: '/product/pride-and-prejudice',
    },
    {
        id: 7,
        name: 'The Catcher in the Rye',
        image: 'https://i.pinimg.com/474x/e3/e1/da/e3e1dae6cde1e29fb13be5c280dcac60.jpg',
        price: 550,
        rating: 4.5,
        ratingCount: 2200,
        discount: 20,
        author: 'J.D. Salinger',
        link: '/product/the-catcher-in-the-rye',
    },
    {
        id: 8,
        name: 'The Hobbit',
        image: 'https://i.pinimg.com/474x/07/7e/22/077e221ae4eb2b8975a6619d009eef14.jpg',
        price: 699,
        rating: 4.9,
        ratingCount: 3000,
        discount: 15,
        author: 'J.R.R. Tolkien',
        link: '/product/the-hobbit',
    },
    {
        id: 9,
        name: 'Ballpoint Pen',
        image: 'https://i.pinimg.com/474x/4c/56/43/4c56435bd641f331c0e0221df5e173d0.jpg',
        price: 50,
        rating: 4.5,
        ratingCount: 500,
        discount: 5,
        link: '/product/ballpoint-pen',
    },
    {
        id: 10,
        name: 'Notebook',
        image: 'https://i.pinimg.com/474x/41/12/31/4112310c003be3bb866d9209cee360a3.jpg',
        price: 199,
        rating: 4.7,
        ratingCount: 800,
        discount: 10,
        link: '/product/notebook',
    },
    {
        id: 11,
        name: 'Sticky Notes',
        image: 'https://i.pinimg.com/474x/e9/61/a2/e961a23fd036cbef3b6fedd9261b7949.jpg',
        price: 120,
        rating: 4.3,
        ratingCount: 350,
        discount: 8,
        link: '/product/sticky-notes',
    },
    {
        id: 12,
        name: 'Pencil Set',
        image: 'https://i.pinimg.com/474x/21/19/53/211953d197368da0feb4e1bc5827b364.jpg',
        price: 150,
        rating: 4.6,
        ratingCount: 620,
        discount: 12,
        link: '/product/pencil-set',
    }
];

const Books = () => {
    const [sortOption, setSortOption] = useState('');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        // Sorting logic here based on selected option
    };

    const sortedBooks = [...booksProducts];

    if (sortOption === 'priceLowHigh') {
        sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighLow') {
        sortedBooks.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'ratingHighLow') {
        sortedBooks.sort((a, b) => b.rating - a.rating);
    }

    return (
        <Container className={styles.container}>
            <Typography variant="h3" className={styles.pageTitle}>
                📚 Discover Amazing Books & Stationary ✏️
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

            <Divider sx={{ mb: 3 }} />

            <div className={styles.grid}>
                {sortedBooks.map((book, index) => (
                    <motion.div
                        key={book.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                    >
                        <img
                            src={book.image}
                            alt={book.name}
                            className={styles.image}
                        />
                        <div className={styles.content}>
                            <div className={styles.name}>{book.name}</div>
                            <div className={styles.author}>by {book.author}</div>
                            <Box display="flex" alignItems="center">
                                <Rating
                                    value={book.rating}
                                    precision={0.1}
                                    readOnly
                                    size="small"
                                />
                                <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                                    ({book.ratingCount})
                                </Typography>
                            </Box>
                            <div className={styles.priceRow}>
                                <Typography variant="h6">₹{book.price}</Typography>
                                {book.discount > 0 && (
                                    <div className={styles.discount}>
                                        {book.discount}% off
                                    </div>
                                )}
                            </div>
                            <Link to={`/product/${book.id}`} style={{ textDecoration: 'none' }}>
                                <Button fullWidth variant="contained" className={styles.button}>
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
};

export default Books;
