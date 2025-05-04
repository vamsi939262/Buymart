import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './Cart/CartContext';
import {
  Container, Grid, Typography, Card, CardMedia, CardContent, Box, Rating,
  Button, Chip, Divider, IconButton, Breadcrumbs, Link
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const groceryProducts = [
  {
    id: 1,
    name: 'Organic Brown Rice',
    image: 'https://i.pinimg.com/736x/7c/9d/c1/7c9dc1008678528992d723fbe7999bde.jpg',
    price: 120,
    rating: 4.6,
    ratingCount: 230,
    discount: 20,
    description: 'Premium quality organic brown rice packed with nutrients and fiber. Grown without chemical pesticides or fertilizers.',
    weight: ['500g', '1kg', '5kg'],
    stock: 100,
    category: 'Rice & Grains',
  },
  {
    id: 2,
    name: 'Whole Wheat Atta - 5kg',
    image: 'https://i.pinimg.com/474x/4e/1e/ab/4e1eabe5896e29111f812169d33f7256.jpg',
    price: 250,
    rating: 4.4,
    ratingCount: 180,
    discount: 10,
    description: '100% whole wheat flour stone ground to preserve nutrients. Perfect for making chapatis, parathas and other Indian breads.',
    weight: ['1kg', '5kg', '10kg'],
    stock: 75,
    category: 'Flour & Grains',
  },
  {
    id: 3,
    name: 'Almonds - 500g',
    image: 'https://i.pinimg.com/474x/f7/63/45/f7634512c5892286b9068e706a69f7ac.jpg',
    price: 380,
    rating: 4.7,
    ratingCount: 310,
    discount: 15,
    description: 'Premium California almonds, rich in vitamin E and healthy fats. Great for snacking or adding to recipes.',
    weight: ['250g', '500g', '1kg'],
    stock: 50,
    category: 'Dry Fruits & Nuts',
  },
  {
    id: 4,
    name: 'Honey - 1kg Bottle',
    image: 'https://i.pinimg.com/474x/44/97/69/449769e5626d5a5a135fb91e670509dc.jpg',
    price: 299,
    rating: 4.5,
    ratingCount: 190,
    discount: 25,
    description: 'Pure, raw honey collected from wildflowers. Unprocessed and unpasteurized to retain natural enzymes and health benefits.',
    weight: ['250g', '500g', '1kg'],
    stock: 60,
    category: 'Sweeteners',
  },
  {
    id: 5,
    name: 'Cold Pressed Coconut Oil',
    image: 'https://i.pinimg.com/474x/6a/10/9f/6a109fc8f2f3c1371a55126d6d1f98aa.jpg',
    price: 399,
    rating: 4.8,
    ratingCount: 275,
    discount: 30,
    description: 'Virgin coconut oil extracted without heat to preserve nutrients. Excellent for cooking, hair care and skin moisturizing.',
    weight: ['250ml', '500ml', '1L'],
    stock: 40,
    category: 'Oils',
  },
  {
    id: 6,
    name: 'Organic Turmeric Powder - 250g',
    image: 'https://i.pinimg.com/474x/98/c3/62/98c362b78374fa833368a932c56b8fa5.jpg',
    price: 149,
    rating: 4.6,
    ratingCount: 210,
    discount: 20,
    description: 'Pure organic turmeric powder with high curcumin content. Adds vibrant color and health benefits to dishes.',
    weight: ['100g', '250g', '500g'],
    stock: 80,
    category: 'Spices',
  },
  {
    id: 7,
    name: 'A2 Desi Cow Ghee - 500ml',
    image: 'https://i.pinimg.com/474x/9f/c8/93/9fc893a214b4df6034b8739a0389d858.jpg',
    price: 599,
    rating: 4.9,
    ratingCount: 340,
    discount: 15,
    description: 'Traditional Indian ghee made from A2 milk of indigenous cow breeds. Rich in nutrients and perfect for Ayurvedic cooking.',
    weight: ['250ml', '500ml', '1L'],
    stock: 30,
    category: 'Dairy',
  },
  {
    id: 8,
    name: 'Brown Rice - 5kg Bag',
    image: 'https://i.pinimg.com/474x/7f/d5/d0/7fd5d09d8846d59c2bb3974cee314a79.jpg',
    price: 499,
    rating: 4.4,
    ratingCount: 180,
    discount: 18,
    description: 'Unpolished brown rice with bran layer intact. High in fiber and nutrients compared to white rice.',
    weight: ['1kg', '5kg', '10kg'],
    stock: 45,
    category: 'Rice & Grains',
  },
  {
    id: 9,
    name: 'Whole Urad Dal - 1kg',
    image: 'https://i.pinimg.com/474x/31/0e/6f/310e6f13f996b893a723b87425741b5a.jpg',
    price: 199,
    rating: 4.3,
    ratingCount: 120,
    discount: 22,
    description: 'Premium quality whole black gram lentils. Excellent source of protein for vegetarian diets.',
    weight: ['500g', '1kg', '5kg'],
    stock: 65,
    category: 'Pulses',
  },
  {
    id: 10,
    name: 'Multi-Grain Atta - 5kg',
    image: 'https://i.pinimg.com/474x/a4/d8/46/a4d8462b831c9e0fc147ea7f615de4a3.jpg',
    price: 349,
    rating: 4.7,
    ratingCount: 230,
    discount: 25,
    description: 'Nutritious blend of 7 whole grains including wheat, soya, oats, chana, maize, barley and ragi.',
    weight: ['1kg', '5kg', '10kg'],
    stock: 55,
    category: 'Flour & Grains',
  },
  {
    id: 11,
    name: 'Raw Forest Honey - 500g',
    image: 'https://i.pinimg.com/474x/2f/9b/33/2f9b33eeab0fdd707f0d7160b00802cc.jpg',
    price: 259,
    rating: 4.5,
    ratingCount: 200,
    discount: 10,
    description: 'Wild forest honey collected sustainably from deep forests. Contains natural pollen and propolis for added health benefits.',
    weight: ['250g', '500g', '1kg'],
    stock: 40,
    category: 'Sweeteners',
  },
  {
    id: 12,
    name: 'Rock Salt (Sendha Namak) - 1kg',
    image: 'https://i.pinimg.com/474x/61/10/f5/6110f5e4e8f66b681a35b39a608b6cb1.jpg',
    price: 89,
    rating: 4.4,
    ratingCount: 95,
    discount: 12,
    description: 'Natural unrefined salt mined from ancient sea deposits. Contains 84+ trace minerals essential for health.',
    weight: ['500g', '1kg', '5kg'],
    stock: 90,
    category: 'Spices',
  },
  {
    id: 13,
    name: 'Chia Seeds - 250g Pack',
    image: 'https://i.pinimg.com/474x/8a/66/5a/8a665af0cd6243e4c2561ad02268152c.jpg',
    price: 179,
    rating: 4.7,
    ratingCount: 170,
    discount: 28,
    description: 'Superfood chia seeds packed with omega-3, fiber and protein. Great for puddings, smoothies and baking.',
    weight: ['100g', '250g', '500g'],
    stock: 60,
    category: 'Superfoods',
  },
  {
    id: 14,
    name: 'Organic Jaggery Powder - 1kg',
    image: 'https://i.pinimg.com/736x/66/8f/0e/668f0e357688ce9e4de9d54d9067bdaa.jpg',
    price: 159,
    rating: 4.6,
    ratingCount: 150,
    discount: 20,
    description: 'Unrefined organic jaggery powder made from sugarcane juice. Natural sweetener rich in iron and minerals.',
    weight: ['500g', '1kg', '2kg'],
    stock: 70,
    category: 'Sweeteners',
  },
  {
    id: 15,
    name: 'Rolled Oats - 1kg',
    image: 'https://i.pinimg.com/474x/56/d3/ee/56d3ee2011d4be86e4bb0713a5e96781.jpg',
    price: 229,
    rating: 4.5,
    ratingCount: 200,
    discount: 26,
    description: '100% whole grain oats rolled for quick cooking. High in soluble fiber for heart health and digestion.',
    weight: ['500g', '1kg', '2kg'],
    stock: 50,
    category: 'Breakfast',
  },
  {
    id: 16,
    name: 'Green Tea - 100g Loose Leaf',
    image: 'https://i.pinimg.com/474x/c4/c0/35/c4c03535a8441f1862a16a1303d1aad5.jpg',
    price: 139,
    rating: 4.2,
    ratingCount: 110,
    discount: 15,
    description: 'Premium loose leaf green tea from Darjeeling. Rich in antioxidants and provides gentle caffeine boost.',
    weight: ['50g', '100g', '250g'],
    stock: 85,
    category: 'Beverages',
  }
];

const GroceryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = groceryProducts.find((item) => item.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
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
    if (!selectedWeight) {
      alert('Please select weight');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedWeight,
      quantity,
    };

    addToCart(itemToAdd);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedWeight) {
      alert('Please select weight');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedWeight,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  const relatedProducts = groceryProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/groceries" underline="hover">
          Groceries
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
                sx={{ width: '100%', height: { xs: 400, md: 500 }, objectFit: 'cover' }}
              />
            </Card>

            <Box mt={3}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Available Weights</Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                {product.weight.map((weight) => (
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

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={!selectedWeight}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBuyNow}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={!selectedWeight}
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
                  onClick={() => navigate(`/groceries/${related.id}`)} 
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
                    sx={{ objectFit: 'cover' }}
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

export default GroceryDetail;