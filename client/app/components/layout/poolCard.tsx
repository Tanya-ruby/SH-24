import React from 'react';
import { useReadContract } from "wagmi";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";
import { sepolia } from "wagmi/chains";
import Link from "next/link";

interface PoolCardProps {
  poolId: number;
}

const PoolCard: React.FC<PoolCardProps> = ({ poolId }) => {
  const { data: pool, isLoading: isPoolLoading, isError: isPoolError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "pools",
    args: [BigInt(poolId)],
    enabled: poolId !== null,
  });

  const { data: tokenData, isLoading: isTokenLoading, isError: isTokenError } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "getTokenData",
    args: [BigInt(poolId)],
    enabled: poolId !== null,
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
    <Link href={`/SecondPage/${poolId}`}>
      <Card className="w-full max-w-md bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Pool {poolId}</div>
            <div className="text-lg font-semibold">Status: {isActive ? 'Active' : 'Inactive'}</div>
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default PoolCard;
