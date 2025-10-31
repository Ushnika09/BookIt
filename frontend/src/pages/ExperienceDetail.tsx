import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { experienceAPI } from "../services/api";
import QuantitySelector from "../components/QuantitySelector";
import DetailsSection from "../components/DetailsSection";

interface TimeSlot {
  _id: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

interface Slot {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  images: { url: string }[];
  price: { amount: number; currency: string };
  slots: Slot[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  about?: string;
}

interface BookingSelection {
  date: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  quantity: number;
  price: number;
}

const ExperienceDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking selection state
  const [bookingSelection, setBookingSelection] = useState<BookingSelection>({
    date: "",
    timeSlot: { startTime: "", endTime: "" },
    quantity: 1,
    price: 0,
  });

  useEffect(() => {
    if (!id) return;

    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await experienceAPI.getById(id);
        console.log("Fetched experience data:", response.data.data);
        
        const expData = {
          ...response.data.data,
          about:
            response.data.data.about ||
            "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
        };

        setExperience(expData);

        // Set initial booking selection
        if (expData.slots?.[0]) {
          const firstSlot = expData.slots[0];
          const firstTimeSlot = firstSlot.timeSlots?.[0];
          
          if (firstTimeSlot) {
            setBookingSelection({
              date: firstSlot.date,
              timeSlot: {
                startTime: firstTimeSlot.startTime,
                endTime: firstTimeSlot.endTime,
              },
              quantity: 1,
              price: firstTimeSlot.price,
            });
          }
        }

        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch experience details.");
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  // Handle date/time selection from DetailsSection
  const handleSlotSelection = (date: string, startTime: string, endTime: string, price: number) => {
    setBookingSelection((prev) => ({
      ...prev,
      date,
      timeSlot: { startTime, endTime },
      price,
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    setBookingSelection((prev) => ({
      ...prev,
      quantity: newQuantity,
    }));
  };

  // Handle confirm booking
const handleConfirm = () => {
  if (!bookingSelection.date || !bookingSelection.timeSlot.startTime) {
    alert("Please select a date and time slot");
    return;
  }

  // Construct complete booking data
  const bookingData = {
    experienceId: experience?._id,
    experienceTitle: experience?.title,
    selectedDate: bookingSelection.date,
    selectedTime: `${bookingSelection.timeSlot.startTime} - ${bookingSelection.timeSlot.endTime}`,
    quantity: bookingSelection.quantity,
    pricePerPerson: bookingSelection.price,
    subtotal: subtotal,
    taxes: taxes,
    total: total
  };

  // ✅ Log the booking data
  console.log("✅ Booking Confirmed:", bookingData);

  // Optionally navigate to checkout page
  navigate("/checkout", {
    state: {
      ...bookingData,
      experience,
    },
  });
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-red-500">{error}</div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-medium">No experience found.</div>
      </div>
    );
  }

  // Calculate prices
  const subtotal = bookingSelection.price * bookingSelection.quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] mt-2 pt-1 pb-[5rem] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[124px]">
      {/* Top: Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 w-[100px] h-[28px] text-[14px] font-medium text-black bg-transparent hover:cursor-pointer"
      >
        <BiArrowBack className="text-xl" />
        <span className="text-[14px]">Details</span>
      </button>

      {/* Main Content Section */}
      <div className="w-full flex flex-col lg:flex-row gap-8 pt-[44px] justify-between">
        {/* Left: Image Frame */}
        <div className="w-[765px] h-[381px] rounded-xl bg-gray-200">
          <img
            src={experience.images[1]?.url || experience.images[0]?.url}
            alt={experience.title}
            className="w-full h-full object-cover rounded-[12px]"
          />
        </div>

        {/* Right: Summary / Info */}
        <div className="w-[387px] h-[315px] flex flex-col gap-6 bg-[#EFEFEF] rounded-xl p-6">
          {/* Top content: 4-row grid + divider + total */}
          <div className="w-[339px] flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex justify-between w-full h-[22px] ">
              <span className="font-inter font-normal text-[16px] text-black">
                Item
              </span>
              <span className="font-inter font-normal text-[16px] text-black">
                Price
              </span>
            </div>

            {/* Row 2 - Quantity Selector */}
            <QuantitySelector 
              initial={bookingSelection.quantity}
              onChange={handleQuantityChange}
            />

            {/* Row 3 - Subtotal */}
            <div className="flex justify-between w-full h-[20px]">
              <span className="font-inter font-normal text-[14px] text-black">
                Subtotal
              </span>
              <span className="font-inter font-normal text-[14px] text-black">
                ₹{subtotal}
              </span>
            </div>

            {/* Row 4 - Taxes */}
            <div className="flex justify-between w-full h-[20px]">
              <span className="font-inter font-normal text-[14px] text-black px-1 rounded-sm">
                Taxes
              </span>
              <span className="font-inter font-normal text-[14px] text-black px-1 rounded-sm">
                ₹{taxes}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#D9D9D9] my-2"></div>

            {/* Total Row */}
            <div className="flex justify-between w-full h-[24px]">
              <span className="font-inter font-medium text-[20px] text-black">
                Total
              </span>
              <span className="font-inter font-medium text-[20px] text-black">
                ₹{total}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button 
            onClick={handleConfirm}
            className="w-[339px] h-[44px] py-3 px-5 bg-[#7F7F7F] rounded-[8px] text-white font-inter font-medium text-[16px] mt-2 hover:bg-[#FFD643] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Details Section */}
      <DetailsSection
        title={experience.title}
        description={experience.description}
        slots={experience.slots}
        about={experience.about || ""}
        onSlotSelect={handleSlotSelection}
        selectedDate={bookingSelection.date}
        selectedTime={`${bookingSelection.timeSlot.startTime} - ${bookingSelection.timeSlot.endTime}`}
      />
    </div>
  );
};

export default ExperienceDetailsPage;