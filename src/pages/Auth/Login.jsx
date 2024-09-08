import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/Auth/auth.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setActiveButton } from '../../store/mainSlice/LoadingSlice/loadingSlice';
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email là bắt buộc') // Email là trường bắt buộc
    .email('Email không hợp lệ'), // Kiểm tra định dạng email
  password: Yup.string()
    .required('Mật khẩu là bắt buộc') // Mật khẩu là trường bắt buộc
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'), // Mật khẩu tối thiểu 6 ký tự
});
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    try {
      await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();
      toast.success('Chúc mừng bạn đăng nhập thành công! ', {
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
        navigate('/');
        dispatch(setActiveButton(0));
      }, 500);
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
      // console.log('login failed', error);
    }
  };
  return (
    <div className='flex custom-page flex-col justify-center items-center min-h-screen bg-[#151d25]'>
      <div className='bg-gray-100 py-12 px-6 rounded-md shadow-lg w-full max-w-md'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'> Đăng nhập</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
              <Form className='space-y-6 p-5'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <div>
                    <FastField
                      type='email'
                      name='email'
                      id='email'
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'>
                      Mật khẩu
                    </label>
                    <FastField
                      type='password'
                      id='password'
                      name='password'
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                  <div className='w-ful'>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5'>
                      {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                  </div>
                  <div className='mt-1 whitespace-nowrap'>
                    Chưa có tài khoản?
                    <Link
                      to='/sign-up'
                      className='text-indigo-900 underline e'>
                      đăng ký ngay
                    </Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      {error && <ToastContainer />}
      {success && <ToastContainer position='top-center' />}
    </div>
  );
}

export default Login;
