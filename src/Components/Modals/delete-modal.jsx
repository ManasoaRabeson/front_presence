import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmer la suppression</h2>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cet élément ?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => onConfirm(itemId)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
