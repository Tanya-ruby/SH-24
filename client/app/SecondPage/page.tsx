"use client";
import React, { useState } from 'react';
import Web3Connect from "../components/Web3Connect";
import PoolCard from "@/app/components/layout/poolCard";
import { Modal } from "@/app/components/layout/modal";
import { useReadContract } from "wagmi";
import { ethers } from "ethers";
import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";
import { sepolia } from "wagmi/chains";

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const { data: totalPools, isLoading, isError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "poolCount",
  });

  const handleOpenModal = () => {
    console.log("Create Pool button clicked");
    setIsModalOpen(true);

    // Initialize ethers provider and signer
    if (typeof window.ethereum !== "undefined") {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethersProvider);
      ethersProvider.getSigner().then(setSigner);
    }
  };

  const handleCloseModal = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };

  const handleCreatePool = async (poolData: {
    requiredAmount: number;
    minInvestment: number;
    tokens: `0x${string}`[];
    crossChainToken: string[];
    percentages: number[];
    investmentTime: number;
  }) => {
    console.log("Creating pool with data:", poolData);
    if (!signer) {
      console.error("Signer is not available. Please connect to MetaMask.");
      return;
    }

    try {
      const contract = new ethers.Contract(
        INVESTMENT_POOL_ADDRESS,
        InvestmentPool,
        signer
      );

      const crossChainTokens = poolData.crossChainToken.map((token) => BigInt(token));
      const investmentPercentage = poolData.percentages.map((percent) =>
        BigInt(percent)
      );

      const transaction = await contract.createPool(
        BigInt(poolData.requiredAmount),
        BigInt(poolData.minInvestment),
        poolData.tokens,
        crossChainTokens,
        investmentPercentage,
        BigInt(poolData.investmentTime)
      );

      console.log("Transaction submitted:", transaction.hash);
      await transaction.wait();
      console.log("Transaction confirmed:", transaction.hash);
      setIsModalOpen(false); // Close the modal after successful transaction
    } catch (error) {
      console.error("Failed to create pool:", error);
    }
  };

  if (isLoading) {
    return <div>Loading total pools...</div>;
  }

  if (isError) {
    return <div>Error loading total pools.</div>;
  }

  return (
    <div className="container py-24 sm:py-32">
      <Web3Connect />

      <div className="text-center text-4xl md:text-6xl font-bold mb-8">
        <h1>
          <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            CoInvest Pools
          </span>
          - Browse Your Pools
        </h1>
      </div>

      {/* Button to open the modal */}
      <div className="text-center mb-8">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create New Pool
        </button>
      </div>

      {/* Render PoolCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-full">
        {Array.from({ length: Number(totalPools) }).map((_, index) => (
          <PoolCard key={index + 1} poolId={index + 1} />
        ))}
      </div>

      {/* Modal for creating a new pool */}
      {isModalOpen && (
        console.log("Modal should render now"),
        <Modal onClose={handleCloseModal} onSubmit={handleCreatePool} />
      )}
    </div>
  );
};

export default Page;
