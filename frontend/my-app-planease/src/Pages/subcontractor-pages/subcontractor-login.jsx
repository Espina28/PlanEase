export default function SubcontractorLogin() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        {/* Logo */}
        <div className="absolute top-8 left-8 text-2xl font-semibold">
          Event<span className="text-blue-500">Ease</span>
        </div>
  
        {/* Login Card */}
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 mb-6">to get started</p>
  
          <form>
            <input
              type="email"
              placeholder="subcontractor@gmail.com"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="password"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
  
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded shadow"
            >
              Login
            </button>
          </form>
  
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    );
  }
  