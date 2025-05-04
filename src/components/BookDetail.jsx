import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Typography, Card, CardMedia, CardContent, Box, Rating,
  Button, Chip, Divider, IconButton, Breadcrumbs, Link
} from '@mui/material';
import { useCart } from './Cart/CartContext'; // Importing the Cart Context
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


// Sample book data
const bookProducts = [
    {
        id: 1,
        name: 'The Great Gatsby',
        image: 'https://i.pinimg.com/474x/67/d7/95/67d795fac5fc8f00856ec649aed25674.jpg',
        price: 599,
        rating: 4.7,
        ratingCount: 1200,
        discount: 10,
        description: 'A classic novel of the Roaring Twenties, focusing on the mysterious Jay Gatsby.',
        category: 'Fiction',
        stock: 100,
        author: 'F. Scott Fitzgerald',
        publisher: 'Scribner',
        publicationDate: '1925-04-10',
      },
      {
        id: 2,
        name: '1984',
        image: 'https://i.pinimg.com/474x/43/75/b7/4375b7d9bf24b88aa53744b417227485.jpg',
        price: 499,
        rating: 4.8,
        ratingCount: 1400,
        discount: 15,
        description: 'A dystopian novel that explores totalitarianism and surveillance.',
        category: 'Dystopian',
        stock: 200,
        author: 'George Orwell',
        publisher: 'Secker & Warburg',
        publicationDate: '1949-06-08',
      },
      {
        id: 3,
        name: 'To Kill a Mockingbird',
        image: 'https://i.pinimg.com/474x/f2/e7/d9/f2e7d93f94a4ee9acfb0c862c69581b5.jpg',
        price: 699,
        rating: 4.9,
        ratingCount: 2500,
        discount: 12,
        description: 'A Pulitzer Prize-winning novel exploring racial injustice in the American South.',
        category: 'Fiction',
        stock: 150,
        author: 'Harper Lee',
        publisher: 'J.B. Lippincott & Co.',
        publicationDate: '1960-07-11',
      },
      {
        id: 4,
        name: 'Brave New World',
        image: 'https://i.pinimg.com/474x/33/8b/be/338bbe46d1fb11cf70f1bfffa5e14b4d.jpg',
        price: 550,
        rating: 4.6,
        ratingCount: 1800,
        discount: 10,
        description: 'A novel about a futuristic world where happiness is artificially engineered.',
        category: 'Dystopian',
        stock: 120,
        author: 'Aldous Huxley',
        publisher: 'Chatto & Windus',
        publicationDate: '1932-08-31',
      },
      {
        id: 5,
        name: 'Moby-Dick',
        image: 'https://i.pinimg.com/474x/78/f1/a9/78f1a9d67c5f90ecae81977ae3b0ef4f.jpg',
        rating: 4.4,
        ratingCount: 1600,
        discount: 5,
        description: 'Herman Melville’s epic tale of Captain Ahab’s obsession with hunting the white whale, Moby Dick.',
        category: 'Adventure',
        stock: 80,
        author: 'Herman Melville',
        publisher: 'Harper & Brothers',
        publicationDate: '1851-10-18',
      },
      {
        id: 6,
        name: 'Pride and Prejudice',
        image: 'https://i.pinimg.com/474x/8c/09/00/8c0900fdfd2cb4435ed105e055d43bf9.jpg',
        price: 499,
        rating: 4.8,
        ratingCount: 2000,
        discount: 8,
        description: 'A classic romance novel about Elizabeth Bennet and Mr. Darcy, exploring themes of love and social class.',
        category: 'Romance',
        stock: 90,
        author: 'Jane Austen',
        publisher: 'T. Egerton, Whitehall',
        publicationDate: '1813-01-28',
      },
      {
        id: 7,
        name: 'The Catcher in the Rye',
        image: 'https://i.pinimg.com/474x/e3/e1/da/e3e1dae6cde1e29fb13be5c280dcac60.jpg',
        price: 550,
        rating: 4.5,
        ratingCount: 2200,
        discount: 20,
        description: 'J.D. Salinger’s tale of teenage rebellion and the search for personal identity.',
        category: 'Fiction',
        stock: 130,
        author: 'J.D. Salinger',
        publisher: 'Little, Brown and Company',
        publicationDate: '1951-07-16',
      },
      {
        id: 8,
        name: 'The Hobbit',
        image: 'https://i.pinimg.com/474x/07/7e/22/077e221ae4eb2b8975a6619d009eef14.jpg',
        price: 699,
        rating: 4.9,
        ratingCount: 3000,
        discount: 15,
        description: 'J.R.R. Tolkien’s prequel to The Lord of the Rings, following Bilbo Baggins on an epic adventure.',
        category: 'Fantasy',
        stock: 200,
        author: 'J.R.R. Tolkien',
        publisher: 'George Allen & Unwin',
        publicationDate: '1937-09-21',
      },
      {
        id: 9,
        name: 'Ballpoint Pen',
        image: 'https://i.pinimg.com/474x/4c/56/43/4c56435bd641f331c0e0221df5e173d0.jpg',
        price: 50,
        rating: 4.5,
        ratingCount: 500,
        discount: 5,
        description: 'A smooth-writing ballpoint pen with a comfortable grip for everyday use.',
        category: 'Stationery',
        stock: 1000,
        
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
        description: 'A high-quality notebook with lined pages, ideal for taking notes and journaling.',
        category: 'Stationery',
        stock: 500,
        
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
        description: 'Bright and durable sticky notes for quick notes and reminders.',
        category: 'Stationery',
        stock: 600,
        
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
        description: 'A set of premium pencils for sketching, writing, and drawing.',
        category: 'Stationery',
        stock: 400,
        
        link: '/product/pencil-set',
      },  // Your book data here...
];

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the cart context
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track quantity

  // Fetch the book data based on the `id` parameter
  useEffect(() => {
    const fetchedBook = bookProducts.find((item) => item.id === parseInt(id));
    if (fetchedBook) {
      setBook(fetchedBook);
      setQuantity(1); // Reset quantity when a new book is selected
    }
  }, [id]); // Trigger this effect whenever `id` changes

  if (!book) {
    return (
      <Container>
        <Typography variant="h5" color="error" mt={4}>
          Book not found.
        </Typography>
      </Container>
    );
  }

  const handleIncreaseQuantity = () => {
    if (quantity < book.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...book,
      quantity,
    };

    addToCart(itemToAdd);
    alert(`${book.name} added to cart!`);
  };

  const handleBuyNow = () => {
    const itemToAdd = {
      ...book,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/books" underline="hover">
          Books & Stationary
        </Link>
        <Typography color="text.primary">{book.name}</Typography>
      </Breadcrumbs>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>{book.name}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={book.image}
                alt={book.name}
                height="400"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" color="primary">₹{book.price}</Typography>
              <Rating value={book.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="textSecondary">
                ({book.ratingCount} ratings)
              </Typography>
              <Typography variant="body1" mt={2} paragraph>{book.description}</Typography>

              {book.discount > 0 && (
                <Typography variant="body2" color="success.main">
                  {book.discount}% Off
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Author and Publisher */}
              <Typography variant="subtitle1">Author: {book.author}</Typography>
              <Typography variant="subtitle1">Publisher: {book.publisher}</Typography>
              <Typography variant="subtitle1">Published on: {book.publicationDate}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Quantity control */}
              <Typography variant="subtitle1">Quantity:</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{quantity}</Typography>
                <IconButton onClick={handleIncreaseQuantity} disabled={quantity >= book.stock}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Box mt={4} display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
      {/* Suggested Products Section */}
      <Box mt={6}>
  <Typography variant="h5" gutterBottom>
    You may also like
  </Typography>
  <Box
    sx={{
      display: 'flex',
      overflowX: 'auto', // Enables horizontal scrolling
      whiteSpace: 'nowrap', // Ensures the items stay on a single line
      gap: 2,
    }}
  >
    {bookProducts.map((suggestedProduct) => (
      <Card
        key={suggestedProduct.id}
        sx={{
          minWidth: 200, // Ensures each card has a minimum width
          flexShrink: 0, // Prevents shrinking, ensuring the cards stay their size
        }}
      >
        <CardMedia
          component="img"
          image={suggestedProduct.image}
          alt={suggestedProduct.name}
          height="250"
        />
        <CardContent>
          <Typography variant="h6">{suggestedProduct.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            ₹{suggestedProduct.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/bookdetail/${suggestedProduct.id}`)}
            sx={{ mt: 2 }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    ))}
  </Box>
</Box>

    </Container>
  );
};

export default BookDetail;
