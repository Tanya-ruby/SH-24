import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  onSubmit: (poolData: {
    id: string;
    poolName: string;
    creatorAddress: string;
    attestationId: string;
    startTime: string;
    endTime: string;
    poolToken: string;
  }) => void;
}

export const Modal = ({ onClose, onSubmit }: ModalProps) => {
  const [poolName, setPoolName] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [attestationId, setAttestationId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [poolToken, setPoolToken] = useState("");

  const handleSubmit = () => {
    const id = new Date().getTime().toString(); // Generating a simple unique ID based on timestamp
    onSubmit({
      id,
      poolName,
      creatorAddress,
      attestationId,
      startTime,
      endTime,
      poolToken,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Pool</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pool Name</label>
          <input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Creator Address</label>
          <input
            type="text"
            value={creatorAddress}
            onChange={(e) => setCreatorAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Attestation ID</label>
          <input
            type="text"
            value={attestationId}
            onChange={(e) => setAttestationId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pool Token</label>
          <input
            type="text"
            value={poolToken}
            onChange={(e) => setPoolToken(e.target.value)}
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
