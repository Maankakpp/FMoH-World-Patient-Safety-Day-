import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => (
  <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-who-lightblue px-4" role="main">
    <div className="card flex flex-col items-center py-16 px-8">
      <AlertTriangle className="h-16 w-16 text-who-orange mb-6" aria-hidden="true" />
      <h1 className="text-7xl font-extrabold text-who-blue mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-2xl text-gray-700 mb-8 text-center">Sorry, the page you are looking for does not exist.</h2>
      <Link
        to="/"
        className="bg-gradient-to-r from-who-blue to-who-orange text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  </main>
);

export default NotFound; 