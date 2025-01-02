import React, { useState } from 'react';
import Hardware from './Contracts/Hardware';
import NewContractHw from './Buttons/NewContractHw';
import GroupButtons from './GroupButtons';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('hardware');

  const tabsData = [
    { 
      key: 'hardware', 
      label: 'Contratti Hardware',
      content: <Hardware/>,
      disabled: false
    },
    { 
      key: 'noleggio', 
      label: 'Contratti Noleggio',
      content: <div>Contenuto dei Contratti Noleggio</div>,
      disabled: true
    }
  ];

  return (
    <div>
      <div className=" ">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabsData.map((tab) => (
            <li key={tab.key} className="me-2">
              <button 
                onClick={() => !tab.disabled && setActiveTab(tab.key)}
                className={`inline-flex items-center justify-center m-4 border-b-2 rounded-t-lg group ${
                  tab.disabled 
                    ? 'text-gray-300 cursor-not-allowed'
                    : (activeTab === tab.key 
                      ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300')
                }`}
                disabled={tab.disabled}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <GroupButtons/>
        {tabsData.find(tab => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}