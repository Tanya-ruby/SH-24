import { useWriteContract } from "wagmi";
const { writeContractAsync } = useWriteContract();
import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";

const createPool = async ({
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
}) => {
  const crossChainTokens: bigint[] = crossChainToken.map((token) =>
    BigInt(token)
  );
  const investmentPercentage: bigint[] = percentages.map((percent) =>
    BigInt(percent)
  );

  await writeContractAsync({
    address: INVESTMENT_POOL_ADDRESS,
    abi: InvestmentPool,
    functionName: "createPool",
    args: [
      BigInt(requiredAmount),
      BigInt(minInvestment),
      tokens,
      crossChainTokens,
      investmentPercentage,
      BigInt(investmentTime),
    ],
  });
};

const withdrawPool = async ({ poolId }: { poolId: number }) => {
  await writeContractAsync({
    address: INVESTMENT_POOL_ADDRESS,
    abi: InvestmentPool,
    functionName: "withdrawPool",
    args: [BigInt(poolId)],
  });
};

const investInPool = async ({
  poolId,
  amount,
}: {
  poolId: number;
  amount: number;
}) => {
  await writeContractAsync({
    address: INVESTMENT_POOL_ADDRESS,
    abi: InvestmentPool,
    functionName: "invest",
    args: [BigInt(poolId)],
    value: BigInt(amount),
  });
};
