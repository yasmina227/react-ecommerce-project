import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

const AuthPage = () => {
  const isRegister = useLocation().pathname === '/register';
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isRegister) await registerUser(form);
      else await loginUser(form.email, form.password);
      navigate('/profile');
    } catch {
      setError(isRegister ? 'We could not create your account. Please try again.' : 'Those details did not match an account. Try again or create one.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page container">
      <div className="auth-art"><div className="auth-art-image" /><div className="auth-art-copy"><span className="eyebrow">A PLACE FOR YOUR FAVORITES</span><h1>Make room for<br />the things you <em>love.</em></h1><p>Keep your finds, orders, and little details all in one place.</p></div><span className="auth-art-note">Nook, your everyday edit.</span></div>
      <div className="auth-form-wrap"><div className="auth-form-heading"><span className="eyebrow">{isRegister ? 'YOUR NOOK STARTS HERE' : 'GOOD TO SEE YOU AGAIN'}</span><h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2><p>{isRegister ? 'Join us for thoughtful finds and easy order tracking.' : 'Sign in to pick up right where you left off.'}</p></div>
        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        <form onSubmit={submit} className="auth-form">
          {isRegister && <div className="row g-3"><div className="col-6"><label className="form-label" htmlFor="firstName">First name</label><input className="form-control" id="firstName" name="firstName" autoComplete="given-name" value={form.firstName} onChange={change} required /></div><div className="col-6"><label className="form-label" htmlFor="lastName">Last name</label><input className="form-control" id="lastName" name="lastName" autoComplete="family-name" value={form.lastName} onChange={change} required /></div></div>}
          <div><label className="form-label" htmlFor="email">Email {isRegister ? 'address' : 'or username'}</label><input className="form-control" id="email" name="email" type={isRegister ? 'email' : 'text'} autoComplete="username" placeholder={isRegister ? 'you@example.com' : 'Email or username'} value={form.email} onChange={change} required /></div>
          {isRegister && <div><label className="form-label" htmlFor="phone">Phone number <span className="text-muted">(optional)</span></label><input className="form-control" id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={change} /></div>}
          <div><label className="form-label" htmlFor="password">Password</label><input className="form-control" id="password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={6} value={form.password} onChange={change} required />{isRegister && <small className="form-hint">Use at least 6 characters.</small>}</div>
          {!isRegister && <div className="auth-form-options"><label className="form-check"><input className="form-check-input" type="checkbox" /><span className="form-check-label">Keep me signed in</span></label><button type="button" className="auth-inline-link" onClick={() => setError('Password reset will be available when email service is connected.')}>Forgot password?</button></div>}
          <button type="submit" className="btn btn-store-primary auth-submit" disabled={submitting}>{submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'} <i className="bi bi-arrow-right" /></button>
        </form>
        <div className="auth-switch">{isRegister ? 'Already have an account?' : 'New around here?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create an account'}</Link></div>
        <div className="auth-secure"><i className="bi bi-lock" /> Your details stay safe and secure.</div>
      </div>
    </section>
  );
};

export default AuthPage;