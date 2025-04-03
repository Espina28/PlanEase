  "use client"

  import { useState, useEffect } from "react"
  import { Eye, EyeOff } from "lucide-react"
  import { Link } from "react-router-dom"
  import CustomInput from "../Components/CustomInput"
  import CustomButton from "../Components/CustomButton"
  import axios from "axios"

  export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [passwordErrors, setPasswordErrors] = useState([])
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    // Location state
    const [regions, setRegions] = useState([])
    const [provinces, setProvinces] = useState([])
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([])
    const [barangays, setBarangays] = useState([])

    const [selectedRegion, setSelectedRegion] = useState("")
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCityMunicipality, setSelectedCityMunicipality] = useState("")

    // Fetch Regions on mount
    useEffect(() => {
      axios.get("https://psgc.gitlab.io/api/regions/")
        .then(res => setRegions(res.data))
        .catch(err => console.error("Error fetching regions:", err))
    }, [])

    // Handle Region change
    const handleRegionChange = async (regionCode) => {
      setSelectedRegion(regionCode)
      setSelectedProvince("")
      setSelectedCityMunicipality("")
      setProvinces([])
      setCitiesMunicipalities([])
      setBarangays([])

      const { data } = await axios.get(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`)
      setProvinces(data)
    }

    // Handle Province change
    const handleProvinceChange = async (provinceCode) => {
      setSelectedProvince(provinceCode)
      setSelectedCityMunicipality("")
      setCitiesMunicipalities([])
      setBarangays([])

      const { data } = await axios.get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`)
      setCitiesMunicipalities(data)
    }

    // Handle City/Municipality change
    const handleCityMunicipalityChange = async (cityCode) => {
      setSelectedCityMunicipality(cityCode)
      setBarangays([])

      const { data } = await axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`)
      setBarangays(data)
    }

    const validatePassword = (password) => {
      const errors = []
      let strength = 0

      // Check if it contains a capital letter
      if (/[A-Z]/.test(password)) {
        strength += 1
      } else {
        errors.push("Must have a capital letter")
      }

      // Check if it contains a number
      if (/\d/.test(password)) {
        strength += 1
      } else if (!errors.includes("Must have a capital letter")) {
        errors.push("Must have a number")
      }

      // Check if it contains a unique character
      if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1
      } else if (!errors.includes("Must have a capital letter") && !errors.includes("Must have a number")) {
        errors.push("Must have a unique character")
      }

      setPasswordStrength(strength)
      setPasswordErrors(errors)
    }

    const handlePasswordChange = (e) => {
      const newPassword = e.target.value
      setPassword(newPassword)
      validatePassword(newPassword)
    }

    const handleConfirmPasswordChange = (e) => {
      const value = e.target.value
      setConfirmPassword(value)
      setPasswordsMatch(value === password)
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

        {/* Right side - Sign Up form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-medium text-gray-700">
                Welcome to Event<span className="text-blue-500">Ease</span>!
              </h1>
            </div>

            <div className="space-y-6">
              {/* Firstname and Lastname in the same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Firstname */}
                <div className="space-y-1">
                  <label htmlFor="firstname" className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <CustomInput
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    hint="John"
                    className="w-full"
                  />
                </div>

                {/* Lastname */}
                <div className="space-y-1">
                  <label htmlFor="lastname" className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <CustomInput
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    hint="Doe"
                    className="w-full"
                  />
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
                    onChange={handlePasswordChange}
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

              {/* Show password strength and errors with smooth animation */}
              <div
                className="space-y-3 overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: password ? "200px" : "0",
                  opacity: password ? 1 : 0,
                  margin: password ? "1rem 0" : "0",
                }}
              >
                {/* Password Strength */}
                <div
                  className="space-y-1 transition-all duration-400 ease-in-out"
                  style={{
                    transform: password ? "translateY(0)" : "translateY(10px)",
                    opacity: password ? 1 : 0,
                    transitionDelay: "100ms",
                  }}
                >
                  <div className="text-sm font-medium text-gray-700">Password Strength</div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${passwordStrength === 3 ? "bg-green-500" : passwordStrength === 2 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{
                        width: `${(passwordStrength / 3) * 100}%`,
                        transitionDelay: "200ms",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Password requirements */}
                {passwordErrors.length > 0 && (
                  <div
                    className="space-y-1 text-sm text-red-500 transition-all duration-400 ease-in-out"
                    style={{
                      transform: password ? "translateY(0)" : "translateY(10px)",
                      opacity: password ? 1 : 0,
                      transitionDelay: "250ms",
                    }}
                  >
                    {passwordErrors.map((error, index) => (
                      <div
                        key={index}
                        className="transition-all duration-300"
                        style={{
                          transitionDelay: `${300 + index * 50}ms`,
                        }}
                      >
                        {error}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password input */}
              {passwordStrength === 3 && (
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <CustomInput
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      hint="Enter your password"
                      className="w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <div className="text-sm text-red-500">
                      Passwords do not match
                    </div>
                  )}
                </div>
              )}

              {/* Region and Province in the same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Region */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Region</label>
                  <select className="w-full p-2 border rounded" onChange={(e) => handleRegionChange(e.target.value)}>
                    <option value="">Select Region</option>
                    {regions.map(region => <option key={region.code} value={region.code}>{region.name}</option>)}
                  </select>
                </div>

                {/* Province */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Province</label>
                  <select className="w-full p-2 border rounded" onChange={(e) => handleProvinceChange(e.target.value)} disabled={!selectedRegion}>
                    <option value="">Select Province</option>
                    {provinces.map(province => <option key={province.code} value={province.code}>{province.name}</option>)}
                  </select>
                </div>
              </div>

              {/* City/Municipality and Barangay in the same row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City/Municipality */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">City/Municipality</label>
                  <select className="w-full p-2 border rounded" onChange={(e) => handleCityMunicipalityChange(e.target.value)} disabled={!selectedProvince}>
                    <option value="">Select City/Municipality</option>
                    {citiesMunicipalities.map(city => <option key={city.code} value={city.code}>{city.name}</option>)}
                  </select>
                </div>

                {/* Barangay */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Barangay</label>
                  <select className="w-full p-2 border rounded" disabled={!selectedCityMunicipality}>
                    <option value="">Select Barangay</option>
                    {barangays.map(barangay => <option key={barangay.code} value={barangay.code}>{barangay.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Sign Up button */}
              <CustomButton className="w-full h-12" fontSize="text-sm">SIGN UP</CustomButton>

            {/* Link to Login */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 font-medium">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
