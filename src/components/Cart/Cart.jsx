import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Container,
  Paper,
  Checkbox,
  IconButton,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  LocalShipping as ShippingIcon,
  Redeem as GiftIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const Cart = () => {
  const { getCartItems, removeFromCart, updateQuantity } = useCart();
  const cartItems = getCartItems();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = React.useState([]);

  // Calculate subtotal only for selected items
  const subtotal = selectedItems.reduce((acc, itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return acc + (item ? item.price * item.quantity : 0);
  }, 0);

  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const discount = selectedItems.reduce((acc, itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return acc + (item ? (item.price * item.quantity * (item.discount || 0)) / 100 : 0);
  }, 0);
  const total = subtotal + deliveryCharge - discount;

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    // Only pass the selected items to checkout
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    navigate('/checkout', { state: { cartItems: selectedCartItems } });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Shopping Cart ({cartItems.length} items)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                onChange={selectAllItems}
              />
              <Typography variant="subtitle1">
                Select all items ({selectedItems.length} selected)
              </Typography>
            </Box>
          </Paper>

          {cartItems.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </Paper>
          ) : (
            <List sx={{ width: '100%' }}>
              {cartItems.map((item) => (
                <Paper key={item.id} elevation={0} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      sx={{ mr: 2 }}
                    />
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        src={item.colorImages?.[item.selectedColor] || item.image}
                        alt={item.name}
                        sx={{ width: 120, height: 120, borderRadius: 1 }}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            Color: {item.selectedColor} | Size: {item.selectedSize}
                          </Typography>
                          {item.discount > 0 && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Chip 
                                label={`${item.discount}% OFF`} 
                                size="small" 
                                color="success" 
                                sx={{ mr: 1 }} 
                              />
                              <Typography variant="body2" color="text.secondary">
                                MRP: <span style={{ textDecoration: 'line-through' }}>₹{Math.round(item.price * 100/(100-item.discount))}</span>
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              sx={{ minWidth: 30 }}
                            >
                              -
                            </Button>
                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              sx={{ minWidth: 30 }}
                            >
                              +
                            </Button>
                          </Box>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price.toLocaleString()} each
                      </Typography>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{ mt: 1, color: 'error.main' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}

          {/* Delivery Guarantee Card */}
          <Paper elevation={0} sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShippingIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Delivery Guarantee
              </Typography>
            </Box>
            <Typography variant="body2">
              Get your order delivered by tomorrow with Express Delivery
            </Typography>
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal ({selectedItems.length} items)</Typography>
                <Typography variant="body2">₹{subtotal.toLocaleString()}</Typography>
              </Box>
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="success.main">
                    Discount
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -₹{discount.toLocaleString()}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Delivery Charges</Typography>
                <Typography variant="body2">
                  {deliveryCharge === 0 ? (
                    <span style={{ color: '#388e3c' }}>FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Total Amount
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  ₹{total.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {subtotal > 0 && (
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
                disabled={selectedItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            )}

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={handleContinueShopping}
              sx={{ mt: 2, py: 1.5 }}
            >
              Continue Shopping
            </Button>

            {/* Security & Offers */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GiftIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Apply Coupons / Offers
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Safe and Secure Payments
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Empty Cart Suggestions */}
          {cartItems.length === 0 && (
            <Paper elevation={0} sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Frequently Bought Together
              </Typography>
              {/* Add suggested products here */}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;