"use client";
import React from "react";
import { useReadContract } from "wagmi";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";
import { sepolia } from "wagmi/chains";
import InvestorsList from "@/app/components/layout/InvestmentValue"; // Import the new component

const PoolDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const poolId = Number(params.id);

  const { data: pool, isLoading: isPoolLoading, isError: isPoolError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "pools",
    args: [BigInt(poolId)],
    enabled: !!poolId,
  });

  const { data: tokenData, isLoading: isTokenLoading, isError: isTokenError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "getTokenData",
    args: [BigInt(poolId)],
    enabled: !!poolId,
  });

  if (isPoolLoading || isTokenLoading) {
    return <div>Loading pool {poolId}...</div>;
  }

  if (isPoolError || isTokenError) {
    return <div>Error loading pool {poolId}.</div>;
  }

  if (!pool || !tokenData) {
    return null;
  }

  const creator = pool[0];
  const totalInvestment = pool[1].toString();
  const minInvestment = pool[2].toString();
  const requiredAmount = pool[3].toString();
  const isActive = pool[4];
  const investmentTime = `${pool[5].toString()} seconds`;
  const endTime = `${pool[6].toString()} seconds`;

  const [investmentTokens, investmentPercentages] = tokenData;
  const tokenInfo = investmentTokens.map((token: string, index: number) => (
    <div key={index}>
      <p><strong>Token Address:</strong> {token}</p>
      <p><strong>Percentage:</strong> {investmentPercentages[index].toString()}%</p>
    </div>
  ));

  return (
    <div className="container py-24 sm:py-32 relative">
      <Card className={`w-full max-w-3xl ${isActive ? 'bg-green-100' : 'bg-muted/50'} dark:bg-card hover:bg-background transition-all delay-75`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Pool {poolId} Details</div>
            <div
              className={`text-lg font-semibold px-2 py-1 rounded ${
                isActive ? "text-green-600 font-bold" : ""
              }`}
            >
              Status: {isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p><strong>Creator Address:</strong> {creator}</p>
          <p><strong>Total Investment (ETH):</strong> {totalInvestment}</p>
          <p><strong>Minimum Investment (ETH):</strong> {minInvestment}</p>
          <p><strong>Required Amount (ETH):</strong> {requiredAmount}</p>
          <div className="flex justify-between">
            <p><strong>Investment Time:</strong> {investmentTime}</p>
            <p><strong>End Time:</strong> {endTime}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Token Investments:</h3>
            {tokenInfo}
          </div>
          <div className="mt-4">
            {/* Include the InvestorsList component */}
            <InvestorsList poolId={poolId} />
          </div>
        </CardContent>
      </Card>
      {/* Invest button on the top right side */}
      <div className="absolute top-4 right-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Invest
        </button>
      </div>
    </div>
  );
};

export default PoolDetails;
