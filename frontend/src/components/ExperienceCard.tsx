import React from "react";
import { useNavigate } from "react-router-dom";


interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/experience/${experience._id}`)}
      className="
        w-full min-w-[260px] rounded-xl overflow-hidden
        cursor-pointer hover:shadow-xl transition-all duration-300
        flex flex-col bg-white h-[312px]
      "
    >
      {/* Image */}
      <div 
        className="w-full overflow-hidden"
        style={{ height: '170px' }}
      >
        <img
          src={experience.images[0]?.url}
          alt={experience.images[0]?.alt || experience.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div 
        className="w-full px-4 py-3 bg-[#F0F0F0] flex flex-col justify-between"
        style={{ height: '142px' }}
      >
        {/* Top Content */}
        <div className="flex flex-col gap-3">
          {/* Heading Row */}
          <div className="flex justify-between items-center gap-2">
            {/* Title */}
            <h3 className="
              font-inter font-medium text-base leading-5 text-[#161616]
              truncate flex-1
            ">
              {experience.title}
            </h3>

            {/* Location Badge */}
            <div className="
              px-2 py-1 rounded bg-[#D6D6D6] 
              flex items-center justify-center flex-shrink-0
            ">
              <span className="font-inter font-medium text-xs leading-4 text-[#161616] whitespace-nowrap">
                {experience.location.city}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="
            font-inter font-normal text-xs leading-4 text-[#6C6C6C]
            line-clamp-2 overflow-hidden
          ">
            {experience.shortDescription}
          </p>
        </div>

        {/* Bottom Content */}
        <div className="flex justify-between items-center mt-auto">
          {/* Left Price */}
          <div className="flex items-end gap-1.5">
            <span className="font-inter font-normal text-xs leading-4 text-[#161616]">
              From
            </span>
            <span className="font-inter font-medium text-xl leading-6 text-[#161616]">
              ₹{experience.price.amount}
            </span>
          </div>

          {/* Right Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/experience/${experience._id}`);
            }}
            className="
              px-3 py-1.5 rounded bg-[#FFD643] hover:bg-[#e6c03d]
              flex items-center justify-center
              transition-colors duration-200
            "
          >
            <span className="font-inter font-medium text-sm leading-tight text-[#161616] whitespace-nowrap">
              View Details
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;