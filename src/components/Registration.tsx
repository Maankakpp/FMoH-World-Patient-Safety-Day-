import React, { useState, useRef, useEffect } from 'react';

const Registration: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    sector: '',
    sectorOther: '',
    participation: '',
    notes: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [honeypot, setHoneypot] = useState('');

  // Check if this email is already registered (in localStorage)
  const isEmailRegistered = (email: string) => {
    const registered = localStorage.getItem('wpsd_registered_email');
    return registered === email;
  };

  // Inline validation on blur/change
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && !value.trim()) error = 'Full Name is required';
    if (name === 'email') {
      if (!value.trim()) error = 'Email Address is required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Invalid email address';
      else if (isEmailRegistered(value)) error = 'This email has already been registered';
    }
    if (name === 'organization' && !value.trim()) error = 'Organization / Institution is required';
    if (name === 'role' && !value.trim()) error = 'Job Title / Role is required';
    if (name === 'sector' && !value) error = 'Sector is required';
    if (name === 'sectorOther' && form.sector === 'Other' && !value.trim()) error = 'Please specify your sector';
    if (name === 'participation' && !value) error = 'Participation Mode is required';
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    newErrors.name = validateField('name', form.name);
    newErrors.email = validateField('email', form.email);
    newErrors.organization = validateField('organization', form.organization);
    newErrors.role = validateField('role', form.role);
    newErrors.sector = validateField('sector', form.sector);
    if (form.sector === 'Other') newErrors.sectorOther = validateField('sectorOther', form.sectorOther);
    newErrors.participation = validateField('participation', form.participation);
    // Remove empty errors
    Object.keys(newErrors).forEach(key => { if (!newErrors[key]) delete newErrors[key]; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto-focus first error field
  const focusFirstError = () => {
    if (!formRef.current) return;
    const firstError = Object.keys(errors).find(key => errors[key]);
    if (firstError) {
      const el = formRef.current.querySelector(`[name="${firstError}"]`);
      if (el && 'focus' in el) (el as HTMLElement).focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // If the honeypot is filled, silently block submission
      return;
    }
    if (validate()) {
      setIsSubmitting(true);
      localStorage.setItem('wpsd_registered_email', form.email);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        // Do not submit the form to an external service; just show confirmation
      }, 800); // Simulate loading
    } else {
      focusFirstError();
    }
  };

  // Show confirmation, then reset form after a delay
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: '',
          email: '',
          phone: '',
          organization: '',
          role: '',
          sector: '',
          sectorOther: '',
          participation: '',
          notes: ''
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div role="status" aria-live="polite">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-who-blue mb-4">Registration Confirmed!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Thank you, <b>{form.name}</b>!<br />
              You have registered for World Patient Safety Day {new Date().getFullYear()}.<br />
              <span className="block mt-4 text-gray-500 text-base">This form will reset in a few seconds.</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-white via-blue-50 to-who-lightblue min-h-screen">
      <div className="container flex justify-center items-center">
        <form
          ref={formRef}
          action="https://formspree.io/f/mrblpplv"
          method="POST"
          className="card bg-white/95 p-10 rounded-3xl shadow-2xl border border-who-blue/20 backdrop-blur-md w-full max-w-xl"
          onSubmit={handleSubmit}
          aria-label="Registration Form"
        >
          {/* Honeypot anti-spam field (hidden from users) */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />
          <h2 className="text-3xl font-extrabold text-who-blue mb-2 text-center drop-shadow-lg">Register for World Patient Safety Day 2025</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">Please fill in your details below to secure your spot.</p>
          <hr className="mb-8 border-who-blue/20" />
          {/* Full Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block font-semibold mb-2 text-who-darkblue">Full Name <span className="text-red-500">*</span></label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
              placeholder="Your full name"
            />
            {errors.name && <div id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>
          {/* Email Address */}
          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2 text-who-darkblue">Email Address <span className="text-red-500">*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
              placeholder="you@example.com"
            />
            {errors.email && <div id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>
          {/* Phone Number */}
          <div className="mb-6">
            <label htmlFor="phone" className="block font-semibold mb-2 text-who-darkblue">Phone Number <span className="text-gray-400">(optional)</span></label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-who-blue bg-white shadow-sm"
              placeholder="+252 61 1234567"
            />
          </div>
          <hr className="my-8 border-who-blue/10" />
          {/* Organization / Institution */}
          <div className="mb-6">
            <label htmlFor="organization" className="block font-semibold mb-2 text-who-darkblue">Organization / Institution <span className="text-red-500">*</span></label>
            <input
              id="organization"
              name="organization"
              type="text"
              required
              value={form.organization}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.organization}
              aria-describedby={errors.organization ? 'organization-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.organization ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
              placeholder="e.g. Ministry of Health, Banadir Hospital"
            />
            {errors.organization && <div id="organization-error" className="text-red-600 text-sm mt-1">{errors.organization}</div>}
          </div>
          {/* Job Title / Role */}
          <div className="mb-6">
            <label htmlFor="role" className="block font-semibold mb-2 text-who-darkblue">Job Title / Role <span className="text-red-500">*</span></label>
            <input
              id="role"
              name="role"
              type="text"
              required
              placeholder="Doctor, Nurse, Quality Officer, Student..."
              value={form.role}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? 'role-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.role ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
            />
            {errors.role && <div id="role-error" className="text-red-600 text-sm mt-1">{errors.role}</div>}
          </div>
          {/* Sector */}
          <div className="mb-6">
            <label htmlFor="sector" className="block font-semibold mb-2 text-who-darkblue">Sector <span className="text-red-500">*</span></label>
            <select
              id="sector"
              name="sector"
              required
              value={form.sector}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.sector}
              aria-describedby={errors.sector ? 'sector-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.sector ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
            >
              <option value="">Select...</option>
              <option value="Government">Government</option>
              <option value="Private Hospital">Private Hospital</option>
              <option value="NGO">NGO</option>
              <option value="Academic Institution">Academic Institution</option>
              <option value="Medical Student">Medical Student</option>
              <option value="International Partner">International Partner</option>
              <option value="Other">Other</option>
            </select>
            {errors.sector && <div id="sector-error" className="text-red-600 text-sm mt-1">{errors.sector}</div>}
          </div>
          {/* Sector Other (if 'Other' selected) */}
          {form.sector === 'Other' && (
            <div className="mb-6">
              <label htmlFor="sectorOther" className="block font-semibold mb-2 text-who-darkblue">Please specify your sector <span className="text-red-500">*</span></label>
              <input
                id="sectorOther"
                name="sectorOther"
                type="text"
                required
                value={form.sectorOther}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.sectorOther}
                aria-describedby={errors.sectorOther ? 'sectorOther-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl border ${errors.sectorOther ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
                placeholder="Your sector"
              />
              {errors.sectorOther && <div id="sectorOther-error" className="text-red-600 text-sm mt-1">{errors.sectorOther}</div>}
            </div>
          )}
          <hr className="my-8 border-who-blue/10" />
          {/* Participation Mode */}
          <div className="mb-6">
            <label htmlFor="participation" className="block font-semibold mb-2 text-who-darkblue">Participation Mode <span className="text-red-500">*</span></label>
            <select
              id="participation"
              name="participation"
              required
              value={form.participation}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.participation}
              aria-describedby={errors.participation ? 'participation-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${errors.participation ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-who-blue bg-white shadow-sm`}
            >
              <option value="">Select...</option>
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
            </select>
            {errors.participation && <div id="participation-error" className="text-red-600 text-sm mt-1">{errors.participation}</div>}
          </div>
          {/* Additional Notes */}
          <div className="mb-8">
            <label htmlFor="notes" className="block font-semibold mb-2 text-who-darkblue">Additional Notes <span className="text-gray-400">(optional)</span></label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-who-blue bg-white shadow-sm"
              placeholder="Any special requirements or comments"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-who-blue to-who-orange text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 tracking-wide ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                Registering...
              </span>
            ) : (
              'Register Now'
            )}
          </button>
          <p className="text-xs text-gray-500 mt-6 text-center">We respect your privacy. Your information will only be used for event registration and communication.</p>
        </form>
      </div>
    </section>
  );
};

export default Registration;