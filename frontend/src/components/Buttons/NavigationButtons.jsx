import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(-1)}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}