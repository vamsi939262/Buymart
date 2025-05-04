import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Typography, Card, CardMedia, CardContent, Box, Rating,
  Button, Chip, Divider, IconButton, Breadcrumbs, Link
} from '@mui/material';
import { useCart } from './Cart/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const toyProducts = [
  {
    id: 1,
    name: 'Wooden Building Blocks Set',
    image: 'https://m.media-amazon.com/images/I/71O+FL9SJtL._SX679_.jpg',
    price: 599,
    rating: 4.8,
    ratingCount: 320,
    discount: 10,
    description: '100-piece premium wooden building blocks set with various shapes and colors. Helps develop creativity, motor skills, and problem-solving abilities in children.',
    ageGroup: ['1-3 years', '3-6 years'],
    material: 'Wood',
    stock: 50,
    category: 'Educational Toys',
  },
  {
    id: 2,
    name: 'Remote Control Car',
    image: 'https://m.media-amazon.com/images/I/61Ub07nNT7L._SX679_.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 180,
    discount: 25,
    description: 'High-speed 1:16 scale RC car with 2.4GHz remote control, rechargeable battery, and durable construction. Features forward/reverse movement and LED headlights.',
    ageGroup: ['6-12 years'],
    material: 'Plastic/Metal',
    stock: 30,
    category: 'Remote Control Toys',
  },
  {
    id: 3,
    name: 'Soft Plush Teddy Bear',
    image: 'https://m.media-amazon.com/images/I/51CMYpX22SL.jpg',
    price: 799,
    rating: 4.9,
    ratingCount: 450,
    discount: 15,
    description: 'Extra soft 18-inch teddy bear with huggable design and child-safe materials. Perfect companion for naptime and playtime.',
    ageGroup: ['0-2 years', '2-5 years'],
    material: 'Plush',
    stock: 100,
    category: 'Stuffed Animals',
    colorOptions: ['Brown', 'Pink', 'White'],
  },
  {
    id: 4,
    name: 'Educational Robot Kit',
    image: 'https://m.media-amazon.com/images/I/71ClGrcSrZL._SX679_.jpg',
    price: 1999,
    rating: 4.7,
    ratingCount: 210,
    discount: 30,
    description: 'Interactive robot building kit that teaches basic coding and engineering principles. Includes various sensors and programmable modules.',
    ageGroup: ['8-14 years'],
    material: 'Plastic/Electronic Components',
    stock: 25,
    category: 'Educational Toys',
  },
  {
    id: 5,
    name: 'Doll House with Furniture',
    image: 'https://a.media-amazon.com/images/I/51NTq9KaTOL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 1599,
    rating: 4.6,
    ratingCount: 160,
    discount: 20,
    description: 'Three-story wooden dollhouse with detailed furniture and accessories. Encourages imaginative play and storytelling.',
    ageGroup: ['3-8 years'],
    material: 'Wood',
    stock: 40,
    category: 'Dolls & Accessories',
  },
  {
    id: 6,
    name: 'Board Game: Strategy Edition',
    image: 'https://a.media-amazon.com/images/I/51nImImenuL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 699,
    rating: 4.4,
    ratingCount: 95,
    discount: 5,
    description: 'Classic strategy board game for 2-4 players. Develops critical thinking and planning skills. Game duration: 30-45 minutes.',
    ageGroup: ['8+ years'],
    material: 'Cardboard/Plastic',
    stock: 60,
    category: 'Board Games',
  },
  {
    id: 7,
    name: 'Science Experiment Kit',
    image: 'https://a.media-amazon.com/images/I/61yXbrdKkGL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 999,
    rating: 4.7,
    ratingCount: 130,
    discount: 18,
    description: 'Over 20 exciting science experiments to learn about chemistry, physics, and more. Includes all necessary materials and instruction booklet.',
    ageGroup: ['8-12 years'],
    material: 'Various',
    stock: 35,
    category: 'Educational Toys',
  },
  {
    id: 8,
    name: 'Art Easel for Kids',
    image: 'https://a.media-amazon.com/images/I/711HrPSCNbL._SX569_.jpg',
    price: 1199,
    rating: 4.5,
    ratingCount: 70,
    discount: 22,
    description: 'Double-sided art easel with a whiteboard on one side and a chalkboard on the other. Includes paper roll holder and storage trays.',
    ageGroup: ['3-10 years'],
    material: 'Wood/Plastic',
    stock: 20,
    category: 'Art Supplies',
  },
  {
    id: 9,
    name: 'Musical Keyboard Toy',
    image: 'https://a.media-amazon.com/images/I/51m8eRPD5wL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 899,
    rating: 4.6,
    ratingCount: 110,
    discount: 12,
    description: '37-key electronic keyboard with various instrument sounds, rhythms, and demo songs. Encourages musical exploration.',
    ageGroup: ['3-8 years'],
    material: 'Plastic',
    stock: 55,
    category: 'Musical Toys',
  },
  {
    id: 10,
    name: 'Toy guns',
    image: 'https://a.media-amazon.com/images/I/41egYnepFTL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 499,
    rating: 4.9,
    ratingCount: 280,
    discount: 8,
    description: 'Set of two safe and durable toy guns with soft foam darts. Promotes outdoor active play.',
    ageGroup: ['6+ years'],
    material: 'Plastic/Foam',
    stock: 70,
    category: 'Outdoor Toys',
  },
  {
    id: 11,
    name: 'Action Figure Set',
    image: 'https://a.media-amazon.com/images/I/610ajJwBcBL._SX450_.jpg',
    price: 749,
    rating: 4.7,
    ratingCount: 155,
    discount: 28,
    description: 'Set of 5 articulated superhero action figures with accessories. Inspires imaginative battles and storytelling.',
    ageGroup: ['4-10 years'],
    material: 'Plastic',
    stock: 45,
    category: 'Action Figures',
  },
  {
    id: 12,
    name: 'Construction Vehicle Set',
    image: 'https://a.media-amazon.com/images/I/51od06ncUgL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 949,
    rating: 4.4,
    ratingCount: 105,
    discount: 19,
    description: 'Set of 6 die-cast construction vehicles including a bulldozer, excavator, and dump truck. Perfect for little engineers.',
    ageGroup: ['3-7 years'],
    material: 'Metal/Plastic',
    stock: 38,
    category: 'Vehicles',
  },
  {
    id: 13,
    name: 'Puzzle Collection for Kids',
    image: 'https://a.media-amazon.com/images/I/910li7k10pL._SY450_.jpg',
    price: 399,
    rating: 4.6,
    ratingCount: 220,
    discount: 11,
    description: 'Pack of 4 colorful jigsaw puzzles with varying difficulty levels. Develops problem-solving and fine motor skills.',
    ageGroup: ['3-6 years'],
    material: 'Cardboard',
    stock: 80,
    category: 'Puzzles',
  },
  {
    id: 14,
    name: 'Play Kitchen Set',
    image: 'https://a.media-amazon.com/images/I/41rjoP5RMAL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 1799,
    rating: 4.8,
    ratingCount: 190,
    discount: 32,
    description: 'Large play kitchen with realistic features like an oven, stove, sink, and storage cabinets. Encourages role-playing.',
    ageGroup: ['3-8 years'],
    material: 'Wood/Plastic',
    stock: 32,
    category: 'Pretend Play',
  },
  {
    id: 15,
    name: 'Outdoor Play Tent',
    image: 'https://a.media-amazon.com/images/I/51KlkXKohFL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 1099,
    rating: 4.5,
    ratingCount: 85,
    discount: 21,
    description: 'Pop-up play tent for indoor and outdoor use. Easy to assemble and provides a fun space for kids to play.',
    ageGroup: ['2-6 years'],
    material: 'Polyester',
    stock: 50,
    category: 'Outdoor Toys',
  },
  {
    id: 16,
    name: 'Drawing Tablet for Kids',
    image: 'https://a.media-amazon.com/images/I/51I7J2alveL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 1399,
    rating: 4.7,
    ratingCount: 140,
    discount: 26,
    description: '8.5-inch LCD writing tablet for kids. Eco-friendly and provides a mess-free way to draw and write.',
    ageGroup: ['3+ years'],
    material: 'Plastic/LCD',
    stock: 65,
    category: 'Art Supplies',
  },
  {
    id: 17,
    name: 'Ride-On Toy Car',
    image: 'https://a.media-amazon.com/images/I/51QdcCdnKaL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 2499,
    rating: 4.6,
    ratingCount: 65,
    discount: 17,
    description: 'Battery-powered ride-on car with realistic sound effects and working headlights. Provides hours of fun.',
    ageGroup: ['2-5 years'],
    material: 'Plastic',
    stock: 15,
    category: 'Vehicles',
  },
  {
    id: 18,
    name: 'Baby Walker with Activities',
    image: 'https://a.media-amazon.com/images/I/41VYkXe3e5L._SX300_SY300_QL70_FMwebp_.jpg',
    price: 1149,
    rating: 4.5,
    ratingCount: 115,
    discount: 23,
    description: 'Multi-functional baby walker with interactive toys and musical features. Helps babies learn to walk and play.',
    ageGroup: ['6-15 months'],
    material: 'Plastic/Fabric',
    stock: 28,
    category: 'Baby & Toddler Toys',
  },
  {
    id: 19,
    name: 'Stacking Rings for Toddlers',
    image: 'https://a.media-amazon.com/images/I/31US-v6XvKL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 299,
    rating: 4.8,
    ratingCount: 255,
    discount: 9,
    description: 'Colorful stacking rings made of safe and non-toxic materials. Develops hand-eye coordination and motor skills.',
    ageGroup: ['6-24 months'],
    material: 'Plastic',
    stock: 90,
    category: 'Baby & Toddler Toys',
  },
  {
    id: 20,
    name: 'Interactive Learning Globe',
    image: 'https://a.media-amazon.com/images/I/51FCX7EZehL._SY300_SX300_QL70_FMwebp_.jpg',
    price: 1699,
    rating: 4.7,
    ratingCount: 175,
    discount: 31,
    description: 'Smart globe with interactive pen that teaches geography, cultures, and more. Features quizzes and games.',
    ageGroup: ['5-12 years'],
    material: 'Plastic/Electronic Components',
    stock: 22,
    category: 'Educational Toys',
  },
  // Include all other toy products from your Toys.jsx here
  // ...
];

const Toysdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = toyProducts.find((item) => item.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedAgeGroup(null);
      setSelectedColor(null);
      setQuantity(1);
    }
  }, [id]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error" mt={4}>
          Product not found.
        </Typography>
      </Container>
    );
  }

  const handleAgeGroupSelect = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.colorOptions && !selectedColor) {
      alert('Please select color');
      return;
    }
    if (product.ageGroup && !selectedAgeGroup) {
      alert('Please select age group');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedAgeGroup,
      selectedColor,
      quantity,
    };

    addToCart(itemToAdd);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (product.colorOptions && !selectedColor) {
      alert('Please select color');
      return;
    }
    if (product.ageGroup && !selectedAgeGroup) {
      alert('Please select age group');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedAgeGroup,
      selectedColor,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  const relatedProducts = toyProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/toys" underline="hover">
          Toys
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Box mt={2}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>{product.name}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ width: '100%', height: { xs: 400, md: 500 }, objectFit: 'contain', backgroundColor: '#f5f5f5' }}
              />
            </Card>

            <Box mt={3}>
              {product.colorOptions && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Color</Typography>
                  <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {product.colorOptions.map((color) => (
                      <Chip
                        key={color}
                        label={color}
                        clickable
                        variant={selectedColor === color ? 'filled' : 'outlined'}
                        color={selectedColor === color ? 'primary' : 'default'}
                        onClick={() => handleColorSelect(color)}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </>
              )}

              {product.ageGroup && (
                <>
                  <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Age Group</Typography>
                  <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {product.ageGroup.map((age) => (
                      <Chip
                        key={age}
                        label={age}
                        clickable
                        variant={selectedAgeGroup === age ? 'filled' : 'outlined'}
                        color={selectedAgeGroup === age ? 'primary' : 'default'}
                        onClick={() => handleAgeGroupSelect(age)}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </>
              )}

              <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Quantity</Typography>
              <Box display="flex" alignItems="center" mt={1} gap={2}>
                <IconButton 
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6">{quantity}</Typography>
                <IconButton 
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= product.stock}
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary" ml={1}>
                  {product.stock} available
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                ₹{(product.price - (product.price * product.discount / 100)).toFixed(2)}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                ₹{product.price}
              </Typography>
              <Chip 
                label={`${product.discount}% OFF`} 
                color="success" 
                size="small" 
                sx={{ fontWeight: 600 }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="textSecondary">
                ({product.ratingCount} reviews)
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" mb={3} sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>

            {product.material && (
              <Typography variant="body1" mb={1}>
                <strong>Material:</strong> {product.material}
              </Typography>
            )}

            <Box display="flex" gap={2} flexWrap="wrap" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={(product.colorOptions && !selectedColor) || (product.ageGroup && !selectedAgeGroup)}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBuyNow}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={(product.colorOptions && !selectedColor) || (product.ageGroup && !selectedAgeGroup)}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {relatedProducts.length > 0 && (
          <Box mt={8}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Similar Toys</Typography>
            <Box sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 3,
              py: 2,
              px: 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}>
              {relatedProducts.map((related) => (
                <Card 
                  key={related.id} 
                  onClick={() => navigate(`/toys/${related.id}`)} 
                  sx={{ 
                    cursor: 'pointer',
                    minWidth: 280,
                    flexShrink: 0,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={related.image}
                    alt={related.name}
                    sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', p: 2 }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>{related.name}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Typography variant="body1" fontWeight={600}>
                        ₹{(related.price - (related.price * related.discount / 100)).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                        ₹{related.price}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        {related.discount}% off
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Rating value={related.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" color="textSecondary">
                        ({related.ratingCount})
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Toysdetail;