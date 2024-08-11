import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  onSubmit: ({
    requiredAmount,
    minInvestment,
    tokens,
    crossChainToken,
    percentages,
    investmentTime,
  }: {
    requiredAmount: number;
    minInvestment: number;
    tokens: `0x${string}`[];
    crossChainToken: string[];
    percentages: number[];
    investmentTime: number;
  }) => void;
}

export const Modal = ({ onClose, onSubmit }: ModalProps) => {
  const [requiredAmount, setRequiredAmount] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [tokens, setTokens] = useState("");
  const [crossChainToken, setCrossChainToken] = useState("");
  const [percentages, setPercentages] = useState("");
  const [investmentTime, setInvestmentTime] = useState("");

  const handleSubmit = () => {
    onSubmit({
      requiredAmount: parseFloat(requiredAmount),
      minInvestment: parseFloat(minInvestment),
      tokens: tokens.split(",") as `0x${string}`[], // Assuming tokens are entered as comma-separated values
      crossChainToken: crossChainToken.split(","),
      percentages: percentages.split(",").map((val) => parseFloat(val)),
      investmentTime: parseFloat(investmentTime),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Pool</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Required Amount</label>
          <input
            type="number"
            value={requiredAmount}
            onChange={(e) => setRequiredAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Minimum Investment</label>
          <input
            type="number"
            value={minInvestment}
            onChange={(e) => setMinInvestment(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tokens (comma-separated)</label>
          <input
            type="text"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cross-Chain Tokens (comma-separated)</label>
          <input
            type="text"
            value={crossChainToken}
            onChange={(e) => setCrossChainToken(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Percentages (comma-separated)</label>
          <input
            type="text"
            value={percentages}
            onChange={(e) => setPercentages(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Investment Time (in seconds)</label>
          <input
            type="number"
            value={investmentTime}
            onChange={(e) => setInvestmentTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-lg">
            Create Pool
          </button>
        </div>
      </div>
    </div>
  );
};
