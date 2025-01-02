import React from "react";
import { Link } from "react-router-dom";

export default function NewInterventiontHw({ id }) {
  return (
      <Link to={`http://localhost:5173/contracts-hw/${id}/interventions/create`}>
        <div className="bg-green-600 text-white py-1 px-3 rounded w-8 h-8 flex items-center justify-center">+</div>
      </Link>
    
  )
}

// <a href="http://localhost:5173/create" className="bg-green-600 text-white py-1 px-3 rounded">+</a>
