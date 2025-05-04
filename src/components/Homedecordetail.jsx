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

const Homedecordetail = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();

  const homeRecords = [
    {
        id: 1,
        name: 'Modern Sofa',
        image: 'https://i.pinimg.com/474x/34/d6/f5/34d6f5f4ab3e38e4e75d660d1da374e3.jpg',
        price: 14999,
        rating: 4.8,
        ratingCount: 120,
        discount: 20,
        description: 'A sleek and stylish modern sofa that enhances your living room with comfort.',
        size: ['2 Seater', '3 Seater', '4 Seater'],
        color: ['Gray', 'Beige', 'Black'],
        stock: 20,
        category: 'Furniture',
        colorImages: {
          Gray: 'https://i.pinimg.com/474x/34/d6/f5/34d6f5f4ab3e38e4e75d660d1da374e3.jpg',
          Beige: 'https://i.pinimg.com/474x/ff/99/5b/ff995b835dd0357ab570ada72f85c0e6.jpg',
          Black: 'https://i.pinimg.com/474x/5e/7f/cc/5e7fcc41823714c7ab7461662c4d7768.jpg',
        }
      },
      {
          id: 2,
          name: 'Luxury King Bed',
          image: 'https://i.pinimg.com/474x/49/a2/6a/49a26ad80034c89dce7f18e5a7d4c98f.jpg',
          price: 23999,
          rating: 4.7,
          ratingCount: 200,
          discount: 15,
          description: 'A luxurious king-sized bed with a soft memory foam mattress.',
          size: ['King Size', 'Queen Size'],
          color: ['White', 'Brown'],
          stock: 15,
          category: 'Furniture',
          colorImages: {
            White: 'https://i.pinimg.com/474x/49/a2/6a/49a26ad80034c89dce7f18e5a7d4c98f.jpg',
            Brown: 'https://i.pinimg.com/474x/fd/b8/af/fdb8af8f255b40c0f0edca1727f9bbb3.jpg',
          }
        },
        {
          id: 3,
          name: 'Wooden Dining Table',
          image: 'https://i.pinimg.com/474x/eb/2b/d2/eb2bd24bd82f90707452317e3fb5a25d.jpg',
          price: 8999,
          rating: 4.5,
          ratingCount: 95,
          discount: 10,
          description: 'An elegant wooden dining table that can seat up to 6 people.',
          size: ['6 Seater', '4 Seater'],
          color: ['Oak', 'Cherry'],
          stock: 30,
          category: 'Furniture',
          colorImages: {
            Oak: 'https://i.pinimg.com/474x/eb/2b/d2/eb2bd24bd82f90707452317e3fb5a25d.jpg',
            Cherry: 'https://i.pinimg.com/474x/cb/8f/43/cb8f43c07150f48cb95cfee2637af6be.jpg',
          }
        },
        {
          id: 4,
          name: 'Minimalist Coffee Table',
          image: 'https://i.pinimg.com/474x/3d/cb/09/3dcb09571e51bf91735d3f4a40358a8f.jpg',
          price: 4999,
          rating: 4.6,
          ratingCount: 150,
          discount: 12,
          description: 'A sleek minimalist coffee table that complements any living room.',
          size: ['Small', 'Medium', 'Large'],
          color: ['Black', 'White'],
          stock: 25,
          category: 'Furniture',
          colorImages: {
            Black: 'https://i.pinimg.com/474x/3d/cb/09/3dcb09571e51bf91735d3f4a40358a8f.jpg',
            White: 'https://i.pinimg.com/474x/01/7b/54/017b544062b99945e9b5c6de514dd109.jpg',
          }
        },
        {
          id: 5,
          name: 'Industrial Shelf',
          image: 'https://i.pinimg.com/474x/91/dc/98/91dc98989d0b9057eca9016e9a92535b.jpg',
          price: 6999,
          rating: 4.3,
          ratingCount: 180,
          discount: 18,
          description: 'An industrial-style bookshelf with sturdy metal frames and wooden shelves.',
          size: ['Small', 'Large'],
          color: ['Black', 'White'],
          stock: 10,
          category: 'Furniture',
          colorImages: {
            Black: 'https://i.pinimg.com/474x/91/dc/98/91dc98989d0b9057eca9016e9a92535b.jpg',
            White: 'https://i.pinimg.com/474x/71/35/b1/7135b1efd3b476a89b4019732a96a09c.jpg',
          }
        },
        {
          id: 6,
          name: 'Soft Armchair',
          image: 'https://i.pinimg.com/474x/a5/fa/54/a5fa54d9c476665d035d37c194038562.jpg',
          price: 1599,
          rating: 4.6,
          ratingCount: 220,
          discount: 15,
          description: 'A comfortable armchair with soft cushions perfect for your living room.',
          size: ['Standard'],
          color: ['Blue', 'Gray', 'Beige'],
          stock: 18,
          category: 'Furniture',
          colorImages: {
            Blue: 'https://i.pinimg.com/474x/a5/fa/54/a5fa54d9c476665d035d37c194038562.jpg',
            Gray: 'https://i.pinimg.com/474x/59/47/3a/59473a254b30694b024cb02f4cd75e17.jpg',
            Beige: 'https://i.pinimg.com/474x/a6/fd/5a/a6fd5a762ca054338ff367523f6c438c.jpg',
          }
        },
        {
          id: 7,
          name: 'Elegant Bookshelf',
          image: 'https://i.pinimg.com/474x/fa/7c/9c/fa7c9c173483a58826870a262b024c68.jpg',
          price: 7999,
          rating: 4.7,
          ratingCount: 75,
          discount: 25,
          description: 'A stylish bookshelf that adds a touch of elegance to any room.',
          size: ['Small', 'Large'],
          color: ['White', 'Brown'],
          stock: 22,
          category: 'Furniture',
          colorImages: {
            White: 'https://i.pinimg.com/474x/fa/7c/9c/fa7c9c173483a58826870a262b024c68.jpg',
            Brown: 'https://i.pinimg.com/474x/69/6e/8a/696e8ad88802af0c585efb162835b2eb.jpg',
          }
        },
        {
          id: 8,
          name: 'Abstract Wall Art',
          image: 'https://i.pinimg.com/474x/82/f2/ca/82f2cae276598d5bc2b0e6bd5ca9b5d2.jpg',
          price: 999,
          rating: 4.8,
          ratingCount: 250,
          discount: 10,
          description: 'A contemporary abstract wall art piece that brings a modern touch to your space.',
          size: ['Small', 'Medium', 'Large'],
          color: ['Multicolor'],
          stock: 50,
          category: 'Home Decor',
          colorImages: {
            Multicolor: 'https://i.pinimg.com/474x/82/f2/ca/82f2cae276598d5bc2b0e6bd5ca9b5d2.jpg',
          }
        },
        {
          id: 9,
          name: 'Indoor Plant Pot',
          image: 'https://i.pinimg.com/474x/eb/36/8b/eb368bf298fc1be4edd49489a6452dc8.jpg',
          price: 599,
          rating: 4.7,
          ratingCount: 110,
          discount: 20,
          description: 'A modern and stylish indoor plant pot perfect for home or office decor.',
          size: ['Small', 'Medium'],
          color: ['White', 'Gray'],
          stock: 30,
          category: 'Home Decor',
          colorImages: {
            White: 'https://i.pinimg.com/originals/9f/d9/62/9fd96274b2c7c81d19bcd7797743144d.jpg',
            Gray: 'https://i.pinimg.com/474x/b7/75/50/b77550ee6df0273753f18569a824a2d8.jpg',
          }
        },
        {
          id: 10,
          name: 'Decorative Throw Pillow',
          image: 'https://i.pinimg.com/474x/d7/f4/60/d7f460897056a5632f659313caf53610.jpg',
          price: 799,
          rating: 4.6,
          ratingCount: 130,
          discount: 15,
          description: 'A decorative throw pillow that adds comfort and style to your living space.',
          size: ['Small', 'Large'],
          color: ['Blue', 'Gray', 'Beige'],
          stock: 40,
          category: 'Home Decor',
          colorImages: {
            Blue: 'https://i.pinimg.com/474x/d7/f4/60/d7f460897056a5632f659313caf53610.jpg',
            Gray: 'https://i.pinimg.com/474x/37/6c/ef/376cef9335524e01202800c3b11e1f5f.jpg',
            Beige: 'https://i.pinimg.com/474x/e3/c1/e8/e3c1e893a61a420f2cb3d9ed58daca29.jpg',
          }
        },
        {
          id: 11,
          name: 'Modern Table Lamp',
          image: 'https://i.pinimg.com/474x/0d/98/e5/0d98e51600b0401b49d18621d7b445ce.jpg',
          price: 1499,
          rating: 4.7,
          ratingCount: 190,
          discount: 25,
          description: 'A sleek and stylish modern table lamp that brings sophistication to any room.',
          size: ['Small', 'Medium'],
          color: ['Gold', 'Black'],
          stock: 15,
          category: 'Home Decor',
          colorImages: {
            Gold: 'https://i.pinimg.com/474x/0d/98/e5/0d98e51600b0401b49d18621d7b445ce.jpg',
            Black: 'https://i.pinimg.com/474x/a0/dd/40/a0dd406d88294dc6171d9f83abd2f9d0.jpg',
          }
        },
        {
          id: 12,
          name: 'Framed Mirror',
          image: 'https://i.pinimg.com/474x/8a/86/da/8a86da6028d27fc55e8a28369655fc9d.jpg',
          price: 2499,
          rating: 4.9,
          ratingCount: 320,
          discount: 30,
          description: 'An elegant framed mirror that enhances the appearance of any room.',
          size: ['Small', 'Large'],
          color: ['Silver', 'Gold'],
          stock: 20,
          category: 'Home Decor',
          colorImages: {
            Silver: 'https://i.pinimg.com/474x/8a/86/da/8a86da6028d27fc55e8a28369655fc9d.jpg',
            Gold: 'https://i.pinimg.com/736x/1e/6c/15/1e6c1512751e95e98da19f32b21ef367.jpg',
          }
        }
    // ... (your existing homeRecords array)
  ];

  useEffect(() => {
    const fetchedRecord = homeRecords.find((item) => item.id === parseInt(recordId));
    setRecord(fetchedRecord);
    setSelectedColor(fetchedRecord?.color[0]);
    setSelectedSize(fetchedRecord?.size[0]);
    
    // Find related products from the same category
    if (fetchedRecord) {
      const related = homeRecords.filter(
        item => item.category === fetchedRecord.category && item.id !== fetchedRecord.id
      );
      setRelatedProducts(related);
    }
  }, [recordId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => prev + change);
  };

  const handleAddToCart = () => {
    addToCart({ ...record, color: selectedColor, size: selectedSize, quantity });
  };

  if (!record) {
    return <Typography variant="h5">Record not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/home-decor" underline="hover">
          Home Decor
        </Link>
        <Typography color="text.primary">{record.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={record.colorImages[selectedColor]}
              alt={record.name}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5">{record.name}</Typography>
            <Typography variant="body2" color="text.secondary">{record.category}</Typography>

            <Box display="flex" alignItems="center" my={2}>
              <Rating value={record.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" ml={1}>
                ({record.ratingCount} reviews)
              </Typography>
            </Box>

            <Typography variant="h6" color="primary" my={2}>
              ₹{record.price - (record.price * record.discount / 100)}
              <Typography variant="body2" color="text.secondary" component="span" ml={1}>
                <s>₹{record.price}</s>
              </Typography>
            </Typography>

            <Typography variant="body1" paragraph>{record.description}</Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" mr={2}>Color:</Typography>
              {record.color.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  color={selectedColor === color ? 'primary' : 'default'}
                  onClick={() => handleColorChange(color)}
                  style={{ marginRight: 8 }}
                />
              ))}
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" mr={2}>Size:</Typography>
              {record.size.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  color={selectedSize === size ? 'primary' : 'default'}
                  onClick={() => handleSizeChange(size)}
                  style={{ marginRight: 8 }}
                />
              ))}
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" mr={2}>Quantity:</Typography>
              <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)} disabled={quantity >= record.stock}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={quantity <= 0 || record.stock <= 0}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Box mt={8}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            You may also like
          </Typography>
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
                           onClick={() => navigate(`/homedecor/${related.id}`)} 
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
    </Container>
  );
};

export default Homedecordetail;