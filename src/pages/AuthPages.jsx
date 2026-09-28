import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DEMO_USER } from "../data/shopData";

export default function AuthPages({ mode, onSignIn, onSignUp }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || "/profile";

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    setBusy(true);
    const result = isLogin ? onSignIn(form.email, form.password) : onSignUp(form);
    setBusy(false);
    if (result.ok) navigate(returnTo, { replace: true });
    else setMessage(result.message);
  };

  const fillDemo = () => {
    const result = onSignIn(DEMO_USER.email, DEMO_USER.password);
    if (result.ok) navigate(returnTo, { replace: true });
    else setMessage(result.message);
  };

  return (
    <section className="auth-section container">
      <div className="auth-aside">
        <span className="eyebrow">YOUR SPACE</span>
        <h1>{isLogin ? <>Good to<br /><em>have you back.</em></> : <>One step<br /><em>to get started.</em></>}</h1>
        <p>{isLogin ? "Sign in to find your saved pieces and order history." : "Create an account to save your favorites and keep your orders close."}</p>
        <div className="auth-aside-mark">noma<span>.</span></div>
      </div>
      <div className="auth-form-panel">
        <span className="eyebrow">{isLogin ? "WELCOME BACK" : "JOIN NOMA"}</span>
        <h2>{isLogin ? "Log in to your account" : "Create your Noma account"}</h2>
        <form onSubmit={submit} className="account-form">
          {!isLogin && <label>Full name<input name="name" value={form.name} onChange={update} autoComplete="name" required minLength="2" /></label>}
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required /></label>
          {!isLogin && <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" required minLength="8" /></label>}
          <label>Password<input name="password" type="password" value={form.password} onChange={update} autoComplete={isLogin ? "current-password" : "new-password"} required minLength="8" /></label>
          {message && <p className="form-alert" role="alert">{message}</p>}
          <button className="btn btn-dark w-100 form-submit" type="submit" disabled={busy}>{isLogin ? "Log in" : "Create account"}</button>
        </form>
        {isLogin && <div className="demo-login"><span>For a quick demo:</span><button type="button" onClick={fillDemo}>Use demo account</button><small>{DEMO_USER.email} · {DEMO_USER.password}</small></div>}
        <p className="auth-switch">{isLogin ? "New to Noma?" : "Already have an account?"} <Link to={isLogin ? "/register" : "/login"}>{isLogin ? "Create an account" : "Log in"}</Link></p>
        <p className="demo-disclaimer">Demo only: account details are stored in this browser on this device.</p>
      </div>
    </section>
  );
}