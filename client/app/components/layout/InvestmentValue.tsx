"use client";
import React from "react";
import { useReadContract } from "wagmi";
import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";
import { sepolia } from "wagmi/chains";

interface InvestorsListProps {
  poolId: number;
}

const InvestorsList: React.FC<InvestorsListProps> = ({ poolId }) => {
  const { data: investors, isLoading, isError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "getInvestors",
    args: [BigInt(poolId)],
    enabled: !!poolId,
  });

  if (isLoading) {
    return <div>Loading investors...</div>;
  }

  if (isError || !investors) {
    return <div>Error loading investors.</div>;
  }

  return (
    <div>
      <h3 className="font-bold">Investors:</h3>
      <ul>
        {investors.length > 0 ? (
          investors.map((investor: string, index: number) => (
            <li key={index}>
              <strong>Investor {index + 1}:</strong> {investor}
            </li>
          ))
        ) : (
          <p>No investors found for this pool.</p>
        )}
      </ul>
    </div>
  );
};

export default InvestorsList;
