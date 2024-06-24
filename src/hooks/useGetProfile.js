import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersService from '../features/users/usersService';
import { toast } from 'react-toastify';

export function useGetProfile(userId) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await usersService.getUserById(userId);
        setUser(data);
      } catch (error) {
        if (error.response.status === 404) {
          navigate('not-found');
        } else if (error.response.status === 500) {
          navigate('/500');
        } else {
          toast.error('An error occurred. Please try again later');
        }
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { user, isLoading };
}
