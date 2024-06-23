import {
  Box,
  Button,
  FormLabel,
  Modal,
  OutlinedInput,
  Typography,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { useEnrollCourse } from '../../../hooks/useEnrollCourse';
import { refreshAuthUser } from '../../../features/users/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function PaymentModal({ open, handleClose, price, courseId }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const { loading, error, success, handleEnroll } = useEnrollCourse();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const validateForm = () => {
    if (cardNumber.length !== 19) {
      toast.error('Card number is invalid');
      return false;
    }
    if (cvv.length !== 3) {
      toast.error('CVV is invalid');
      return false;
    }

    // Check if expiration date is fully entered and if its a valid date in the future
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = new Date().getMonth() + 1;
    if (expirationDate.length !== 5) {
      toast.error('Expiration date is invalid');
      return false;
    }
    if (parseInt(year) < parseInt(currentYear)) {
      toast.error('Card is expired');
      return false;
    }
    if (month < 1 || month > 12) {
      toast.error('Expiration date is invalid');
      return false;
    }
    if (parseInt(year) === parseInt(currentYear) && parseInt(month) < currentMonth) {
      toast.error('Card is expired');
      return false;
    }
    return true;
  };

  const handlePayPressed = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleEnroll(courseId);
    setTimeout(() => {
      dispatch(refreshAuthUser());
    }, 1500);
  };

  useEffect(() => {
    if (success) {
      navigate(`/learning/courses/${courseId}/syllabus`);
      toast.success('You have successfully bought the course');
    }

    if (error) {
      toast.error('An error occurred. Please try again later.');
    }
  }, [success, error, navigate]);

  return (
    <>
      {loading && <Spinner />}

      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          onClick: (event) => event.stopPropagation(),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 'md',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          component='form'
          onSubmit={handlePayPressed}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='subtitle2'>Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor='card-number' required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id='card-number'
                  autoComplete='card-number'
                  placeholder='0000 0000 0000 0000'
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor='cvv' required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id='cvv'
                  autoComplete='CVV'
                  placeholder='123'
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor='card-name' required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id='card-name'
                  autoComplete='card-name'
                  placeholder='John Smith'
                  required
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor='card-expiration' required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id='card-expiration'
                  autoComplete='card-expiration'
                  placeholder='MM/YY'
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
            <Button variant='contained' color='primary' sx={{ mt: 2 }} type='submit'>
              Pay ${price}
            </Button>
            <Button variant='text' color='primary' onClick={handleClose} sx={{ mt: 1 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PaymentModal;
