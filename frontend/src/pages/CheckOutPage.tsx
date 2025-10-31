import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BookingForm from "../components/BookingForm";
import { bookingAPI } from "../services/api";

interface SlotSelection {
  startTime: string;
  endTime: string;
  price: number;
  date: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialBookingData = location.state || {};

  const [bookingData, setBookingData] = useState({
    experienceId: initialBookingData.experienceId || "",
    experienceTitle: initialBookingData.experienceTitle || "",
    selectedSlot: initialBookingData.selectedSlot as SlotSelection | null || null,
    quantity: initialBookingData.quantity || 1,
    pricePerPerson: initialBookingData.pricePerPerson || 0,
    subtotal: initialBookingData.subtotal || 0,
    taxes: initialBookingData.taxes || 0,
    total: initialBookingData.total || 0,
    customerName: initialBookingData.customerName || "",
    customerEmail: initialBookingData.customerEmail || "",
    customerPhone: initialBookingData.customerPhone || "",
    promoCode: initialBookingData.promoCode || "",
  });

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!bookingData.experienceId || !bookingData.selectedSlot) {
      alert("Please select a valid experience, date, and time slot.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        experienceId: bookingData.experienceId,
        customerInfo: {
          name: bookingData.customerName || "John Doe",
          email: bookingData.customerEmail || "john@example.com",
          phone: bookingData.customerPhone || "+919876543210",
        },
        bookingDetails: {
          date: bookingData.selectedSlot.date,
          timeSlot: {
            startTime: bookingData.selectedSlot.startTime,
            endTime: bookingData.selectedSlot.endTime,
          },
          numberOfGuests: bookingData.quantity,
        },
        promoCode: bookingData.promoCode || "",
      };

      const response = await bookingAPI.create(payload);
      const bookingRef = response.data.booking?.bookingReference;

      if (bookingRef) {
        console.log("✅ Booking created! Reference:", bookingRef);
        alert(`Booking confirmed! Reference: ${bookingRef}`);
        // Optionally navigate to confirmation page
        navigate("/confirmation", { state: { bookingReference: bookingRef } });
      } else {
        alert("Booking created but no reference returned. Check backend.");
      }
    } catch (error: any) {
      console.error("❌ Booking failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] mt-2 pt-1 pb-[5rem] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[124px]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 w-[100px] h-[28px] text-[14px] font-medium text-black bg-transparent hover:cursor-pointer"
      >
        <BiArrowBack className="text-xl" />
        <span className="text-[14px]">Checkout</span>
      </button>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row gap-8 pt-[44px] justify-between">
        {/* Left: Booking Form */}
        <BookingForm bookingData={bookingData} setBookingData={setBookingData} />

        {/* Right: Summary */}
        <div className="w-[387px] flex flex-col gap-6 bg-[#EFEFEF] rounded-xl p-6">
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between gap-[72px]">
              <span className="font-inter font-normal text-[16px] text-black">Experience</span>
              <span className="font-inter font-normal text-[16px] text-black line-clamp-1">
                {bookingData.experienceTitle || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-inter font-normal text-[16px] text-black">Date</span>
              <span className="font-inter font-normal text-[16px] text-black">
                {bookingData.selectedSlot
                  ? new Date(bookingData.selectedSlot.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-inter font-normal text-[16px] text-black">Time</span>
              <span className="font-inter font-normal text-[16px] text-black">
                {bookingData.selectedSlot
                  ? `${bookingData.selectedSlot.startTime} - ${bookingData.selectedSlot.endTime}`
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-inter font-normal text-[16px] text-black">Qty</span>
              <span className="font-inter font-normal text-[16px] text-black">{bookingData.quantity}</span>
            </div>

            {/* Pricing */}
            <div className="flex justify-between w-full">
              <span className="font-inter font-normal text-[16px] text-black">Subtotal</span>
              <span className="font-inter font-normal text-[16px] text-black">₹{bookingData.subtotal}</span>
            </div>

            <div className="flex justify-between w-full">
              <span className="font-inter font-normal text-[16px] text-black">Taxes</span>
              <span className="font-inter font-normal text-[16px] text-black">₹{bookingData.taxes}</span>
            </div>

            <div className="w-full h-[1px] bg-[#D9D9D9] my-2"></div>

            <div className="flex justify-between w-full">
              <span className="font-inter font-medium text-[20px] text-black">Total</span>
              <span className="font-inter font-medium text-[20px] text-black">₹{bookingData.total}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full h-[44px] py-3 px-5 rounded-[8px] text-white font-inter font-medium text-[16px] transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFD643]"
            }`}
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
