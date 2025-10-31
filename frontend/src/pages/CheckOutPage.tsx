import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BookingForm from "../components/BookingForm";
import { bookingAPI } from "../services/api";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-medium text-red-600">
            No booking data found
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-[#FFD643] rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = async () => {
    if (!isFormValid || !formData)
      return alert("Please fill all fields correctly.");

    try {
      setIsProcessing(true);

      const bookingDate = new Date(bookingData.selectedDate);
      const [startTime, endTime] = bookingData.selectedTime
        .split(" - ")
        .map((t: string) => t.trim());

      const bookingPayload = {
        experienceId: bookingData.experienceId,
        customerInfo: {
          name: formData.fullName,
          email: formData.email,
        },
        bookingDetails: {
          date: bookingDate.toISOString(),
          timeSlot: { startTime, endTime },
          numberOfGuests: bookingData.quantity,
        },
        promoCode: formData.promoCode || undefined,
      };

      console.log("Sending to backend:", bookingPayload);
      const response = await bookingAPI.create(bookingPayload);

      navigate("/confirmation", {
        state: {
          success: true,
          bookingReference: response.data.data.bookingReference,
          bookingData: response.data.data,
        },
      });
    } catch (error: any) {
      console.error("Booking Error:", error.response?.data || error.message);
      navigate("/confirmation", {
        state: {
          success: false,
          error:
            error.response?.data?.message ||
            "Booking failed. Please try again.",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] pt-4 pb-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[124px]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-[14px] font-medium text-black hover:text-[#FFD643] transition-colors"
      >
        <BiArrowBack className="text-xl" />
        <span>Checkout</span>
      </button>

      {/* Checkout Layout */}
      <div className="flex flex-row-reverse justify-between gap-8 font-inter">
        {/* Booking Summary */}
        <div className="w-[387px] flex flex-col gap-6 bg-[#EFEFEF] rounded-xl p-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-20 ">
              <span>Experience</span>
              <span className="line-clamp-1">
                {bookingData.experienceTitle || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>
                {new Date(bookingData.selectedDate).toISOString().split("T")[0]}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{bookingData.selectedTime.split(" - ")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{bookingData.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{bookingData.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{bookingData.taxes}</span>
            </div>
            <div className="w-full h-[1px] bg-[#D9D9D9] my-2"></div>
            <div className="flex justify-between font-medium text-[20px]">
              <span>Total</span>
              <span>₹{bookingData.total}</span>
            </div>

            {/* ✅ Moved Submit Button */}
            <button
              onClick={handleBookingSubmit}
              disabled={isProcessing || !isFormValid}
              className="w-full h-[44px] bg-[#161616] rounded-[8px] text-white text-[16px] font-medium hover:bg-[#FFD643] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isProcessing ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm
          onBookingSubmit={() => {}}
          isProcessing={isProcessing}
          onFormValidChange={(valid, data) => {
            setIsFormValid(valid);
            setFormData(data);
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
