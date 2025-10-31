import React, { useState } from "react";
import { bookingAPI, promoAPI } from "../services/api";

interface BookingFormProps {
  onBookingDataChange?: (data: any) => void; // Optional callback to lift state up
}

const BookingForm: React.FC<BookingFormProps> = ({ onBookingDataChange }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode) return alert("Enter a promo code first");
    try {
      setApplyingPromo(true);
      const response = await promoAPI.validate(promoCode);
      if (response.data.valid) {
        alert(`Promo code "${promoCode}" applied!`);
      } else {
        alert(`Promo code "${promoCode}" is invalid`);
      }
    } catch (err) {
      console.error(err);
      alert("Error validating promo code");
    } finally {
      setApplyingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the terms and safety policy");
      return;
    }

    const bookingData = {
      fullName,
      email,
      promoCode: promoCode || null,
    };

    console.log("Sending booking data to backend:", bookingData);

    try {
      const response = await bookingAPI.create(bookingData);
      alert("Booking submitted successfully!");
      console.log("Booking response:", response.data);

      // Optional: lift state up to parent (e.g., CheckoutPage)
      if (onBookingDataChange) onBookingDataChange(response.data);
    } catch (err: any) {
      console.error("Booking API error:", err.response?.data || err.message);
      alert("Failed to submit booking. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[739px] h-[198px] bg-[#EFEFEF] rounded-[12px] p-[20px_24px] flex flex-col gap-4"
    >
      {/* Top Section: Name & Email */}
      <div className="w-[691px] flex gap-[24px]">
        {/* Full Name */}
        <div className="flex flex-col gap-2 w-[333.5px]">
          <label className="text-[#5B5B5B] font-inter text-[14px] leading-[18px]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 placeholder-[#727272] text-[14px] font-inter"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 w-[333.5px]">
          <label className="text-[#5B5B5B] font-inter text-[14px] leading-[18px]">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 placeholder-[#727272] text-[14px] font-inter"
          />
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="w-[691px] flex gap-4 items-center">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-[604px] h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 placeholder-[#727272] text-[14px] font-inter"
        />
        <button
          type="button"
          onClick={handleApplyPromo}
          disabled={applyingPromo}
          className="w-[71px] h-[42px] bg-[#161616] rounded-[8px] text-white font-inter font-medium text-[14px] hover:bg-[#FFD643] transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Bottom Section: Checkbox */}
      <div className="w-[256px] flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer relative">
          {/* Hidden default checkbox */}
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="appearance-none w-0 h-0"
          />

          {/* Custom checkbox */}
          <span
            className={`w-4 h-4 flex items-center justify-center border border-[#5B5B5B] rounded-sm
              ${agreed ? "bg-[#161616]" : "bg-transparent"}
            `}
          >
            {agreed && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>

          <span className="text-[#5B5B5B] font-inter text-[12px] leading-[16px]">
            I agree to the terms and safety policy
          </span>
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
