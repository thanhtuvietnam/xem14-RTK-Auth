import React from 'react';
import { Link } from 'react-router-dom';
const Error = React.memo(() => {
  return (
    <div className='container mx-auto px-4 py-8 text-center min-h-screen'>
      <h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='mb-4'>The page you're looking for doesn't exist.</p>
      <Link
        to='/'
        className='bg-blue-500 text-white p-2 rounded'>
        Go Home
      </Link>
    </div>
  );
});

Error.displayName = 'Error';

export default Error;
