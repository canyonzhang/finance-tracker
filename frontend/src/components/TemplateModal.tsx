import React, { useState } from "react";

interface TemplateModalProps {
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ onClose }) => {
  const [templateName, setTemplateName] = useState("");

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-black">Create New Template</h2>

        <label className="block mb-2 text-black">
          Template Name
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md text-black"
            placeholder="e.g., Custom Template"
          />
        </label>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Submit:", templateName); // placeholder
              onClose();
            }}
            className="bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-300 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;