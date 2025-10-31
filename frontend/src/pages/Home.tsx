import React, { useEffect, useState } from "react";
import { experienceAPI } from "../services/api";
import type { Experience } from "../types";
import ExperienceCard from "../components/ExperienceCard";
import { useSearch } from "../context/SearchContext";

const HomePage: React.FC = () => {
  const { searchTerm } = useSearch();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experienceAPI.getAll();
        setExperiences(response.data.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Filter experiences based on searchTerm
  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "500px" }}>
        <div className="text-center font-inter font-medium text-[20px] leading-6 text-[#161616]">
          Loading experiences...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "500px" }}>
        <div className="text-center font-inter font-medium text-[20px] leading-6 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[124px] pt-12 pb-12">
      <div className="grid gap-6 justify-center gap-x-8 gap-y-6
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredExperiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="text-center pt-20">
          <p className="font-inter font-normal text-lg text-[#6C6C6C]">
            No experiences found
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
