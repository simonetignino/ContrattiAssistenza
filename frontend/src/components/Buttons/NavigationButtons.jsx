import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, House } from "lucide-react";

export default function NavigationButtons() {
   const navigate = useNavigate();
   
   return (
       <div className="flex gap-4 justify-center mt-6">
           <button 
               onClick={() => navigate(-1)}
               className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
           >
               <ArrowLeft className="w-4 h-4 mr-1" />
               Indietro
           </button>
           <button 
               onClick={() => navigate("/#")}
               className="flex items-center text-red-500 hover:text-red-700 transition-colors"
           >
               <House />
           </button>
           <button 
               onClick={() => navigate(1)}
               className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
           >
               Avanti
               <ArrowRight className="w-4 h-4 ml-1" />
           </button>
       </div>
   );
}