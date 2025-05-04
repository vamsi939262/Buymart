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

const sportsProducts = [
    {
        id: 1,
        name: 'Running Shoes - Men',
        image: 'https://i.pinimg.com/474x/a7/51/e5/a751e57f89884241885cbf7a18ee4078.jpg',
        price: 3499,
        rating: 4.7,
        ratingCount: 420,
        discount: 30,
        description: 'High-performance running shoes for men, providing excellent cushioning and support for long-distance runs.',
        material: 'Mesh, Rubber',
        sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
        stock: 45,
        category: 'Footwear',
      },
      {
        id: 2,
        name: 'Yoga Mat - Premium',
        image: 'https://i.pinimg.com/474x/d0/fb/9a/d0fb9a86ce516eecdb209e588f31b740.jpg',
        price: 1299,
        rating: 4.5,
        ratingCount: 180,
        discount: 25,
        description: 'Extra thick and non-slip yoga mat for comfortable and stable workouts. Ideal for all types of yoga and pilates.',
        material: 'TPE',
        thickness: '6mm',
        colorOptions: ['Blue', 'Purple', 'Green'],
        stock: 60,
        category: 'Accessories',
      },
      {
        id: 3,
        name: 'Wireless Sports Headphones',
        image: 'https://i.pinimg.com/474x/61/1a/d4/611ad494ef9e71dff6a45462ee55cef0.jpg',
        price: 2499,
        rating: 4.3,
        ratingCount: 310,
        discount: 20,
        description: 'Sweat-proof and secure-fit wireless headphones designed for sports and workouts. Offers high-quality sound and long battery life.',
        features: ['Bluetooth 5.0', 'Waterproof IPX7', 'Built-in Microphone'],
        stock: 30,
        category: 'Electronics',
      },
      {
        id: 4,
        name: 'Fitness Tracker Smartwatch',
        image: 'https://i.pinimg.com/736x/15/b5/d1/15b5d17d9ef37c4ce1464747aa65580b.jpg',
        price: 3999,
        rating: 4.6,
        ratingCount: 290,
        discount: 35,
        description: 'Advanced smartwatch with comprehensive fitness tracking features, including heart rate monitoring, GPS, and sleep analysis.',
        features: ['Heart Rate Monitor', 'GPS', 'Step Counter', 'Sleep Tracking'],
        stock: 25,
        category: 'Electronics',
      },
      {
        id: 5,
        name: 'Dumbbell Set - 10kg',
        image: 'https://i.pinimg.com/736x/ed/16/12/ed16127406b30a5d21a36ebabb27dc79.jpg',
        price: 1799,
        rating: 4.4,
        ratingCount: 150,
        discount: 15,
        description: 'Adjustable dumbbell set with a total weight of 10kg. Perfect for strength training at home.',
        includes: ['2 x Handles', '4 x 1kg Plates', '4 x 0.5kg Plates'],
        material: 'Steel, Rubber',
        stock: 40,
        category: 'Equipment',
      },
      {
        id: 6,
        name: 'Cycling Helmet',
        image: 'https://i.pinimg.com/474x/b3/86/55/b386550ca94a79b391d178f9b9b8c5a4.jpg',
        price: 1599,
        rating: 4.8,
        ratingCount: 230,
        discount: 40,
        description: 'Lightweight and aerodynamic cycling helmet with multiple vents for optimal airflow and safety.',
        material: 'EPS Foam, Polycarbonate Shell',
        sizes: ['S', 'M', 'L'],
        stock: 35,
        category: 'Accessories',
      },
      {
        id: 7,
        name: 'Resistance Bands Set',
        image: 'https://i.pinimg.com/736x/0d/e2/fe/0de2fe9eb90aab0d7ab98efabc73b324.jpg',
        price: 899,
        rating: 4.2,
        ratingCount: 190,
        discount: 20,
        description: 'Set of five color-coded resistance bands with varying levels of resistance for versatile workouts.',
        includes: ['Light', 'Medium', 'Heavy', 'X-Heavy', 'XX-Heavy'],
        material: 'Latex',
        stock: 70,
        category: 'Equipment',
      },
      {
        id: 8,
        name: 'Sports Water Bottle',
        image: 'https://i.pinimg.com/474x/7c/2e/ec/7c2eecb46ff00ad985a5c1681987c129.jpg',
        price: 499,
        rating: 4.6,
        ratingCount: 270,
        discount: 10,
        description: 'Durable and leak-proof sports water bottle with a convenient flip-top lid. Perfect for staying hydrated during workouts.',
        capacity: '750ml',
        material: 'Tritan Plastic',
        colorOptions: ['Black', 'Red', 'Silver'],
        stock: 80,
        category: 'Accessories',
      },
      {
        id: 9,
        name: 'Football - Size 5',
        image: 'https://i.pinimg.com/474x/19/bd/e1/19bde1bd25fe16d2f972cbba185ac0ae.jpg',
        price: 1299,
        rating: 4.5,
        ratingCount: 140,
        discount: 25,
        description: 'Official size 5 football, ideal for training and matches. Offers excellent grip and durability.',
        material: 'Synthetic Leather',
        stock: 50,
        category: 'Team Sports',
      },
      {
        id: 10,
        name: 'Badminton Racket - Pro',
        image: 'https://i.pinimg.com/474x/c6/78/3a/c6783a99b27ac9a8ae498e70c405d717.jpg',
        price: 1999,
        rating: 4.7,
        ratingCount: 210,
        discount: 30,
        description: 'Lightweight and high-performance badminton racket designed for professional players. Provides excellent control and power.',
        material: 'Graphite',
        weight: '85g',
        stock: 30,
        category: 'Racquet Sports',
      },
      {
        id: 11,
        name: 'Gym Gloves',
        image: 'https://i.pinimg.com/736x/d4/6f/47/d46f479551188256f1c11be8ebcaab93.jpg',
        price: 599,
        rating: 4.3,
        ratingCount: 180,
        discount: 15,
        description: 'Breathable and durable gym gloves with wrist support for comfortable and safe weightlifting.',
        material: 'Leather, Neoprene',
        sizes: ['S', 'M', 'L'],
        stock: 65,
        category: 'Accessories',
      },
      {
        id: 12,
        name: 'Jump Rope - Speed',
        image: 'https://i.pinimg.com/736x/a5/2c/01/a52c01cc5d2e750d6fa47e0eca711b3f.jpg',
        price: 399,
        rating: 4.4,
        ratingCount: 120,
        discount: 10,
        description: 'High-speed jump rope with adjustable length and comfortable handles for effective cardio workouts.',
        material: 'Steel Wire, PVC',
        length: '3m (Adjustable)',
        stock: 90,
        category: 'Equipment',
      },
      {
        id: 13,
        name: 'Yoga Block Set',
        image: 'https://i.pinimg.com/474x/88/d9/a1/88d9a1619a02373d97cd3ff17240e7da.jpg',
        price: 699,
        rating: 4.6,
        ratingCount: 90,
        discount: 20,
        description: 'Set of two durable and lightweight yoga blocks to support and deepen your yoga poses.',
        material: 'EVA Foam',
        dimensions: '9" x 6" x 4"',
        colorOptions: ['Grey', 'Pink', 'Teal'],
        stock: 55,
        category: 'Accessories',
      },
      {
        id: 14,
        name: 'Treadmill - Foldable',
        image: 'https://i.pinimg.com/474x/1c/9e/8f/1c9e8f11c07415480f77c58e84c31753.jpg',
        price: 24999,
        rating: 4.8,
        ratingCount: 150,
        discount: 40,
        description: 'Compact and foldable treadmill with adjustable speed and incline levels for home workouts.',
        features: ['LCD Display', 'Multiple Programs', 'Foldable Design'],
        maxSpeed: '12 km/h',
        stock: 15,
        category: 'Equipment',
      },
      {
        id: 15,
        name: 'Sports Sunglasses',
        image: 'https://i.pinimg.com/474x/57/0c/4e/570c4e9cb41fc888adbc6d17cfc4869c.jpg',
        price: 1299,
        rating: 4.5,
        ratingCount: 210,
        discount: 25,
        description: 'Lightweight and durable sports sunglasses with UV protection for outdoor activities.',
        lensMaterial: 'Polycarbonate',
        frameMaterial: 'TR90',
        colorOptions: ['Black/Red', 'Blue/White', 'Green/Black'],
        stock: 40,
        category: 'Accessories',
      },
      {
        id: 16,
        name: 'Foam Roller',
        image: 'https://i.pinimg.com/474x/72/0b/57/720b57604407a93dad1005571f492794.jpg',
        price: 899,
        rating: 4.4,
        ratingCount: 130,
        discount: 15,
        description: 'High-density foam roller for muscle recovery and pain relief. Ideal for post-workout massage.',
        material: 'EVA Foam',
        dimensions: '18" x 6"',
        stock: 75,
        category: 'Equipment',
      },
      {
        id: 17,
        name: 'Basketball - Official Size',
        image: 'https://i.pinimg.com/736x/21/cd/45/21cd451bae3d60eb875ee903ca6c41a1.jpg',
        price: 1499,
        rating: 4.7,
        ratingCount: 110,
        discount: 20,
        description: 'Official size and weight basketball for professional play and training. Offers excellent grip and bounce.',
        material: 'Composite Leather',
        stock: 35,
        category: 'Team Sports',
      },
      {
        id: 18,
        name: 'Sports Backpack',
        image: 'https://i.pinimg.com/736x/44/93/96/44939623956f7e83b821ee851005e38a.jpg',
        price: 1799,
        rating: 4.6,
        ratingCount: 190,
        discount: 30,
        description: 'Durable and spacious sports backpack with multiple compartments for organizing your gear.',
        capacity: '30L',
        material: 'Polyester',
        colorOptions: ['Black/Grey', 'Blue/Black', 'Red/Black'],
        stock: 50,
        category: 'Accessories',
      },
      {
        id: 19,
        name: 'Swimming Goggles',
        image: 'https://i.pinimg.com/736x/1a/99/8f/1a998f6bc0368a489103ed429d6a1244.jpg',
        price: 799,
        rating: 4.3,
        ratingCount: 160,
        discount: 10,
        description: 'Anti-fog and UV-protected swimming goggles for clear vision and eye protection in the water.',
        lensMaterial: 'Polycarbonate',
        strapMaterial: 'Silicone',
        colorOptions: ['Blue', 'Black', 'Clear'],
        stock: 70,
        category: 'Water Sports',
      },
      {
        id: 20,
        name: 'Exercise Bike',
        image: 'https://i.pinimg.com/736x/06/1a/e1/061ae1bbd86b7bed50dc63b64b8bc276.jpg',
        price: 18999,
        rating: 4.9,
        ratingCount: 210,
        discount: 45,
        description: 'Indoor exercise bike with adjustable resistance levels and a comfortable seat for effective cardio workouts at home.',
        features: ['LCD Monitor', 'Adjustable Resistance', 'Comfort Seat'],
        maxWeightCapacity: '120kg',
        stock: 10,
        category: 'Equipment',
      }
];

const Sportsdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = sportsProducts.find((item) => item.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedAgeGroup(null);
      setSelectedColor(null);
      setSelectedSize(null);
      setSelectedWeight(null);
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

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleWeightSelect = (weight) => {
    setSelectedWeight(weight);
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
    if (product.sizeOptions && !selectedSize) {
      alert('Please select size');
      return;
    }
    if (product.weightOptions && !selectedWeight) {
      alert('Please select weight');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedAgeGroup,
      selectedColor,
      selectedSize,
      selectedWeight,
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
    if (product.sizeOptions && !selectedSize) {
      alert('Please select size');
      return;
    }
    if (product.weightOptions && !selectedWeight) {
      alert('Please select weight');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedAgeGroup,
      selectedColor,
      selectedSize,
      selectedWeight,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  const relatedProducts = sportsProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/sports" underline="hover">
          Sports
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

              {product.sizeOptions && (
                <>
                  <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Size</Typography>
                  <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {product.sizeOptions.map((size) => (
                      <Chip
                        key={size}
                        label={size}
                        clickable
                        variant={selectedSize === size ? 'filled' : 'outlined'}
                        color={selectedSize === size ? 'primary' : 'default'}
                        onClick={() => handleSizeSelect(size)}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </>
              )}

              {product.weightOptions && (
                <>
                  <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Weight</Typography>
                  <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {product.weightOptions.map((weight) => (
                      <Chip
                        key={weight}
                        label={weight}
                        clickable
                        variant={selectedWeight === weight ? 'filled' : 'outlined'}
                        color={selectedWeight === weight ? 'primary' : 'default'}
                        onClick={() => handleWeightSelect(weight)}
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
                disabled={
                  (product.colorOptions && !selectedColor) || 
                  (product.ageGroup && !selectedAgeGroup) ||
                  (product.sizeOptions && !selectedSize) ||
                  (product.weightOptions && !selectedWeight)
                }
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBuyNow}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={
                  (product.colorOptions && !selectedColor) || 
                  (product.ageGroup && !selectedAgeGroup) ||
                  (product.sizeOptions && !selectedSize) ||
                  (product.weightOptions && !selectedWeight)
                }
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {relatedProducts.length > 0 && (
          <Box mt={8}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Similar Sports Products</Typography>
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
                  onClick={() => navigate(`/sports/${related.id}`)} 
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

export default Sportsdetail;