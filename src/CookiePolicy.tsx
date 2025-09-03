import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy: React.FC = () => (
  <>
    <Helmet>
      <title>Cookie Policy - World Patient Safety Day 2025 Somalia</title>
      <meta name="description" content="Read the cookie policy for World Patient Safety Day 2025 Somalia. Learn how we use cookies to improve your experience." />
    </Helmet>
    <div className="container py-16 text-gray-800">
      <h1 className="text-3xl font-bold text-who-blue mb-8 text-center">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8 text-center">Effective Date: June 8, 2024</p>
      <h2 className="text-xl font-bold mt-8 mb-2">1. What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device to help websites function and analyze usage.</p>
      <h2 className="text-xl font-bold mt-8 mb-2">2. Types of Cookies We Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><b>Essential Cookies:</b> Necessary for website functionality (e.g., login, navigation)</li>
        <li><b>Analytics Cookies:</b> Help us understand how visitors use our site (e.g., Google Analytics)</li>
        <li><b>Advertising Cookies:</b> (If used) Track browsing to deliver relevant ads</li>
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-2">3. How We Use Cookies</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To remember your preferences</li>
        <li>To analyze site traffic and usage</li>
        <li>To improve website performance</li>
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-2">4. Managing Cookie Preferences</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You can manage or disable cookies in your browser settings.</li>
        <li>Some features may not work properly if cookies are disabled.</li>
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-2">5. Cookie Consent</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you first visit our site, you will see a cookie consent notice.</li>
        <li>By continuing to use the site, you consent to our use of cookies as described.</li>
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-2">6. Changes to This Policy</h2>
      <p>We may update this Cookie Policy. Changes will be posted on this page.</p>
      <p className="mt-8">For any questions about these policies, please email: <a href="mailto:qualityassurance@moh.gov.so" className="text-who-blue underline">qualityassurance@moh.gov.so</a></p>
    </div>
  </>
);

export default CookiePolicy; 