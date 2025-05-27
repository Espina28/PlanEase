"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./styles/paymentproof-page.css"
import Navbar from "../../Components/Navbar"
import Footer from "../../Components/Footer"
import BookingSidePanel from "../../Components/Booking-sidepanel"
import { getCompleteBookingData, clearBookingData, PACKAGES } from "./utils/booking-storage"
import axios from "axios"

const PaymentProofPagePackage = () => {
  const navigate = useNavigate()
  const { packageName } = useParams()
  const fileInputRef = useRef(null)

  // Get package name from params or sessionStorage as fallback
  const currentPackageName = packageName || sessionStorage.getItem("currentPackageName") || "Package"

  const [uploadedFile, setUploadedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")

  // Get booking data for payment amount
  const [bookingData, setBookingData] = useState(getCompleteBookingData)

  // Refresh booking data when component mounts
  useEffect(() => {
    setBookingData(getCompleteBookingData())
  }, [])

  // Calculate payment amount (10% of package price)
  const calculateSubtotal = () => {
    const { servicesData } = bookingData
    if (servicesData.selectedPackage) {
      const selectedPkg = PACKAGES.find((pkg) => pkg.id === servicesData.selectedPackage)
      return selectedPkg ? selectedPkg.price : 0
    }
    return 0
  }

  const subtotal = calculateSubtotal()
  const paymentAmount = subtotal * 0.1 // 10% downpayment

  // Format number as Philippine Peso
  const formatAsPeso = (amount) => {
    return "₱" + amount.toLocaleString()
  }

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, etc.)")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      setUploadedFile(file)

      // Generate preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, etc.)")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      setUploadedFile(file)

      // Generate preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Prevent default behavior for drag events
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Helper function to get package ID
  const getPackageId = (packageName) => {
    const packageMap = {
      "cherry-blossom": 1,
      tulip: 2,
      rose: 3,
    }
    return packageMap[packageName] || null
  }

  // Convert date string to SQL Date format
  const convertToSqlDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toISOString().split("T")[0] // Returns YYYY-MM-DD format
  }

  // Validate booking data before submission
  const validateBookingData = () => {
    const { personalInfo, eventDetails, servicesData } = bookingData

    // Check personal info
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.contact) {
      alert("Missing personal information. Please go back and complete all required fields.")
      return false
    }

    // Check event details
    if (!eventDetails.location || !eventDetails.eventDate) {
      alert("Missing event details. Please go back and complete all required fields.")
      return false
    }

    // Check package selection
    if (!servicesData.selectedPackage) {
      alert("No package selected. Please go back and select a package.")
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!uploadedFile) {
      alert("Please upload your payment proof before submitting")
      return
    }

    if (!referenceNumber.trim()) {
      alert("Please enter your payment reference number")
      return
    }

    // Validate that reference number is numeric (since backend expects int)
    if (!/^\d+$/.test(referenceNumber.trim())) {
      alert("Payment reference number must contain only numbers")
      return
    }

    if (!validateBookingData()) {
      return
    }

    if (paymentAmount <= 0) {
      alert("Invalid payment amount. Please check your package selection.")
      return
    }

    setIsSubmitting(true)

    try {
      // Get user token and email
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Please log in to continue")
        setIsSubmitting(false)
        return
      }

      // Get user email from token
      const userResponse = await axios.get("http://localhost:8080/user/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const userEmail = userResponse.data.email

      console.log("User email:", userEmail)
      console.log("Package booking data:", bookingData)

      // Prepare booking transaction data matching the exact DTO structure
      const transactionData = {
        // Personal Information
        firstName: bookingData.personalInfo.firstName,
        lastName: bookingData.personalInfo.lastName,
        email: bookingData.personalInfo.email,
        contact: bookingData.personalInfo.contact,

        // Event Details
        eventName: currentPackageName,
        eventId: Number.parseInt(sessionStorage.getItem("currentEventId")) || 1, // Use 1 as default instead of 0
        transactionVenue: bookingData.eventDetails.location,
        transactionDate: convertToSqlDate(bookingData.eventDetails.eventDate),
        transactionNote: bookingData.eventDetails.note || "",

        // Package Information
        serviceType: "PACKAGE",
        packageId: getPackageId(bookingData.servicesData.selectedPackage),
        serviceIds: null, // No custom services for packages

        // Payment Information - matching DTO fields exactly
        paymentNote: `Payment for ${currentPackageName} package booking - Amount: ${formatAsPeso(paymentAmount)} - Ref: ${referenceNumber}`,
        paymentReferenceNumber: referenceNumber, // Keep as string for DTO, backend will convert
        // paymentReceipt will be set by backend after file upload

        // User
        userEmail: userEmail,
      }

      console.log("=== PACKAGE TRANSACTION DATA DEBUG ===")
      console.log("Service Type:", transactionData.serviceType)
      console.log("Package ID:", transactionData.packageId)
      console.log("Payment Amount:", formatAsPeso(paymentAmount))
      console.log("Transaction Date:", transactionData.transactionDate)
      console.log("Complete transaction data:", transactionData)

      // Validate package selection
      if (!transactionData.packageId) {
        alert("Error: Invalid package selection")
        setIsSubmitting(false)
        return
      }

      // Create FormData for multipart request
      const formData = new FormData()
      formData.append("paymentProof", uploadedFile)
      formData.append("bookingData", JSON.stringify(transactionData))

      console.log("FormData contents:")
      console.log("- paymentProof file:", uploadedFile.name, uploadedFile.type, uploadedFile.size)
      console.log("- bookingData JSON:", JSON.stringify(transactionData))

      // Submit to backend
      const response = await axios.post("http://localhost:8080/api/transactions/createBookingTransaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Response:", response.data)

      if (response.data.success) {
        setSubmitSuccess(true)

        // Clear booking data from sessionStorage
        clearBookingData()

        // Show success message and redirect
        setTimeout(() => {
          alert(
            `Package booking submitted successfully! Your transaction ID is: ${response.data.transactionId}. Our team will contact you to finalize the details.`,
          )
          navigate("/user-reservations")
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting package booking:", error)
      console.error("Error response:", error.response?.data)
      console.error("Error status:", error.response?.status)

      // Show more specific error message
      const errorMessage =
        error.response?.data?.message || error.response?.data || "Failed to submit package booking. Please try again."
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle previous button click
  const handlePrevious = () => {
    const validPackageName = packageName || currentPackageName
    navigate(`/book/${encodeURIComponent(validPackageName)}/package/preview`)
  }

  // Check if form is ready for submission
  const isFormReady = () => {
    return referenceNumber.trim() && uploadedFile && !isSubmitting && !submitSuccess && paymentAmount > 0
  }

  return (
    <>
      <Navbar />
      <div className="booking-container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/events-dashboard" onClick={() => clearBookingData()}>
            Home
          </Link>{" "}
          /<Link to={`/package/${encodeURIComponent(currentPackageName)}`}>{currentPackageName}</Link> /{" "}
          <span>Book Now</span>
        </div>

        <div className="booking-content">
          {/* Side Panel */}
          <BookingSidePanel activeStep="upload-payment" />

          {/* Main Content */}
          <div className="main-form-content">
            {/* Step Indicator - Modified for package flow (3 steps instead of 4) */}
            <div className="step-indicator">
              <div className="step completed">
                <div className="step-number">1</div>
                <div className="step-label">Enter Details</div>
              </div>
              <div className="step-line completed"></div>
              <div className="step completed">
                <div className="step-number">2</div>
                <div className="step-label">Preview</div>
              </div>
              <div className="step-line completed"></div>
              <div className="step active">
                <div className="step-number">3</div>
                <div className="step-label">Payment</div>
              </div>
            </div>

            {/* Payment Content */}
            <div className="payment-content">
              <h2 className="section-title">
                Payment for {currentPackageName} <span className="info-icon">ⓘ</span>
              </h2>

              {/* Payment Amount Summary */}
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatAsPeso(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Downpayment (10%):</span>
                  <span>{formatAsPeso(paymentAmount)}</span>
                </div>
                <div className="summary-row total">
                  <span>Amount to Pay:</span>
                  <strong>{formatAsPeso(paymentAmount)}</strong>
                </div>
              </div>

              {/* Payment QR Code Section */}
              <div className="payment-qr-section">
                <img src="/eventEase.jpg" alt="Payment QR Code" className="payment-qr" />
                <div className="payment-amount">
                  <span>Scan to pay:</span> <strong>{formatAsPeso(paymentAmount)}</strong>
                </div>
              </div>

              {/* Reference Number Section */}
              <h2 className="section-title">
                Payment Reference Number <span className="info-icon">ⓘ</span>
              </h2>

              <div className="reference-number-section">
                <p className="reference-instruction">
                  After making your payment, please enter the reference number from your transaction receipt below:
                </p>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter payment reference number (e.g., 1234567890)"
                  className="reference-input"
                  required
                />
              </div>

              {/* Proof of Payment Section */}
              <h2 className="section-title">
                Proof of Payment <span className="info-icon">ⓘ</span>
              </h2>

              <form onSubmit={handleSubmit}>
                <div
                  className={`upload-area ${previewUrl ? "has-file" : ""} ${!referenceNumber ? "disabled" : ""}`}
                  onClick={referenceNumber ? handleUploadClick : null}
                  onDrop={referenceNumber ? handleDrop : null}
                  onDragOver={referenceNumber ? handleDragOver : null}
                >
                  {!referenceNumber ? (
                    <div className="upload-placeholder disabled">
                      <div className="upload-icon">⚠️</div>
                      <div>Please enter reference number first</div>
                    </div>
                  ) : previewUrl ? (
                    <div className="preview-container">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Payment Proof Preview"
                        className="file-preview"
                      />
                      <div className="file-info">
                        <div className="file-name">{uploadedFile.name}</div>
                        <div className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <button
                        type="button"
                        className="change-file-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadClick()
                        }}
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">↑</div>
                      <div>Click here to upload or drop image here</div>
                      <div className="upload-hint">Supported: JPG, PNG (Max 5MB)</div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    required
                    disabled={!referenceNumber}
                  />
                </div>

                {/* Validation Messages */}
                {paymentAmount <= 0 && (
                  <div className="validation-error">
                    <p>⚠️ Invalid payment amount. Please go back and select a package.</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="navigation-buttons">
                  <button type="button" className="previous-button" onClick={handlePrevious} disabled={isSubmitting}>
                    Previous
                  </button>
                  <button
                    type="submit"
                    className={`submit-button ${!isFormReady() ? "disabled" : ""}`}
                    disabled={!isFormReady()}
                  >
                    {isSubmitting ? "Submitting..." : submitSuccess ? "Submitted ✓" : "Submit Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentProofPagePackage
