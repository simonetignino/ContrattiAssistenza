import React from 'react';

const RemainingHours = ({ remainingHours, contractHours }) => {
  // Calcola ore e minuti
  const hours = Math.floor(remainingHours / 60);
  const minutes = remainingHours % 60;
  
  // Converti contractHours in minuti per un confronto corretto
  const totalMinutes = contractHours * 60;
  
  // Calcola la percentuale rimanente
  const percentage = Math.min(Math.max((remainingHours / totalMinutes) * 100, 0), 100);
  
  // Determina il colore della barra in base alla percentuale
  const getProgressColor = () => {
    if (percentage > 70) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <p className="text-sm text-gray-600">Ore Rimanenti</p>
      <p className="text-xl font-semibold text-gray-800">
        {hours} ore e {minutes} minuti
      </p>
      
      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        {/* Progress bar */}
        <div 
          className={`h-2.5 rounded-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Percentage indicator */}
      <p className="text-sm text-right text-gray-600">
        {Math.round(percentage)}% rimanente
      </p>
    </div>
  );
};

export default RemainingHours;