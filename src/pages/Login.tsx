import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: { email?: string; password?: string; form?: string } = {};

    if (!email.trim()) {
      validationErrors.email = 'Email or username is required.';
    }

    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      const result = await login(email, password);
      setIsSubmitting(false);

      if (!result.success) {
        setErrors({ form: result.message || 'Login failed. Please try again.' });
        return;
      }

      navigate(result.isAdmin ? '/admin-dashboard' : '/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {errors.form && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errors.form}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email or username"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? 'Validating...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-800 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;