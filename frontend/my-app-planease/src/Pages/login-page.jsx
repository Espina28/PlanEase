import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebook } from "react-icons/fa"; // Facebook icon

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          </div>

          <div className="space-y-6">
            {/* Login Buttons Container */}
            <div className="flex space-x-4">
              {/* Google Login Button (Styled) */}
              <button className="flex items-center justify-center w-full h-12 border rounded-lg shadow-sm hover:shadow-md transition text-gray-700">
                <FcGoogle size={24} className="mr-2" />
                Login with Google
              </button>
              
              {/* Facebook Login Button (Styled) */}
              <button className="flex items-center justify-center w-full h-12 border rounded-lg shadow-sm hover:shadow-md transition text-gray-700">
                <FaFacebook size={24} className="mr-2" />
                Login with Facebook
              </button>
            </div>

            {/* Email input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <CustomInput
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                hint="planease@gmail.com"
                className="w-full"
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

            {/* Login button */}
            <CustomButton className="w-full h-12" fontSize="text-sm">
              LOGIN
            </CustomButton>

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
