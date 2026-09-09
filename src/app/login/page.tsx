
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useAuth();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser({
          E_ID: data.user.e_id,
          Designation: data.user.designation,
          E_Fname: data.user.e_fname,
          E_Lname: data.user.e_lname,
        });

        const role = (data.user.designation || '').toLowerCase();

        if (
          role === 'admin' ||
          role === 'owner' ||
          role === 'manager'
        ) {
          router.push('/admin');
        } else if (role === 'pharmacist') {
          router.push('/pharmacist');
        } else if (role === 'staff') {
          router.push('/staff');
        } else {
          router.push('/');
        }
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);

      setError(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="w-full bg-[#0B1F3A] shadow-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">

          <div className="flex items-center justify-between">

            {/* BRAND */}
            <div className="flex items-center gap-4">

              {/* LOGO */}
              <div
                className="
                  w-12 h-12
                  sm:w-14 sm:h-14
                  rounded-2xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <span
                  className="
                    text-[#0B1F3A]
                    text-2xl
                    sm:text-3xl
                    font-black
                  "
                >
                  M
                </span>
              </div>

              {/* BRAND NAME */}
              <div>
                <h1
                  className="
                    text-xl
                    sm:text-2xl
                    font-extrabold
                    tracking-[0.18em]
                    text-white
                  "
                >
                  MERTI
                </h1>

                <p
                  className="
                    text-[9px]
                    sm:text-xs
                    tracking-wider
                    text-blue-200
                    mt-0.5
                  "
                >
                  PHARMACY MANAGEMENT SYSTEM
                </p>
              </div>

            </div>

            {/* SYSTEM STATUS */}
            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/20
              "
            >
              <span
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                "
              />

              <span className="text-xs text-blue-100 font-medium">
                System Online
              </span>
            </div>

          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}
      <main
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          py-10
          sm:py-14
        "
      >

        <div className="w-full max-w-md">

          {/* =================================================
              LOGIN CARD
          ================================================== */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-[0_20px_60px_rgba(11,31,58,0.15)]
              overflow-hidden
              border
              border-blue-100
            "
          >

            {/* BLUE TOP ACCENT */}
            <div
              className="
                h-1.5
                w-full
                bg-[#0B1F3A]
              "
            />

            <div
              className="
                px-6
                py-8
                sm:px-10
                sm:py-10
              "
            >

              {/* =================================================
                  LOGO
              ================================================== */}
              <div className="flex justify-center mb-7">

                <div
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-3xl
                    bg-[#0B1F3A]
                    flex
                    items-center
                    justify-center
                    shadow-xl
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      sm:w-16
                      sm:h-16
                      rounded-2xl
                      bg-white
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <span
                      className="
                        text-3xl
                        sm:text-4xl
                        font-black
                        text-[#0B1F3A]
                      "
                    >
                      M
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  WELCOME
              ================================================== */}
              <div className="text-center mb-8">

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    font-extrabold
                    text-[#0B1F3A]
                  "
                >
                  Welcome Back
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    sm:text-base
                    text-slate-500
                  "
                >
                  Sign in to manage your pharmacy
                </p>

              </div>


              {/* =================================================
                  LOGIN FORM
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* USERNAME */}
                <div>

                  <label
                    htmlFor="username"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >
                    Username
                  </label>

                  <div className="relative">

                    {/* USER ICON */}
                    <div
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        pointer-events-none
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>

                    {/* USERNAME INPUT */}
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                      className="
                        w-full
                        pl-12
                        pr-4
                        py-3.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        text-slate-900
                        placeholder-slate-400
                        outline-none
                        transition-all
                        duration-200
                        focus:bg-white
                        focus:border-blue-600
                        focus:ring-4
                        focus:ring-blue-100
                        hover:border-slate-300
                      "
                    />

                  </div>

                </div>


                {/* PASSWORD */}
                <div>

                  <label
                    htmlFor="password"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >
                    Password
                  </label>

                  <div className="relative">

                    {/* LOCK ICON */}
                    <div
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        pointer-events-none
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>

                    {/* PASSWORD INPUT */}
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="
                        w-full
                        pl-12
                        pr-4
                        py-3.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        text-slate-900
                        placeholder-slate-400
                        outline-none
                        transition-all
                        duration-200
                        focus:bg-white
                        focus:border-blue-600
                        focus:ring-4
                        focus:ring-blue-100
                        hover:border-slate-300
                      "
                    />

                  </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================== */}
                {error && (
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                      p-4
                      rounded-xl
                      bg-red-50
                      border
                      border-red-200
                    "
                  >

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="
                        w-5
                        h-5
                        text-red-500
                        flex-shrink-0
                      "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16a2 2 0 001.73 3z"
                      />
                    </svg>

                    <p
                      className="
                        text-sm
                        text-red-700
                        font-medium
                      "
                    >
                      {error}
                    </p>

                  </div>
                )}


                {/* =================================================
                    SIGN IN BUTTON
                ================================================== */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    py-3.5
                    px-4
                    rounded-xl
                    bg-[#0B1F3A]
                    hover:bg-[#12345B]
                    disabled:bg-slate-400
                    disabled:cursor-not-allowed
                    text-white
                    font-bold
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-200
                    active:scale-[0.98]
                    focus:outline-none
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

              </form>


              {/* =================================================
                  SECURITY MESSAGE
              ================================================== */}
              <div
                className="
                  mt-7
                  pt-5
                  border-t
                  border-slate-100
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                <p className="text-xs text-slate-500">
                  Secure pharmacy management system
                </p>

              </div>

            </div>

          </div>


          {/* AUTHORIZED USER */}
          <div className="text-center mt-6">

            <p
              className="
                text-xs
                sm:text-sm
                text-slate-500
                font-medium
              "
            >
              Authorized pharmacy personnel only
            </p>

          </div>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer
        className="
          w-full
          bg-[#0B1F3A]
          border-t
          border-blue-900
          px-4
          py-5
          text-center
        "
      >

        <p
          className="
            text-xs
            sm:text-sm
            text-blue-100
          "
        >
          © {new Date().getFullYear()} MERTI Pharmacy Management System
        </p>

        <p
          className="
            text-[11px]
            sm:text-xs
            text-blue-300
            mt-1
          "
        >
          Made by SAMRAWITF
        </p>

      </footer>

    </div>
  );
}

