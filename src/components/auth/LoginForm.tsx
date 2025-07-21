import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setToken, setUserInfo, redirectToRoleDashboard } from '@/utils/auth';
import { loginUser } from '@/services/api';

interface LoginFormProps {
  userType: 'farmer' | 'trader' | 'driver' | 'admin';
}

const LoginForm = ({ userType }: LoginFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const identifierLabel = userType === 'farmer' ? 'Phone Number' :
                         userType === 'trader' ? 'Phone Number' :
                         userType === 'driver' ? 'System ID' : 
                         userType === 'admin' ? 'System ID' : 'Phone Number';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare login credentials based on user type
      const credentials = {
        role: userType,
        password: formData.password,
        ...(userType === 'driver' || userType === 'admin' 
          ? { systemId: formData.identifier }
          : { phone: formData.identifier }
        )
      };
      
      // Call the actual login API
      const response = await loginUser(credentials);
      
      // Store authentication data
      setToken(response.token);
      setUserInfo(response.user);
      
      // Redirect to appropriate dashboard
      const dashboardPath = redirectToRoleDashboard(response.user.role);
      navigate(dashboardPath);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="identifier">{identifierLabel}</Label>
          <Input
            id="identifier"
            name="identifier"
            placeholder={
              userType === 'driver' || userType === 'admin' 
                ? 'Enter your System ID' 
                : 'Enter your Phone Number'
            }
            autoComplete={
              userType === 'driver' || userType === 'admin' 
                ? 'username' 
                : 'tel'
            }
            required
            value={formData.identifier}
            onChange={handleChange}
            className="vunahub-input"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm font-medium text-vunahub-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="vunahub-input"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-vunahub-600 hover:bg-vunahub-700 text-white rounded-full py-6"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;