import React, { useState } from "react";

interface TemplateModalProps {
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ onClose }) => {
  const [templateName, setTemplateName] = useState("");
  const [paycheckCount, setPaycheckCount] = useState(2);
  const [totalPay, setTotalPay] = useState("");
  const [includeExtraIncome, setIncludeExtraIncome] = useState(false);
  const [extraIncomeLabel, setExtraIncomeLabel] = useState("Extra");
  const [budgetItems, setBudgetItems] = useState<{ name: string; amount: string; isSaving: boolean }[]>([]);
  const [location, setLocation] = useState("");

  // specifies a boolean return value
  const handleCreateTemplate = async (): Promise<boolean> => {
    try{
      const response = await fetch("/api/create-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: templateName, // worksheet name
          paycheckCount: paycheckCount, // number of paychecks
          totalPay: totalPay, // gross pay (per paycheck divded by paycheck count)
          includeExtraIncome: includeExtraIncome,
          extraIncomeLabel: extraIncomeLabel,
          budgetItems: budgetItems, // a list of the user's expenses that they filled on the modal. 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create template");
      }
      return true;
    }
    catch (error) {
      console.error("Error creating template", error);
      return false;
    }
  };

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

        {/* Template Name */}
        <label className="block mb-4 text-black">
          Template Name
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md text-black"
            placeholder="e.g., April 2025 Budget"
          />
        </label>

        {/* Paycheck Inputs */}
        <div className="mb-4">
          <label className="block text-black mb-1">Paychecks Per Month</label>
          <input
            type="number"
            value={paycheckCount}
            min={1}
            max={4}
            onChange={(e) => setPaycheckCount(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-1">Total Gross Pay per Month</label>
          <input
            type="text"
            value={totalPay}
            onChange={(e) => setTotalPay(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
            placeholder="$5,000.00"
          />
        </div>

        {/* Extra Income */}
        <div className="mb-4">
          <label className="inline-flex items-center text-black">
            <input
              type="checkbox"
              checked={includeExtraIncome}
              onChange={(e) => setIncludeExtraIncome(e.target.checked)}
              className="mr-2"
            />
            {" "}Include Extra Income
          </label>
          {includeExtraIncome && (
            <input
              type="text"
              value={extraIncomeLabel}
              onChange={(e) => setExtraIncomeLabel(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-md text-black"
              placeholder="e.g., Bonus"
            />
          )}
        </div>

        {/* Budget Items */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Add Budget Item</label>
          <button
            type="button"
            className="mb-2 px-3 py-1 bg-green-200 text-black rounded hover:bg-green-300"
            onClick={() =>
              setBudgetItems([
                ...budgetItems,
                { name: "", amount: "", isSaving: false }
              ])
            }
          >
            + Add Expense
          </button>
          {budgetItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Expense name"
                value={item.name}
                onChange={(e) => {
                  const copy = [...budgetItems];
                  copy[idx].name = e.target.value;
                  setBudgetItems(copy);
                }}
                className="flex-1 px-2 py-1 border rounded-md text-black"
              />
              <input
                type="text"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) => {
                  const copy = [...budgetItems];
                  copy[idx].amount = e.target.value;
                  setBudgetItems(copy);
                }}
                className="w-24 px-2 py-1 border rounded-md text-black"
              />
              <label className="text-sm text-black">
                <input
                  type="checkbox"
                  checked={item.isSaving}
                  onChange={(e) => {
                    const copy = [...budgetItems];
                    copy[idx].isSaving = e.target.checked;
                    setBudgetItems(copy);
                  }}
                  className="mr-1"
                />
                Saving
              </label>
              <button
                type="button"
                className="text-red-500 text-sm ml-2"
                onClick={() => {
                  const copy = [...budgetItems];
                  copy.splice(idx, 1);
                  setBudgetItems(copy);
                }}
              >
                Remove
              </button>
            </div>      
          ))}
        </div>
          <div>
          <select
              className="w-full px-3 py-2 border rounded-md text-black"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select a city</option>
              <option value="New York City">New York City</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Austin">Austin</option>
              <option value="Miami">Miami</option>
              <option value="Seattle">Seattle</option>
              <option value="Atlanta">Atlanta</option>
              <option value="Boston">Boston</option>
              <option value="Denver">Denver</option>
              <option value="Washington DC">Washington DC</option>
              <option value="Minneapolis">Minneapolis</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Las Vegas">Las Vegas</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="Dallas">Dallas</option>
              <option value="Houston">Houston</option>
              <option value="Detroit">Detroit</option>
              <option value="Charlotte">Charlotte</option>
              <option value="San Diego">San Diego</option>
              <option value="San Jose">San Jose</option>
              <option value="Portland">Portland</option>
              <option value="Columbus">Columbus</option>
              <option value="Indianapolis">Indianapolis</option>
              <option value="Jacksonville">Jacksonville</option>
              <option value="Nashville">Nashville</option>
              <option value="Oklahoma City">Oklahoma City</option>
              <option value="Milwaukee">Milwaukee</option>
              <option value="Louisville">Louisville</option>
              <option value="Memphis">Memphis</option>
              <option value="Raleigh">Raleigh</option>
              <option value="New Orleans">New Orleans</option>
              <option value="Salt Lake City">Salt Lake City</option>
              <option value="Kansas City">Kansas City</option>
              <option value="Albuquerque">Albuquerque</option>
              <option value="Tucson">Tucson</option>
            </select>

        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              const result = await handleCreateTemplate();
              if (result === true) {
                onClose();
              }
              else{
                alert("Failed to create template. Please try again.");
              }
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