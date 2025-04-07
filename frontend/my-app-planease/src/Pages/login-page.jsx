"use client"

import { useState,useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import CustomInput from "../Components/CustomInput"
import CustomButton from "../Components/CustomButton"
import { FcGoogle } from "react-icons/fc" // Google icon
import { FaFacebook } from "react-icons/fa" // Facebook icon
import axios from "axios"; // Make sure axios is imported

import { useAuth } from "../Components/AuthProvider"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const clientGoogleId = "1018156473391-pqrb7r3gl54f7sqeqng31h9mctab3hhs.apps.googleusercontent.com";
  const clientFacebookId = "687472957271649";

  const navigate = useNavigate()
  const { loginAction } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await loginAction({ email, password }, navigate);
  
      if (!response || response.error) {
        throw new Error(response?.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
  
      // Improved error handling
      setError(
        error?.response?.data?.message || 
        error?.message || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [googleApiReady, setGoogleApiReady] = useState(false)
  const [googleApiLoading, setGoogleApiLoading] = useState(true)
  const [facebookApiReady, setFacebookApiReady] = useState(false)
  const [facebookApiLoading, setFacebookApiLoading] = useState(true)

  // Load Google Identity Services script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      setGoogleApiReady(true)
      setGoogleApiLoading(false)
    }
    script.onerror = () => {
      console.error('Google Identity Services script failed to load')
      setGoogleApiLoading(false)
      setError('Failed to load Google login service')
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Load Facebook SDK script
  useEffect(() => {
    if (document.getElementById('facebook-jssdk')) {
      setFacebookApiLoading(false)
      setFacebookApiReady(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: clientFacebookId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        })
        setFacebookApiReady(true)
        setFacebookApiLoading(false)
      }
    }
    script.onerror = () => {
      console.error('Facebook SDK failed to load')
      setFacebookApiLoading(false)
      setError('Failed to load Facebook login service')
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSocialLogin = async(provider) => {
    if (provider === "Google") {
      try {
        if (googleApiLoading) {
          setError('Google login is still loading, please wait')
          return
        }
        if (!googleApiReady || !window.google) {
          setError('Google login is not available right now')
          return
        }

        setError("")
        setIsLoading(true)

        // Initialize Google Identity Services
        const client = google.accounts.oauth2.initTokenClient({
          client_id: clientGoogleId,
          scope: 'profile email',
          callback: async (response) => {
            if (response.error) {
              console.error('Google login error:', response.error)
              setError('Google login failed')
              setIsLoading(false)
              return
            }

            try {
              // Get user profile using the access token
              const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${response.access_token}`
                }
              })
              const profile = await profileResponse.json()
              console.log(profile)

              // Check if user exists in the database
              const checkUserResponse = await axios.get("http://localhost:8080/user/check-user", {
                params: { email: profile.email },
              });

              if (checkUserResponse.data.exists) {
                const credentials = {
                  email: profile.email,
                  password: profile.sub, // Use Google ID as temporary password
                };
                await loginAction(credentials, navigate);
              } else {
                const registrationData = {
                  firstname: profile.given_name,
                  lastname: profile.family_name,
                  email: profile.email,
                  password: profile.sub,
                  phoneNumber: null,
                  region: null,
                  province: null,
                  cityAndMul: null,
                  barangay: null,
                  role: "USER",
                  profilePicture: profile.picture,
                  isGoogle: true,
                  isFacebook: false,
                };
                await axios.post("http://localhost:8080/user/register", registrationData);
                const loginCredentials = {
                  email: profile.email,
                  password: profile.sub,
                };
                await loginAction(loginCredentials, navigate);
              }
              window.dispatchEvent(new Event("storage"));
            } catch (err) {
              console.error("Login/registration error:", err);
              setError("An error occurred during login.");
            } finally {
              setIsLoading(false);
            }
          }
        });

        client.requestAccessToken();
      } catch (err) {
        console.error("Google login error:", err);
        setIsLoading(false);
        setError("An error occurred during login.");
      }
    }
    if (provider === "Facebook") {
      try {
        if (facebookApiLoading) {
          setError('Facebook login is still loading, please wait')
          return
        }
        if (!facebookApiReady || !window.FB) {
          setError('Facebook login is not available right now')
          return
        }

        setError("")
        setIsLoading(true)

        FB.login(function(response) {
          if (response.authResponse) {
            // Explicitly set redirect URI for development
            const redirectUri = window.location.origin;
            console.log('Using redirect URI:', redirectUri);
            
            FB.api('/me', {fields: 'id,name,email,picture'}, async (profile) => {
              try {
                // Check if user exists in the database
                const checkUserResponse = await axios.get("http://localhost:8080/user/check-user", {
                  params: { email: profile.email },
                });

                if (checkUserResponse.data.exists) {
                  const credentials = {
                    email: profile.email,
                    password: profile.id, // Use Facebook ID as temporary password
                  };
                  await loginAction(credentials, navigate);
                } else {
                  const names = profile.name.split(' ');
                  const registrationData = {
                    firstname: names[0],
                    lastname: names.length > 1 ? names[1] : '',
                    email: profile.email,
                    password: profile.id,
                    phoneNumber: null,
                    region: null,
                    province: null,
                    cityAndMul: null,
                    barangay: null,
                    role: "USER",
                    profilePicture: profile.picture?.data?.url || null,
                    isGoogle: false,
                    isFacebook: true,
                  };
                  await axios.post("http://localhost:8080/user/register", registrationData);
                  const loginCredentials = {
                    email: profile.email,
                    password: profile.id,
                  };
                  await loginAction(loginCredentials, navigate);
                }
                window.dispatchEvent(new Event("storage"));
              } catch (err) {
                console.error("Login/registration error:", err);
                setError("An error occurred during login.");
              } finally {
                setIsLoading(false);
              }
            });
          } else {
            console.error('User cancelled login or did not fully authorize.');
            setError('Facebook login was cancelled');
            setIsLoading(false);
          }
        }, {scope: 'email,public_profile'});
      } catch (err) {
        console.error("Facebook login error:", err);
        setIsLoading(false);
        setError("An error occurred during login.");
      }
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Blue section with illustration */}
      <div className="hidden md:flex md:w-1/2 flex-col bg-sky-100 p-10 justify-between">
        <div className="text-2xl font-medium text-center">
          Event<span className="text-blue-500">Ease</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src="/placeholder.svg?height=250&width=250" alt="Calendar illustration" className="w-64 h-64 mb-6" />
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Find, Book, and Manage
              <br />
              Services with Ease
            </h2>
            <p className="text-gray-600 text-sm max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              <br />
              sed do eiusmod tempor incididunt.
            </p>
          </div>
        </div>
        <div className="h-10"></div> {/* Spacer */}
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-700">
              Welcome to Event<span className="text-blue-500">Ease</span>!
            </h1>
            <p className="mt-2 text-gray-600">Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Login Buttons Container */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Google Login Button (Styled) */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center w-full h-12 border rounded-lg shadow-sm hover:shadow-md transition text-gray-700"
              >
                <FcGoogle size={24} className="mr-2" />
                <span className="hidden sm:inline">Login with Google</span>
                <span className="sm:hidden">Google</span>
              </button>

              {/* Facebook Login Button (Styled) */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center w-full h-12 border rounded-lg shadow-sm hover:shadow-md transition text-gray-700"
              >
                <FaFacebook size={24} className="mr-2 text-blue-600" />
                <span className="hidden sm:inline">Login with Facebook</span>
                <span className="sm:hidden">Facebook</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <CustomInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hint="planease@gmail.com"
                className="w-full"
                required
              />
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <CustomInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  hint="Enter your password"
                  className="w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            {/* Error message - Moved to appear above the login button */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Login button */}
            <CustomButton type="submit" className="w-full h-12" fontSize="text-sm" disabled={isLoading}>
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </CustomButton>

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

