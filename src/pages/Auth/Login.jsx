import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/Auth/auth.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success('Chúc mừng bạn đăng nhập thành công! ');
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
      console.log('login failed', error);
    }
  };
  return (
    <div className='mt-2 custom-page shadow-lg gap-3 min-h-screen bg-[#151d25] border-t border-t-[#1e2732] flex flex-col justify-center items-center'>
      <div className='bg-gray-100 py-12 sm:px-6 lg:px-8 rounded-md'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'> Đăng nhập</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6 p-5'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <div>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'>
                    Mật khẩu
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className='w-ful'>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5'>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </div>
                <div className='mt-1'>
                  Chưa có tài khoản?
                  <Link
                    to='/sign-up'
                    className='text-indigo-900 underline'>
                    đăng ký ngay
                  </Link>
                </div>
              </div>
            </form>
            {error && <ToastContainer />}
            {success && <ToastContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
