import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as UpiIcon,
  LocalAtm as CodIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  // Use cart items from location state
  const [cartItems, setCartItems] = useState(state?.cartItems || []);

  // Redirect if no cart items
  useEffect(() => {
    if (!state?.cartItems || state.cartItems.length === 0) {
      navigate('/cart');
    }
  }, [state, navigate]);

  // Sample addresses - in a real app this would come from your backend/context
  const [addresses, setAddresses] = useState({
    home: {
      type: 'home',
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '9876543210'
    },
    work: {
      type: 'work',
      line1: '456 Tech Park',
      line2: 'Tower B, 8th Floor',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560102',
      phone: '9876543210'
    }
  });

  const [selectedAddress, setSelectedAddress] = useState('home');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const discount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * (item.discount || 0) / 100), 0);
  const total = subtotal + deliveryCharge - discount;

  const steps = ['Delivery Address', 'Payment Method', 'Review Order'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Place order logic would go here
      navigate('/order-confirmation', { state: { cartItems, total, address: addresses[selectedAddress] } });
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    const addressType = newAddress.type;
    setAddresses(prev => ({
      ...prev,
      [addressType]: newAddress
    }));
    setSelectedAddress(addressType);
    setOpenAddressDialog(false);
    setNewAddress({
      type: 'home',
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate('/cart')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Checkout
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        {/* Left Column - Form Sections */}
        <Grid item xs={12} md={8}>
          {activeStep === 0 && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Select Delivery Address
              </Typography>

              <RadioGroup
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {Object.entries(addresses).map(([key, address]) => (
                  <Paper
                    key={key}
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      border: selectedAddress === key ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      borderRadius: 1,
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedAddress(key)}
                  >
                    <FormControlLabel
                      value={key}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {address.type === 'home' ? (
                              <HomeIcon color="action" sx={{ mr: 1 }} />
                            ) : (
                              <WorkIcon color="action" sx={{ mr: 1 }} />
                            )}
                            <Typography fontWeight={600}>
                              {address.type === 'home' ? 'Home' : 'Work'}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {address.line1}, {address.line2}
                          </Typography>
                          <Typography variant="body2">
                            {address.city}, {address.state} - {address.pincode}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Phone: {address.phone}
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                ))}
              </RadioGroup>

              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                sx={{ mt: 2 }}
                onClick={() => setOpenAddressDialog(true)}
              >
                Add New Address
              </Button>

              {/* Add Address Dialog */}
              <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Address Type</InputLabel>
                        <Select
                          value={newAddress.type}
                          name="type"
                          onChange={handleAddressChange}
                          label="Address Type"
                        >
                          <MenuItem value="home">Home</MenuItem>
                          <MenuItem value="work">Work</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        name="line1"
                        value={newAddress.line1}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        name="line2"
                        value={newAddress.line2}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Pincode"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenAddressDialog(false)}>Cancel</Button>
                  <Button 
                    onClick={handleAddAddress}
                    disabled={!newAddress.line1 || !newAddress.city || !newAddress.pincode}
                    variant="contained"
                  >
                    Save Address
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Payment Options
              </Typography>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: paymentMethod === 'creditCard' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CreditCardIcon color="action" sx={{ mr: 1 }} />
                          <Typography fontWeight={600}>Credit/Debit Card</Typography>
                        </Box>
                        {paymentMethod === 'creditCard' && (
                          <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Number"
                                  placeholder="1234 5678 9012 3456"
                                  name="number"
                                  value={cardDetails.number}
                                  onChange={handleCardChange}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Name on Card"
                                  name="name"
                                  value={cardDetails.name}
                                  onChange={handleCardChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="Expiry Date"
                                  placeholder="MM/YY"
                                  name="expiry"
                                  value={cardDetails.expiry}
                                  onChange={handleCardChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="CVV"
                                  placeholder="123"
                                  name="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleCardChange}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: paymentMethod === 'upi' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <UpiIcon color="action" sx={{ mr: 1 }} />
                          <Typography fontWeight={600}>UPI Payment</Typography>
                        </Box>
                        {paymentMethod === 'upi' && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Pay via any UPI app like Google Pay, PhonePe, Paytm
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: paymentMethod === 'netBanking' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('netBanking')}
                >
                  <FormControlLabel
                    value="netBanking"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BankIcon color="action" sx={{ mr: 1 }} />
                          <Typography fontWeight={600}>Net Banking</Typography>
                        </Box>
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: paymentMethod === 'cod' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CodIcon color="action" sx={{ mr: 1 }} />
                          <Typography fontWeight={600}>Cash on Delivery</Typography>
                        </Box>
                        {paymentMethod === 'cod' && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Pay when your order is delivered
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Review Your Order
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Delivery Address
              </Typography>
              <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {selectedAddress === 'home' ? (
                    <HomeIcon color="action" sx={{ mr: 1 }} />
                  ) : selectedAddress === 'work' ? (
                    <WorkIcon color="action" sx={{ mr: 1 }} />
                  ) : (
                    <LocationIcon color="action" sx={{ mr: 1 }} />
                  )}
                  <Typography fontWeight={600}>
                    {addresses[selectedAddress].type === 'home' ? 'Home' : 
                     addresses[selectedAddress].type === 'work' ? 'Work' : 'Other'}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {addresses[selectedAddress].line1}, {addresses[selectedAddress].line2}
                </Typography>
                <Typography variant="body2">
                  {addresses[selectedAddress].city}, {addresses[selectedAddress].state} - {addresses[selectedAddress].pincode}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Phone: {addresses[selectedAddress].phone}
                </Typography>
              </Paper>

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Payment Method
              </Typography>
              <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {paymentMethod === 'creditCard' && <CreditCardIcon color="action" sx={{ mr: 1 }} />}
                  {paymentMethod === 'upi' && <UpiIcon color="action" sx={{ mr: 1 }} />}
                  {paymentMethod === 'netBanking' && <BankIcon color="action" sx={{ mr: 1 }} />}
                  {paymentMethod === 'cod' && <CodIcon color="action" sx={{ mr: 1 }} />}
                  <Typography>
                    {paymentMethod === 'creditCard' && 'Credit/Debit Card'}
                    {paymentMethod === 'upi' && 'UPI Payment'}
                    {paymentMethod === 'netBanking' && 'Net Banking'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </Typography>
                </Box>
                {paymentMethod === 'creditCard' && cardDetails.number && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Card ending with {cardDetails.number.slice(-4)}
                  </Typography>
                )}
              </Paper>

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Order Items ({cartItems.length})
              </Typography>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, borderRadius: 1 }}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography fontWeight={600}>{item.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body2">
                            Color: {item.selectedColor} | Size: {item.selectedSize}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
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
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            {item.discount > 0 && (
                              <Chip
                                label={`${item.discount}% OFF`}
                                size="small"
                                color="success"
                                sx={{ mr: 1 }}
                              />
                            )}
                            <Typography variant="body1" fontWeight={600}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal ({cartItems.length} items)</Typography>
                <Typography variant="body2">₹{subtotal.toLocaleString()}</Typography>
              </Box>
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

            {activeStep === steps.length - 1 && (
              <Box sx={{ backgroundColor: '#e8f5e9', p: 2, borderRadius: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Your order is eligible for <strong>FREE Delivery</strong>
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Delivery by tomorrow evening
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleNext}
              sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
              disabled={activeStep === 0 && !selectedAddress}
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
            </Button>

            {activeStep > 0 && (
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleBack}
                sx={{ mt: 2, py: 1.5 }}
              >
                Back
              </Button>
            )}

            <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
              <Typography variant="caption" color="text.secondary">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;