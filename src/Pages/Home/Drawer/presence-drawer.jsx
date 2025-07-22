
import { useState } from 'react';
import { FaCheck, FaExclamation, FaTimes, FaUser } from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

const PresenceSheet = ({ data,isOpen, onClose }) => {
    console.log(data);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const days = [
    { id: '2709', date: '04 juil. 2025', startTime: '09:00', endTime: '12:00' },
    { id: '2711', date: '11 juil. 2025', startTime: '09:00', endTime: '12:00' },
    { id: '3083', date: '16 juil. 2025', startTime: '09:30', endTime: '12:00' },
    { id: '2713', date: '18 juil. 2025', startTime: '09:00', endTime: '12:00' },
  ];

  const apprentices = [
    { id: '2609', name: 'Chan Angelicia' },
    { id: '2607', name: 'Chen Yuanchi Estelle' },
    { id: '2608', name: 'Rabenjamina Nathalie' },
    { id: '2610', name: 'Raheriarijaona T. Fabrice' },
    { id: '2601', name: 'Rakotoarisoa Benala Hanitriniaina' },
    { id: '2604', name: 'Ramanankavana Julicia Ismael' },
    { id: '2605', name: 'Ratsimbazafy Mihary' },
    { id: '2602', name: 'Ravelonarivo Sitraka' },
    { id: '2606', name: 'Razakandraina Andry' },
    { id: '2603', name: 'Saengsouriphanh Chip' },
  ];

  const handleCheckboxChange = (dayId, apprenticeId) => {
    const key = `${dayId}_${apprenticeId}`;
    setSelectedCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    const newSelected = {};
    const newSelectAll = !selectAll;

    if (newSelectAll) {
      days.forEach(day => {
        apprentices.forEach(apprentice => {
          newSelected[`${day.id}_${apprentice.id}`] = true;
        });
      });
    }

    setSelectAll(newSelectAll);
    setSelectedCheckboxes(newSelected);
  };

  const handleDaySelect = (dayId) => {
    const allChecked = apprentices.every(appr => selectedCheckboxes[`${dayId}_${appr.id}`]);
    const newSelected = { ...selectedCheckboxes };

    apprentices.forEach(appr => {
      newSelected[`${dayId}_${appr.id}`] = !allChecked;
    });

    setSelectedCheckboxes(newSelected);
  };

  const confirmChecking = (status, projectId) => {
    console.log(`Status: ${status} for project ${projectId}`);
  };

  return (
 <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 z-50 w-full max-w-7xl h-full bg-white shadow-lg overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-600">Fiche de présence</h2>
            <button
              className="p-2 text-gray-500 hover:bg-gray-200 rounded"
              onClick={onClose}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="p-4 space-y-6">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-green-600 font-medium"><FaCheck /> Présent</div>
            <div className="flex items-center gap-2 text-yellow-500 font-medium"><FaExclamation /> Partiellement</div>
            <div className="flex items-center gap-2 text-red-400 font-medium"><FaTimes /> Absent</div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-gray-400"><div className="w-4 h-4 bg-gray-400 rounded"></div> Non défini</span>
            <span className="flex items-center gap-2 text-green-400"><div className="w-4 h-4 bg-green-400 rounded"></div> Présent</span>
            <span className="flex items-center gap-2 text-yellow-400"><div className="w-4 h-4 bg-yellow-400 rounded"></div> Partiellement</span>
            <span className="flex items-center gap-2 text-red-400"><div className="w-4 h-4 bg-red-400 rounded"></div> Absent</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="checkbox" />
            <span className="text-gray-600">Tout sélectionner</span>
          </label>

          <button type="button" onClick={() => confirmChecking(3, 849)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
            Présent
        </button>
          <button type="button" onClick={() => confirmChecking(1, 849)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            Absent
        </button>
          <button type="button" onClick={() => confirmChecking(2, 849)} className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Partiellement
        </button>
        </div>

<div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="p-3 text-left font-semibold">Jour</th>
        {days.map(day => (
          <th key={day.id} className="p-3 text-center font-semibold">
            <div>{day.date}</div>
            <input
              type="checkbox"
              onClick={() => handleDaySelect(day.id)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </th>
        ))}
      </tr>
      <tr className="bg-white text-gray-500">
        <td className="p-3 font-medium">Heure début</td>
        {days.map(day => (
          <td key={`start-${day.id}`} className="p-3 text-center">
            {day.startTime}
          </td>
        ))}
      </tr>
      <tr className="bg-white text-gray-500 border-b border-gray-200">
        <td className="p-3 font-medium">Heure fin</td>
        {days.map(day => (
          <td key={`end-${day.id}`} className="p-3 text-center">
            {day.endTime}
          </td>
        ))}
      </tr>
    </thead>
    <tbody>
      {apprentices.map(apprentice => (
        <tr key={apprentice.id} className="border-b hover:bg-gray-50">
          <td className="p-3 flex items-center gap-2 font-medium text-gray-800">
            <FaUser className="text-gray-400" />
            {apprentice.name}
          </td>
          {days.map(day => {
            const key = `${day.id}_${apprentice.id}`;
            const isChecked = selectedCheckboxes[key] || false;
            return (
              <td key={key} className="text-center p-3">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(day.id, apprentice.id)}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-md border transition-colors duration-200 ${
                      isChecked ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-300'
                    }`}
                  >
                    <FaCheck className={`text-white text-xs ${isChecked ? 'block' : 'hidden'}`} />
                  </div>
                </label>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
</div>

        
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PresenceSheet;