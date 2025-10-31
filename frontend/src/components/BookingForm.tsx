import React, { useState } from "react";
import { promoAPI } from "../services/api";

interface BookingFormProps {
  onBookingSubmit: (data: {
    fullName: string;
    email: string;
    promoCode?: string;
  }) => void;
  isProcessing: boolean;
  onFormValidChange?: (valid: boolean, data?: any) => void; 
}

const BookingForm: React.FC<BookingFormProps> = ({
  onFormValidChange,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  //  Apply promo
  const handleApplyPromo = async () => {
    if (!promoCode) return alert("Enter a promo code first");
    try {
      setApplyingPromo(true);
      const response = await promoAPI.validate(promoCode);

      if (response.data.success) {
        alert(`Promo code "${promoCode}" applied!`);
        setPromoApplied(true);
      } else {
        alert(`Promo code "${promoCode}" is invalid`);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error validating promo code");
    } finally {
      setApplyingPromo(false);
    }
  };

  // ✅ Expose valid data to parent (CheckoutPage)
  const validateForm = () => {
    const isValid = fullName.trim() && email.trim() && agreed;
    const formData = {
      fullName: fullName.trim(),
      email: email.trim(),
      promoCode: promoApplied ? promoCode : undefined,
    };
    if (onFormValidChange) onFormValidChange(!!isValid, formData);
  };

  // Call validation when any input changes
  React.useEffect(() => {
    validateForm();
  }, [fullName, email, agreed, promoApplied, promoCode]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-[739px] h-[198px] bg-[#EFEFEF] rounded-[12px] p-[20px_24px] flex flex-col gap-4"
    >
      {/* 🔹 Name & Email */}
      <div className="w-[691px] flex gap-[24px]">
        <div className="flex flex-col gap-2 w-[333.5px]">
          <label className="text-[#5B5B5B] font-inter text-[14px]">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 text-[14px]"
          />
        </div>

        <div className="flex flex-col gap-2 w-[333.5px]">
          <label className="text-[#5B5B5B] font-inter text-[14px]">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 text-[14px]"
          />
        </div>
      </div>

      {/* 🔹 Promo Code */}
      <div className="w-[691px] flex gap-4 items-center">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          disabled={promoApplied}
          className="w-[604px] h-[42px] bg-[#DDDDDD] rounded-[6px] px-4 py-3 text-[14px] disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleApplyPromo}
          disabled={applyingPromo || promoApplied || !promoCode}
          className="w-[71px] h-[42px] bg-[#161616] rounded-[8px] text-white text-[14px] hover:bg-[#FFD643] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {promoApplied ? "✓" : applyingPromo ? "..." : "Apply"}
        </button>
      </div>

      {/* 🔹 Checkbox */}
      <div className="w-[256px] flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer relative">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="appearance-none w-0 h-0"
          />
          <span
            className={`w-4 h-4 flex items-center justify-center border border-[#5B5B5B] rounded-sm ${
              agreed ? "bg-[#161616]" : "bg-transparent"
            }`}
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
