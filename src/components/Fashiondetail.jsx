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

const fashionProducts = [
  {
    id: 1,
    name: 'Cotton Crew Neck T-Shirt',
    image: 'https://i.pinimg.com/736x/58/2b/9a/582b9a0c2a186e203065faa8c3ad5b3a.jpg',
    price: 499,
    rating: 4.5,
    ratingCount: 780,
    discount: 75,
    description: 'Soft cotton T-shirt with crew neck, short sleeves, and regular fit.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Red', 'Blue', 'Green', 'Black'],
    stock: 50,
    category: 'T-Shirts',
    colorImages: {
      Blue: 'https://i.pinimg.com/736x/58/2b/9a/582b9a0c2a186e203065faa8c3ad5b3a.jpg',
      Red: 'https://i.pinimg.com/736x/95/cb/18/95cb1867cd3c2a1989c5b5254de963a6.jpg',
      Green: 'https://i.pinimg.com/736x/c4/df/89/c4df8991b907868440c3a4101e2f9095.jpg',
      Black: 'https://i.pinimg.com/736x/f5/9a/e1/f59ae1e9dc033a0a77eae433a3d8697d.jpg',
    },
  },
  {
    id: 2,
    name: 'Slim Fit Jeans - Blue',
    image: 'https://i.pinimg.com/736x/8c/cd/04/8ccd04d276d45ae7140c53bbed4ed6a0.jpg',
    price: 799,
    rating: 4.2,
    ratingCount: 90,
    discount: 20,
    description: 'Classic slim fit jeans with mid-rise waist, button fly, and stretchable denim.',
    size: ['28', '30', '32', '34'],
    color: ['Blue', 'Black'],
    stock: 30,
    category: 'Jeans',
    colorImages: {
      Blue: 'https://i.pinimg.com/736x/8c/cd/04/8ccd04d276d45ae7140c53bbed4ed6a0.jpg',
      Black: 'https://i.pinimg.com/474x/a5/f8/1c/a5f81ca13cb239fda50f8a5bd4cd1471.jpg',
    },
  },
  {
    id: 3,
    name: 'Sneakers Men',
    image: 'https://i.pinimg.com/474x/8b/c2/06/8bc206b782f9bf29540c814e853a269e.jpg',
    price: 1299,
    rating: 4.7,
    ratingCount: 230,
    discount: 30,
    description: 'Timeless white sneakers with cushioned sole and breathable material, perfect for everyday wear.',
    size: ['6', '7', '8', '9', '10'],
    color: ['Beige', 'Black'],
    stock: 40,
    category: 'Footwear',
    colorImages: {
      Beige: 'https://i.pinimg.com/474x/8b/c2/06/8bc206b782f9bf29540c814e853a269e.jpg',
      Black: 'https://i.pinimg.com/736x/c3/af/78/c3af78b56f5c49ef7f5ce2ed09d083ec.jpg'
    },
  },
  {
    id: 4,
    name: 'Leather Handbag',
    image: 'https://i.pinimg.com/474x/31/ea/30/31ea304dc17ed396a253db9adc125f36.jpg',
    price: 1599,
    rating: 4.6,
    ratingCount: 150,
    discount: 40,
    description: 'Elegant leather handbag with a spacious compartment, adjustable strap, and zip closure.',
    size: ['Standard'],
    color: ['Brown', 'Black', 'Beige'],
    stock: 25,
    category: 'Accessories',
    colorImages: {
      Brown: 'https://i.pinimg.com/474x/31/ea/30/31ea304dc17ed396a253db9adc125f36.jpg',
      Black: 'https://i.pinimg.com/474x/3f/6e/c6/3f6ec62bbbe46f666b9f8c86725d9d15.jpg',
      Beige: 'https://i.pinimg.com/474x/54/14/75/541475e7d69219a38854342335c15e3a.jpg'
    },
  },
  {
    id: 5,
    name: 'Formal Blazer',
    image: 'https://i.pinimg.com/474x/e4/ee/36/e4ee366faa3118d39e9997e4f8e3ba5c.jpg',
    price: 2499,
    rating: 4.3,
    ratingCount: 85,
    discount: 25,
    description: 'Stylish formal blazer with a notched collar and slim fit tailoring, ideal for business and events.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'Gray'],
    stock: 18,
    category: 'Blazers',
    colorImages: {
      Black: 'https://i.pinimg.com/474x/e4/ee/36/e4ee366faa3118d39e9997e4f8e3ba5c.jpg',
      Gray: 'https://i.pinimg.com/474x/25/8e/1b/258e1bf386d0fa18ed8847e6c86c6a42.jpg'
    },
  },
  {
    id: 6,
    name: 'Unisex Oversized Hoodie',
    image: 'https://i.pinimg.com/474x/5d/8d/d4/5d8dd4cea275a9cea16c5ce583f53854.jpg',
    price: 1199,
    rating: 4.8,
    ratingCount: 320,
    discount: 45,
    description: 'Trendy oversized hoodie made with ultra-soft fleece, drop shoulders, and a relaxed streetwear look. Perfect for cozy days and bold statements.',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    color: ['Orange', 'Beige', 'Charcoal', 'Lavender'],
    stock: 60,
    category: 'Hoodies',
    colorImages: {
      Orange: 'https://i.pinimg.com/474x/5d/8d/d4/5d8dd4cea275a9cea16c5ce583f53854.jpg',
      Beige: 'https://i.pinimg.com/474x/b7/b8/9f/b7b89fc5d92265b96b1287e94effcc10.jpg',
      Charcoal: 'https://i.pinimg.com/474x/13/16/9e/13169ec94fe06d5a9fd79fd414a0655f.jpg',
      Lavender: 'https://i.pinimg.com/474x/0a/aa/ca/0aaacadbeece113795d610aabad8f57d.jpg',
    },
  },
  {
    id: 7,
    name: 'Denim Jacket',
    image: 'https://i.pinimg.com/474x/e4/65/83/e46583dbf08a14907c28d7e3f64c9845.jpg',
    price: 1799,
    rating: 4.4,
    ratingCount: 210,
    discount: 30,
    description: 'Classic denim jacket with button closure, two chest pockets, and a comfortable fit.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Blue', 'Black'],
    stock: 40,
    category: 'Jackets',
    colorImages: {
      Blue: 'https://i.pinimg.com/474x/e4/65/83/e46583dbf08a14907c28d7e3f64c9845.jpg',
      Black: 'https://i.pinimg.com/474x/75/d0/8f/75d08f215fe58895ded4a5239d6973e3.jpg',
    },
  },
  {
    id: 8,
    name: 'Chinos - Beige',
    image: 'https://i.pinimg.com/474x/f7/d9/35/f7d935cf3ce5ee0456f9cff4a48fd8d0.jpg',
    price: 899,
    rating: 4.1,
    ratingCount: 150,
    discount: 15,
    description: 'Comfortable and stylish beige chinos made from soft cotton with a regular fit.',
    size: ['28', '30', '32', '34'],
    color: ['Beige', 'Navy'],
    stock: 35,
    category: 'Pants',
    colorImages: {
      Beige: 'https://i.pinimg.com/474x/f7/d9/35/f7d935cf3ce5ee0456f9cff4a48fd8d0.jpg',
      Navy: 'https://i.pinimg.com/474x/0d/d8/f0/0dd8f0d336bc1380a2ad9ad6db5b9697.jpg',
    },
  },
  {
    id: 9,
    name: 'Canvas Backpack',
    image: 'https://i.pinimg.com/474x/09/33/5a/09335aee6b2d03e7931681ac44f15b9e.jpg',
    price: 799,
    rating: 4.6,
    ratingCount: 120,
    discount: 35,
    description: 'Spacious canvas backpack with multiple compartments, adjustable straps, and a stylish design.',
    size: ['Standard'],
    color: ['Gray', 'Black'],
    stock: 45,
    category: 'Accessories',
    colorImages: {
      Gray: 'https://i.pinimg.com/474x/09/33/5a/09335aee6b2d03e7931681ac44f15b9e.jpg',
      Black: 'https://i.pinimg.com/474x/08/43/84/084384c4265e6ac013fa98f182d902e2.jpg',
    },
  },
  {
    id: 10,
    name: 'Woolen Scarf',
    image: 'https://i.pinimg.com/474x/84/3a/fc/843afc619073c1deb6361b1eb13febbc.jpg',
    price: 499,
    rating: 4.7,
    ratingCount: 60,
    discount: 50,
    description: 'Cozy woolen scarf in a classic design, perfect for keeping warm during the winter.',
    size: ['Standard'],
    color: ['Red', 'Gray'],
    stock: 30,
    category: 'Accessories',
    colorImages: {
      Red: 'https://i.pinimg.com/474x/84/3a/fc/843afc619073c1deb6361b1eb13febbc.jpg',
      Gray: 'https://i.pinimg.com/474x/8b/03/8d/8b038d0ec957a9763b814b627acf173f.jpg',
    },
  },
  {
    id: 11,
    name: 'Cotton Sleeveless Top',
    image: 'https://i.pinimg.com/474x/fd/cf/93/fdcf939c67cad577e6e10c916a448d65.jpg',
    price: 399,
    rating: 4.4,
    ratingCount: 210,
    discount: 15,
    description: 'Lightweight cotton sleeveless top perfect for warm weather, with a relaxed fit and stylish design.',
    size: ['S', 'M', 'L'],
    color: ['White', 'Pink', 'Yellow'],
    stock: 100,
    category: 'Tops',
    colorImages: {
      White: 'https://i.pinimg.com/474x/fd/cf/93/fdcf939c67cad577e6e10c916a448d65.jpg',
      Pink: 'https://i.pinimg.com/474x/ac/18/2f/ac182f78593a18499b24bce4958e0f9c.jpg',
      Yellow: 'https://i.pinimg.com/474x/ea/d2/65/ead2656d862d31bffe035efab04cadfd.jpg',
    },
  },
  
  {
    id: 12,
    name: 'Chunky Sneakers - White/Red',
    image: 'https://i.pinimg.com/474x/bb/01/58/bb01585c85cd801e8c045897d2e6bd00.jpg',
    price: 2199,
    rating: 4.5,
    ratingCount: 150,
    discount: 30,
    description: 'Fashion-forward chunky sneakers with a bold mix of white and red, perfect for a streetwear look.',
    size: ['7', '8', '9', '10'],
    color: ['White/Red'],
    stock: 45,
    category: 'Footwear',
    colorImages: {
      'White/Red': 'https://i.pinimg.com/474x/bb/01/58/bb01585c85cd801e8c045897d2e6bd00.jpg',
    },
  },
  
  {
    id: 13,
    name: 'Vintage Leather Jacket',
    image: 'https://i.pinimg.com/474x/ff/73/27/ff732746821d1640e9a11a5e3bca8fe0.jpg',
    price: 3499,
    rating: 4.8,
    ratingCount: 250,
    discount: 20,
    description: 'A timeless vintage leather jacket with a distressed look, perfect for layering in any season.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Brown'],
    stock: 20,
    category: 'Jackets',
    colorImages: {
      Brown: 'https://i.pinimg.com/474x/ff/73/27/ff732746821d1640e9a11a5e3bca8fe0.jpg',
    },
  },
  
  {
    id: 14,
    name: 'High-Waist Leggings - Black',
    image: 'https://i.pinimg.com/474x/50/11/db/5011dbf4d32863720b70831b45ad92ab.jpg',
    price: 799,
    rating: 4.3,
    ratingCount: 320,
    discount: 35,
    description: 'Comfortable and supportive high-waist leggings made from stretchy material, ideal for workouts or casual wear.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'Gray'],
    stock: 70,
    category: 'Activewear',
    colorImages: {
      Black: 'https://i.pinimg.com/474x/50/11/db/5011dbf4d32863720b70831b45ad92ab.jpg',
      Gray: 'https://i.pinimg.com/474x/bb/fa/8a/bbfa8acbc359541798fa56efa58eb25b.jpg',
    },
  },
  
  {
    id: 15,
    name: 'Tote Bag - Canvas',
    image: 'https://i.pinimg.com/474x/cf/8c/3a/cf8c3a3ac4a496028fc61a4d92fd8d1c.jpg',
    price: 999,
    rating: 4.7,
    ratingCount: 180,
    discount: 15,
    description: 'Spacious and durable canvas tote bag, perfect for shopping or everyday use.',
    size: ['One Size'],
    color: ['Beige', 'Black'],
    stock: 40,
    category: 'Accessories',
    colorImages: {
      Beige: 'https://i.pinimg.com/474x/cf/8c/3a/cf8c3a3ac4a496028fc61a4d92fd8d1c.jpg',
      Black: 'https://i.pinimg.com/474x/7b/dc/6d/7bdc6d2f7fcbd00af79df0de8c3d2875.jpg',
    },
  },
  
  {
    id: 16,
    name: 'Lightweight Down Jacket',
    image: 'https://i.pinimg.com/474x/52/69/fe/5269fec2433c0a87c39b534de1250a20.jpg',
    price: 2299,
    rating: 4.6,
    ratingCount: 120,
    discount: 40,
    description: 'A warm yet lightweight down jacket that is water-resistant, perfect for cold weather.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Blue', 'Black'],
    stock: 30,
    category: 'Jackets',
    colorImages: {
      Blue: 'https://i.pinimg.com/474x/52/69/fe/5269fec2433c0a87c39b534de1250a20.jpg',
      Black: 'https://i.pinimg.com/474x/fe/eb/99/feeb99bc96304c89b26747e17bb8ca06.jpg',
    },
  },
  
  {
    id: 17,
    name: 'Sunglasses - Black',
    image: 'https://i.pinimg.com/474x/67/83/32/67833249433662daa82f0b2dcb3933cb.jpg',
    price: 799,
    rating: 4.5,
    ratingCount: 150,
    discount: 10,
    description: 'Stylish black sunglasses with UV protection, perfect for sunny days and outdoor activities.',
    size: ['Standard'],
    color: ['Black'],
    stock: 60,
    category: 'Accessories',
    colorImages: {
      Black: 'https://i.pinimg.com/474x/67/83/32/67833249433662daa82f0b2dcb3933cb.jpg',
    },
  },
  {
    id: 18,
    name: 'Cotton Linen Blouse - White',
    image: 'https://i.pinimg.com/474x/e7/c9/3c/e7c93c2555234a0fe974bd386161ac6e.jpg',
    price: 1299,
    rating: 4.5,
    ratingCount: 250,
    discount: 30,
    description: 'Elegant cotton-linen blouse with button-down front and relaxed fit. Perfect for summer wear.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['White', 'Navy'],
    stock: 50,
    category: 'Tops',
    colorImages: {
      White: 'https://i.pinimg.com/474x/e7/c9/3c/e7c93c2555234a0fe974bd386161ac6e.jpg',
      Navy: 'https://i.pinimg.com/474x/f6/e3/2f/f6e32f8a4e5d75fd533d8efd1fefd3ec.jpg',
    },
  },
  
  {
    id: 19,
    name: 'A-Line Denim Skirt',
    image: 'https://i.pinimg.com/474x/79/ba/6a/79ba6ab19217be7f937c5a95676f1103.jpg',
    price: 899,
    rating: 4.3,
    ratingCount: 120,
    discount: 15,
    description: 'Classic A-line denim skirt with raw hem, mid-rise waist, and casual style. Perfect for all-day wear.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Blue'],
    stock: 40,
    category: 'Skirts',
    colorImages: {
      Blue: 'https://i.pinimg.com/474x/79/ba/6a/79ba6ab19217be7f937c5a95676f1103.jpg',
    },
  },
  
  {
    id: 20,
    name: 'Chunky Knit Sweater - Beige',
    image: 'https://i.pinimg.com/474x/a5/e1/04/a5e104b76d8c763bb1f4ca50ac431cd0.jpg',
    price: 1799,
    rating: 4.6,
    ratingCount: 180,
    discount: 20,
    description: 'Cozy chunky knit sweater made with soft wool blend, perfect for layering during colder months.',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Beige', 'Grey'],
    stock: 35,
    category: 'Sweaters',
    colorImages: {
      Beige: 'https://i.pinimg.com/474x/a5/e1/04/a5e104b76d8c763bb1f4ca50ac431cd0.jpg',
      Grey: 'https://i.pinimg.com/474x/77/0e/df/770edffeb5c02c6312c73c6e7cd08de5.jpg',
    },
  }
  
  
];

const Fashiondetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [productImage, setProductImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = fashionProducts.find((item) => item.id === parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setProductImage(fetchedProduct.image);
      setSelectedSize(null);
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

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setProductImage(product.colorImages[color]);
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
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    addToCart(itemToAdd);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    addToCart(itemToAdd);
    navigate('/checkout');
  };

  const relatedProducts = fashionProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/fashion" underline="hover">
          Fashion
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
                image={productImage}
                alt={product.name}
                sx={{ width: '100%', height: { xs: 400, md: 500 }, objectFit: 'cover' }}
              />
            </Card>

            <Box mt={3}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Color</Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                {product.color.map((color) => (
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

              <Typography variant="h6" mt={3} sx={{ fontWeight: 500 }}>Size</Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                {product.size.map((size) => (
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
                disabled={!selectedSize || !selectedColor}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBuyNow}
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                disabled={!selectedSize || !selectedColor}
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
                  onClick={() => navigate(`/fashion/${related.id}`)} 
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

export default Fashiondetail;