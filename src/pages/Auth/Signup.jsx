import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/Auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Tên người dùng là bắt buộc')
    .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
    .max(20, 'Tên người dùng không được vượt quá 20 ký tự')
    .matches(/^[a-zA-Z0-9_]+$/, 'Tên người dùng chỉ có thể chứa chữ cái, số và dấu gạch dưới'),
  email: Yup.string()
    .required('Email là bắt buộc') // Email is required
    .email('Email không hợp lệ') // Email must be valid
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ'), // Custom email format validation
  password: Yup.string()
    .required('Mật khẩu là bắt buộc') // Password is required
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự') // Minimum length of 6 characters
    .max(20, 'Mật khẩu không được vượt quá 20 ký tự') // Maximum length of 20 characters
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ cái viết hoa') // At least one uppercase letter
    .matches(/[a-z]/, 'Mật khẩu phải có ít nhất một chữ cái viết thường') // At least one lowercase letter
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một số') // At least one number
    .matches(/[\W_]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt'), // At least one special character
});

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser({ name: values.userName, email: values.email, password: values.password })).unwrap();
      toast.success('Chúc mừng bạn đã đăng ký thành công! ', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setTimeout(() => {
        navigate('/log-in');
      }, 800);
    } catch (error) {
      // console.log('registration failed', error);
      toast.error('Đăng ký thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  return (
    <div className='flex custom-page flex-col justify-center items-center min-h-screen bg-[#151d25]'>
      <div className='bg-gray-100 py-12 px-6 rounded-md shadow-lg w-full max-w-md'>
        <h2 className='text-center text-3xl font-extrabold text-gray-900 mb-6'>Đăng ký làm thành viên</h2>

        <div className='bg-white py-8 px-6 rounded-lg shadow-md'>
          <Formik
            initialValues={{ userName: '', email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({ isSubmitting }) => (
              <Form className='space-y-6'>
                <div>
                  <label
                    htmlFor='userName'
                    className='block text-sm font-medium text-gray-700'>
                    Tên người dùng
                  </label>
                  <div className='mt-1'>
                    <FastField
                      id='userName'
                      name='userName'
                      type='text'
                      className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='Nhập tên'
                    />
                    <ErrorMessage
                      name='userName'
                      component='div'
                      className='text-red-500 text-sm mt-1'
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
                    <FastField
                      id='email'
                      name='email'
                      type='email'
                      className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='Nhập email'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-red-500 text-sm mt-1'
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
                    <FastField
                      id='password'
                      name='password'
                      type='password'
                      className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='Nhập mật khẩu'
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                </div>

                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <div>
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {error && <ToastContainer />}
      {success && <ToastContainer />}
    </div>
  );
}

export default SignUp;
