import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCheck } from "react-icons/bs";

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingReference = location.state?.bookingReference || "HUF56&SO";

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[#F9F9F9] pt-[167px]">
      {/* ✅ Green Tick Circle */}
      <div className="w-[80px] h-[80px] rounded-full bg-[#24AC39] flex items-center justify-center">
        <BsCheck className="text-white text-4xl" />
      </div>

      {/* Booking Confirmed Heading */}
      <h1 className="mt-[32px] w-[294px] h-[40px] text-[#161616] text-2xl font-medium text-center">
        Booking Confirmed
      </h1>

      {/* Reference ID */}
      <p className="mt-[16px] w-[175px] h-[24px] text-[#656565] text-lg text-center">
        Ref ID: {bookingReference}
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-[40px] w-[138px] h-[36px] bg-[#E3E3E3] rounded-[4px] text-[#656565] text-base font-normal flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmation;
