import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Typography, Card, CardMedia, CardContent, Box, Rating,
  Button, Chip, Divider, IconButton, Breadcrumbs, Link
} from '@mui/material';
import { useCart } from './Cart/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const electronicsProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S23 Ultra',
    image: 'https://i.pinimg.com/474x/5b/d8/93/5bd893c5ec4277bc4cff54fbb3e79afb.jpg',
    price: 11199,
    rating: 4.8,
    ratingCount: 250,
    description: 'The latest flagship from Samsung with a powerful camera and S Pen.',
    discount: 10,
    stock: 50,
    colors: ['Phantom Black', 'Green', 'Lavender'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '200MP + 12MP + 10MP + 10MP',
      battery: '5000mAh'
    }
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
    stock: 40,
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP + 12MP + 12MP',
      battery: '3200mAh'
    }
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
    stock: 60,
    colors: ['Snow', 'Obsidian', 'Lemongrass'],
    storage: ['128GB', '256GB'],
    specs: {
      display: '6.3" OLED',
      processor: 'Google Tensor G2',
      camera: '50MP + 12MP',
      battery: '4355mAh'
    }
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
    stock: 45,
    colors: ['Titan Black', 'Eternal Green'],
    storage: ['128GB', '256GB'],
    specs: {
      display: '6.7" AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP + 48MP + 32MP',
      battery: '5000mAh'
    }
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
    stock: 35,
    colors: ['Ceramic White', 'Ceramic Black'],
    storage: ['256GB', '512GB'],
    specs: {
      display: '6.73" AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50.3MP + 50MP + 50MP',
      battery: '4820mAh'
    }
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
  stock: 50,
  colors: ['Black', 'Silver'],
  storage: ['32GB', '64GB' ],
  specs: {
    type: 'Over-Ear',
    battery: '30 hours',
    features: 'Noise Cancelling, Touch Controls',
    connectivity: 'Bluetooth 5.2'
  }
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
  stock: 20,
  colors: ['Platinum Silver', 'Frost White'],
  storage: ['512GB SSD', '1TB SSD'],
  specs: {
    display: '13.4" FHD+',
    processor: 'Intel Core i7 13th Gen',
    RAM: '16GB LPDDR5',
    battery: '52Wh'
  }
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
  stock: 45,
  colors: ['Starlight', 'Midnight', 'Silver'],
  storage: ['8GB'],
  specs: {
    display: 'Always-On Retina',
    processor: 'S9 SiP',
    battery: '18 hours',
    features: 'Blood Oxygen, ECG, Double Tap'
  }
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
  stock: 15,
  colors: ['Black', 'White'],
  storage: ['32GB', '64GB'],
  specs: {
    sensor: '24.2MP APS-C CMOS',
    video: '4K UHD 30p',
    lensMount: 'Canon RF',
    connectivity: 'Wi-Fi, Bluetooth'
  }
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
  stock: 100,
  colors: ['Graphite', 'Pale Gray'],
  storage: ['NONE'],
  specs: {
    sensor: 'Darkfield 8000 DPI',
    connectivity: 'Bluetooth, USB-C',
    features: 'MagSpeed scroll, Custom buttons',
    battery: '70 days'
  }
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
  stock: 60,
  colors: ['White'],
  storage: ['NONE'],
  specs: {
    driver: 'Custom Apple driver',
    chip: 'H2 chip',
    battery: '6 hours (buds), 30 hours (case)',
    features: 'ANC, Transparency, Spatial Audio'
  }
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
  stock: 40,
  colors: ['Graphite', 'Pink Gold', 'Silver'],
  storage: ['16GB'],
  specs: {
    display: '1.4" Super AMOLED',
    processor: 'Exynos W920',
    battery: '410mAh',
    features: 'Heart Rate, Sleep, GPS'
  }
}

  
];

const ElectronicsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    const fetchedProduct = electronicsProducts.find((item) => item.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedColor(null);
      setSelectedStorage(null);
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

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
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
    if (!selectedColor || !selectedStorage) {
      alert('Please select color and storage option');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedColor,
      selectedStorage,
      quantity,
    };

    addToCart(itemToAdd);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedStorage) {
      alert('Please select color and storage option');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedColor,
      selectedStorage,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  const relatedProducts = electronicsProducts.filter(
    (item) => item.id !== product.id
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/electronics" underline="hover">
          Electronics
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
                sx={{ width: '100%', height: { xs: 400, md: 500 }, objectFit: 'contain', p: 2 }}
              />
            </Card>

            <Box mt={3}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Color</Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                {product.colors.map((color) => (
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

              <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Storage</Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                {product.storage.map((storage) => (
                  <Chip
                    key={storage}
                    label={storage}
                    clickable
                    variant={selectedStorage === storage ? 'filled' : 'outlined'}
                    color={selectedStorage === storage ? 'primary' : 'default'}
                    onClick={() => handleStorageSelect(storage)}
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Box>

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
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="textSecondary">
                ({product.ratingCount} reviews)
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" mb={3} sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>

            <Box mb={4}>
              <Typography variant="h6" mb={2} sx={{ fontWeight: 500 }}>Specifications</Typography>
              <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 1 }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <Box key={key} display="flex" justifyContent="space-between" py={1}>
                    <Typography variant="body1" color="textSecondary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={!selectedColor || !selectedStorage}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBuyNow}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={!selectedColor || !selectedStorage}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {relatedProducts.length > 0 && (
          <Box mt={8}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>You May Also Like</Typography>
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
                  onClick={() => navigate(`/electronics/${related.id}`)} 
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
                    sx={{ objectFit: 'contain', p: 2 }}
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
                    <Rating value={related.rating} precision={0.1} readOnly size="small" sx={{ mt: 1 }} />
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

export default ElectronicsDetails;