import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../store/Auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name: userName, email, password })).unwrap();
      toast.success('Chúc mừng bạn đã đăng ký thành công! ');

      setTimeout(() => {
        navigate('/log-in');
      }, 800);
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
      console.log('registration failed', error);
    }
  };
  return (
    <div className='mt-2 custom-page shadow-lg gap-3 min-h-screen bg-[#151d25] border-t border-t-[#1e2732] flex flex-col justify-center items-center'>
      <div className='bg-gray-100 py-12 sm:px-6 lg:px-8 rounded-md'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Đăng ký làm thành viên</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              className='space-y-6'
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'>
                  Tên người dùng
                </label>
                <div className='mt-1'>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Nhập tên'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Nhập email'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'>
                  Mật khẩu
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Nhập mật khẩu'
                  />
                </div>
              </div>

              {error && <p className='text-red-500 text-sm'>{error}</p>}
              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
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

export default SignUp;
