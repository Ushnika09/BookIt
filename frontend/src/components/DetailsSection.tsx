import React from "react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
  _id: string;
}

interface Slot {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
}

interface DetailsSectionProps {
  title: string;
  description: string;
  slots: Slot[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  about: string;
  onSlotSelect: (date: string, startTime: string, endTime: string, price: number) => void;
  selectedDate: string;
  selectedTime: string;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title,
  description,
  slots,
  highlights,
  included,
  notIncluded,
  meetingPoint,
  cancellationPolicy,
  about,
  onSlotSelect,
  selectedDate,
  selectedTime,
}) => {
  // Get currently selected slot
  const currentSlot = slots.find((slot) => slot.date === selectedDate);

  return (
    <div className="w-full max-w-[765px] mt-8 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#161616]">{title}</h2>

      {/* Description */}
      <p className="text-base font-normal text-[#6C6C6C] leading-relaxed">
        {description}
      </p>

      {/* Bottom frame */}
      <div className="flex flex-col gap-6">
        {/* Choose Date */}
        {slots.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-lg font-medium text-[#161616]">
              Choose Date
            </span>
            <div className="flex gap-3 flex-wrap">
              {slots.slice(0, 6).map((slot) => {
                const slotDate = new Date(slot.date);
                return (
                  <button
                    key={slot._id}
                    className={`min-w-[69px] px-3 h-[34px] rounded text-sm font-medium transition-all ${
                      selectedDate === slot.date
                        ? "bg-[#FFD643] text-[#161616] shadow-sm"
                        : "border border-[#BDBDBD] text-[#161616] hover:border-[#FFD643]"
                    }`}
                    onClick={() => {
                      const firstTime = slot.timeSlots?.[0];
                      if (firstTime) {
                        onSlotSelect(
                          slot.date,
                          firstTime.startTime,
                          firstTime.endTime,
                          firstTime.price
                        );

              
                      }
                    }}
                  >
                    {slotDate.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Choose Time */}
        <div className="flex flex-col gap-3">
          <span className="text-lg font-medium text-[#161616]">
            Choose Time
          </span>
          <div className="flex gap-3 flex-wrap">
            {currentSlot?.timeSlots && currentSlot.timeSlots.length > 0 ? (
              currentSlot.timeSlots.map((timeSlot) => {
                const timeString = `${timeSlot.startTime} - ${timeSlot.endTime}`;
                const isSoldOut = timeSlot.availableSpots === 0;

                return (
                  <button
                    key={timeSlot._id}
                    disabled={isSoldOut}
                    className={`min-w-[117px] px-4 h-[34px] rounded text-sm font-medium transition-all ${
                      isSoldOut
                        ? "bg-[#E0E0E0] text-[#9E9E9E] cursor-not-allowed"
                        : selectedTime === timeString
                        ? "bg-[#FFD643] text-[#161616] shadow-sm"
                        : "border border-[#BDBDBD] text-[#161616] hover:border-[#FFD643]"
                    }`}
                    onClick={() => {
                      if (!isSoldOut) {
                        onSlotSelect(
                          selectedDate,
                          timeSlot.startTime,
                          timeSlot.endTime,
                          timeSlot.price
                        );
                      }
                    }}
                  >
                    <div className="flex gap-1 justify-center items-center">
                      <span>{timeString.split(" ").splice(0, 2).join(" ")}</span>
                      {!isSoldOut && (
                        <span className="text-[10px] text-red-600 font-extralight">
                          {timeSlot.availableSpots} left
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <span className="text-sm text-[#6C6C6C]">
                No time slots available for this date
              </span>
            )}
          </div>
          <span className="text-xs text-[#838383]">
            All times are in IST (GMT +5:30)
          </span>
        </div>


        {/* About Section */}
        {about && (
          <div className="flex flex-col gap-3">
            <span className="text-lg font-medium text-[#161616]">About</span>
            <div className="w-full rounded bg-[#EEEEEE] p-3 text-sm text-[#6C6C6C]">
              {about}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsSection;