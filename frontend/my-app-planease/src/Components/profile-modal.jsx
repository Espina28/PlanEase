"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil, Check, X, KeyRound, MapPin, ChevronDown } from "lucide-react"
import axios from "axios"

const API_BASE_URL = "http://localhost:8080"

export function ProfileModal({ open, onOpenChange }) {
  const modalRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    region: "",
    province: "",
    cityAndMul: "",
    barangay: "",
    phone: "",
    profilePicture: null,
    role: "",
  })

  // Location state
  const [regions, setRegions] = useState([])
  const [provinces, setProvinces] = useState([])
  const [citiesMunicipalities, setCitiesMunicipalities] = useState([])
  const [barangays, setBarangays] = useState([])

  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCityMunicipality, setSelectedCityMunicipality] = useState("")
  const [selectedBarangay, setSelectedBarangay] = useState("")

  // Phone number state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ code: "PH", dialCode: "+63", flag: "🇵🇭" })
  const [showCountryList, setShowCountryList] = useState(false)
  const countryListRef = useRef(null)

  // Countries data with flags and dial codes
  const [countries, setCountries] = useState([
    { code: "PH", dialCode: "+63", flag: "🇵🇭", name: "Philippines" }, // Default while loading
  ])

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag")
      .then((response) => response.json())
      .then((data) => {
        const formattedCountries = data
          .filter((country) => country.idd.root) // Only countries with dial codes
          .map((country) => ({
            code: country.cca2,
            dialCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
            flag: country.flag,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        // Set Philippines as first in the list
        const philippines = formattedCountries.find((c) => c.code === "PH")
        const withoutPH = formattedCountries.filter((c) => c.code !== "PH")

        setCountries([philippines, ...withoutPH].filter(Boolean))
      })
      .catch((error) => {
        console.error("Error fetching countries:", error)
      })
  }, [])

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryListRef.current && !countryListRef.current.contains(event.target)) {
        setShowCountryList(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch Regions on mount
  useEffect(() => {
    axios
      .get("https://psgc.gitlab.io/api/regions/")
      .then((res) => setRegions(res.data))
      .catch((err) => console.error("Error fetching regions:", err))
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")

        const { data: emailData } = await axios.get(`${API_BASE_URL}/user/getcurrentuser`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const userEmail = emailData.email

        const { data: userData } = await axios.get(`${API_BASE_URL}/user/getuser/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Fix: Use phoneNumber from userData
        const userPhone = userData.phoneNumber || ""

        setUser({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          email: userData.email || "",
          region: userData.region || "",
          province: userData.province || "",
          cityAndMul: userData.cityAndMul || "",
          barangay: userData.barangay || "",
          phone: userPhone,
          profilePicture: userData.profilePicture || null,
          role: userData.role || "",
        })

        // Extract phone number without country code if it exists
        if (userPhone) {
          // Try to match the phone number format (e.g., +63912345678)
          const phoneMatch = userPhone.match(/^\+(\d+)(\d{9,})$/)
          if (phoneMatch) {
            const countryCode = `+${phoneMatch[1]}`
            const phoneNum = phoneMatch[2]

            // Find the country by dial code
            const country = countries.find((c) => c.dialCode === countryCode) || countries[0]
            setSelectedCountry(country)
            setPhoneNumber(phoneNum)
          } else {
            // If format doesn't match, just use the whole string
            setPhoneNumber(userPhone.replace(/^\+\d+/, "")) // Remove country code if present
          }
        }
      } catch (err) {
        console.error("Failed to fetch user:", err)
      }
    }

    if (open) fetchUser()
  }, [open, countries])

  // Set up location dropdowns when user data is loaded
  useEffect(() => {
    const setupLocationData = async () => {
      if (user.region) {
        // Find the region code by name
        const regionData = regions.find((r) => r.name === user.region)
        if (regionData) {
          setSelectedRegion(regionData.code)

          // Fetch provinces for this region
          try {
            const { data } = await axios.get(`https://psgc.gitlab.io/api/regions/${regionData.code}/provinces/`)
            setProvinces(data)

            // Find province by name
            if (user.province) {
              const provinceData = data.find((p) => p.name === user.province)
              if (provinceData) {
                setSelectedProvince(provinceData.code)

                // Fetch cities for this province
                try {
                  const { data: citiesData } = await axios.get(
                    `https://psgc.gitlab.io/api/provinces/${provinceData.code}/cities-municipalities/`,
                  )
                  setCitiesMunicipalities(citiesData)

                  // Find city by name
                  if (user.cityAndMul) {
                    const cityData = citiesData.find((c) => c.name === user.cityAndMul)
                    if (cityData) {
                      setSelectedCityMunicipality(cityData.code)

                      // Fetch barangays for this city
                      try {
                        const { data: barangaysData } = await axios.get(
                          `https://psgc.gitlab.io/api/cities-municipalities/${cityData.code}/barangays/`,
                        )
                        setBarangays(barangaysData)

                        // Find barangay by name
                        if (user.barangay) {
                          const barangayData = barangaysData.find((b) => b.name === user.barangay)
                          if (barangayData) {
                            setSelectedBarangay(barangayData.code)
                          }
                        }
                      } catch (err) {
                        console.error("Error fetching barangays:", err)
                      }
                    }
                  }
                } catch (err) {
                  console.error("Error fetching cities:", err)
                }
              }
            }
          } catch (err) {
            console.error("Error fetching provinces:", err)
          }
        }
      }
    }

    if (regions.length > 0 && user.region) {
      setupLocationData()
    }
  }, [regions, user.region, user.province, user.cityAndMul, user.barangay])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onOpenChange(false)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") onOpenChange(false)
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [open, onOpenChange])

  if (!open) return null

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  // Generate full address from components
  const getFullAddress = () => {
    const parts = [user.barangay, user.cityAndMul, user.province, user.region].filter(
      (part) => part && part.trim() !== "",
    )

    return parts.length > 0 ? parts.join(", ") : "No address provided"
  }

  // Handle region change
  const handleRegionChange = async (e) => {
    const regionCode = e.target.value
    const regionName = e.target.options[e.target.selectedIndex].text

    setSelectedRegion(regionCode)
    handleChange("region", regionName)

    setSelectedProvince("")
    setSelectedCityMunicipality("")
    setSelectedBarangay("")
    handleChange("province", "")
    handleChange("cityAndMul", "")
    handleChange("barangay", "")

    setProvinces([])
    setCitiesMunicipalities([])
    setBarangays([])

    if (regionCode) {
      try {
        const { data } = await axios.get(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`)
        setProvinces(data)
      } catch (err) {
        console.error("Error fetching provinces:", err)
      }
    }
  }

  // Handle province change
  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value
    const provinceName = e.target.options[e.target.selectedIndex].text

    setSelectedProvince(provinceCode)
    handleChange("province", provinceName)

    setSelectedCityMunicipality("")
    setSelectedBarangay("")
    handleChange("cityAndMul", "")
    handleChange("barangay", "")

    setCitiesMunicipalities([])
    setBarangays([])

    if (provinceCode) {
      try {
        const { data } = await axios.get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`)
        setCitiesMunicipalities(data)
      } catch (err) {
        console.error("Error fetching cities:", err)
      }
    }
  }

  // Handle city/municipality change
  const handleCityMunicipalityChange = async (e) => {
    const cityCode = e.target.value
    const cityName = e.target.options[e.target.selectedIndex].text

    setSelectedCityMunicipality(cityCode)
    handleChange("cityAndMul", cityName)

    setSelectedBarangay("")
    handleChange("barangay", "")

    setBarangays([])

    if (cityCode) {
      try {
        const { data } = await axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`)
        setBarangays(data)
      } catch (err) {
        console.error("Error fetching barangays:", err)
      }
    }
  }

  // Handle barangay change
  const handleBarangayChange = (e) => {
    const barangayCode = e.target.value
    const barangayName = e.target.options[e.target.selectedIndex].text

    setSelectedBarangay(barangayCode)
    handleChange("barangay", barangayName)
  }

  // Handle phone number change
  const handlePhoneNumberChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setPhoneNumber(value)

    // Update the full phone number in user state
    handleChange("phone", selectedCountry.dialCode + value)
  }

  // Check if phone number is empty - fix the check to use the actual phone number
  const isPhoneEmpty = !user.phone || user.phone.trim() === ""

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-18">
      <div
        ref={modalRef}
        className="bg-white rounded-md shadow-lg w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Top header bar */}
        <div className="bg-slate-900 h-12 relative flex items-center justify-between px-4">
          <div></div>
          <button onClick={() => onOpenChange(false)} className="text-white hover:text-gray-300" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Profile Header */}
        <div className="px-8 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              {user.profilePicture ? (
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-3xl font-semibold select-none">
                  {user.firstname ? user.firstname.charAt(0).toUpperCase() : "?"}
                </div>
              )}

              {/* Profile Info */}
              <div>
                <div className="text-xl font-semibold">
                  {user.firstname} {user.lastname}
                </div>
                <div className="text-sm text-gray-500 mb-1">{user.role || "No Role"}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span className="line-clamp-2">{getFullAddress()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center px-3 py-2 h-9 text-sm text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
              >
                {editMode ? <Check size={16} className="mr-2" /> : <Pencil size={16} className="mr-2" />}
                {editMode ? "Save" : "Edit"}
              </button>
              <button className="flex items-center px-3 py-2 h-9 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <KeyRound size={16} className="mr-2" />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-5">
                <InputField
                  label="Firstname"
                  value={user.firstname}
                  onChange={(val) => handleChange("firstname", val)}
                  editable={editMode}
                />
                <InputField
                  label="Email"
                  value={user.email}
                  onChange={(val) => handleChange("email", val)}
                  editable={editMode}
                />
              </div>

              {/* Right */}
              <div className="space-y-5">
                <InputField
                  label="Lastname"
                  value={user.lastname}
                  onChange={(val) => handleChange("lastname", val)}
                  editable={editMode}
                />

                {/* Phone Number with country code */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-600">Phone number</label>
                    {isPhoneEmpty && <span className="text-red-500 text-xs">(Fill In)</span>}
                  </div>

                  {editMode ? (
                    <div className="flex">
                      <div className="relative">
                        <button
                          type="button"
                          className="flex items-center justify-between h-11 px-3 bg-white border border-gray-300 focus:border-blue-500 transition-colors rounded-l"
                          onClick={() => setShowCountryList(!showCountryList)}
                          aria-label="Select country code"
                        >
                          <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                          <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                          <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                        </button>

                        {/* Country dropdown */}
                        {showCountryList && (
                          <div
                            ref={countryListRef}
                            className="absolute z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg"
                          >
                            <div className="sticky top-0 bg-white border-b">
                              <input
                                type="text"
                                placeholder="Search countries..."
                                className="w-full p-2 text-sm border-none focus:outline-none"
                                onChange={(e) => {
                                  // Search functionality could be added here
                                }}
                              />
                            </div>
                            {countries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  setSelectedCountry(country)
                                  setShowCountryList(false)
                                  // Update the full phone number in user state
                                  handleChange("phone", country.dialCode + phoneNumber)
                                }}
                              >
                                <span className="mr-2 text-lg">{country.flag}</span>
                                <span className="text-sm">{country.name}</span>
                                <span className="ml-auto text-sm text-gray-500">{country.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder={phoneNumber || "9123456789"}
                        className={`w-full h-11 px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isPhoneEmpty ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={user.phone || "Empty"}
                      readOnly
                      className="w-full h-11 px-3 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-5">
                {/* Region */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-600">Region</label>
                    {(!user.region || user.region.trim() === "") && (
                      <span className="text-red-500 text-xs">(Fill In)</span>
                    )}
                  </div>
                  {editMode ? (
                    <select
                      className={`w-full h-11 px-3 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all ${
                        !user.region || user.region.trim() === "" ? "border-red-500" : ""
                      }`}
                      onChange={handleRegionChange}
                      value={selectedRegion}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.code} value={region.code}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={user.region || "Empty"}
                      readOnly
                      className="w-full h-11 px-3 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  )}
                </div>

                {/* City/Municipality */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-600">City/Municipality</label>
                    {(!user.cityAndMul || user.cityAndMul.trim() === "") && (
                      <span className="text-red-500 text-xs">(Fill In)</span>
                    )}
                  </div>
                  {editMode ? (
                    <select
                      className={`w-full h-11 px-3 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all ${
                        !user.cityAndMul || user.cityAndMul.trim() === "" ? "border-red-500" : ""
                      }`}
                      onChange={handleCityMunicipalityChange}
                      disabled={!selectedProvince}
                      value={selectedCityMunicipality}
                    >
                      <option value="">Select City/Municipality</option>
                      {citiesMunicipalities.map((city) => (
                        <option key={city.code} value={city.code}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={user.cityAndMul || "Empty"}
                      readOnly
                      className="w-full h-11 px-3 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="space-y-5">
                {/* Province */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-600">Province</label>
                    {(!user.province || user.province.trim() === "") && (
                      <span className="text-red-500 text-xs">(Fill In)</span>
                    )}
                  </div>
                  {editMode ? (
                    <select
                      className={`w-full h-11 px-3 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all ${
                        !user.province || user.province.trim() === "" ? "border-red-500" : ""
                      }`}
                      onChange={handleProvinceChange}
                      disabled={!selectedRegion}
                      value={selectedProvince}
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={user.province || "Empty"}
                      readOnly
                      className="w-full h-11 px-3 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  )}
                </div>

                {/* Barangay */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-600">Barangay</label>
                    {(!user.barangay || user.barangay.trim() === "") && (
                      <span className="text-red-500 text-xs">(Fill In)</span>
                    )}
                  </div>
                  {editMode ? (
                    <select
                      className={`w-full h-11 px-3 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all ${
                        !user.barangay || user.barangay.trim() === "" ? "border-red-500" : ""
                      }`}
                      onChange={handleBarangayChange}
                      disabled={!selectedCityMunicipality}
                      value={selectedBarangay}
                    >
                      <option value="">Select Barangay</option>
                      {barangays.map((barangay) => (
                        <option key={barangay.code} value={barangay.code}>
                          {barangay.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={user.barangay || "Empty"}
                      readOnly
                      className="w-full h-11 px-3 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, editable }) {
  // Ensure value is always a string
  const safeValue = value || ""
  const isEmpty = safeValue.trim() === ""

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-gray-600">{label}</label>
        {isEmpty && <span className="text-red-500 text-xs">(Fill In)</span>}
      </div>
      <input
        type="text"
        // Always provide a string value to keep the input controlled
        value={editable ? safeValue : isEmpty ? "Empty" : safeValue}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!editable}
        className={`w-full h-11 px-3 py-2 border rounded-md text-sm 
          ${editable ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500 cursor-not-allowed"} 
          ${isEmpty && editable ? "border-red-500" : ""}`}
      />
    </div>
  )
}
