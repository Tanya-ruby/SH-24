import { INVESTMENT_POOL_ADDRESS } from "@/constants";
import { InvestmentPool } from "@/contracts/InvestmentPool";
import { useReadContract } from "wagmi";
import { sepolia } from "wagmi/chains";

export const getInvestmentPool = ({ id }: { id: number }) => {
  const {
    data: pool,
    isLoading,
    isError,
  } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "pools",
    args: [BigInt(id)],
  });
  return { pool, isLoading, isError };
};

export const getTotalPools = () => {
  const {
    data: totalPools,
    isLoading,
    isError,
  } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "poolCount",
  });
  return { totalPools, isLoading, isError };
};

export const getInvestors = ({ poolId }: { poolId: number }) => {
  const {
    data: investors,
    isLoading,
    isError,
  } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "getInvestors",
    args: [BigInt(poolId)],
  });
  return { investors, isLoading, isError };
};

export const getCoInvestToken = () => {
  const {
    data: CoInvestTokenAddress,
    isLoading,
    isError,
  } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "coInvestToken",
  });
  return { CoInvestTokenAddress, isLoading, isError };
};

export const getInvestmentValue = ({ poolId }: { poolId: number }) => {
  const {
    data: investmentValue,
    isLoading,
    isError,
  } = useReadContract({
    chainId: sepolia.id,
    abi: InvestmentPool,
    address: INVESTMENT_POOL_ADDRESS,
    functionName: "getInvestmentValue",
    args: [BigInt(poolId)],
  });
  return { investmentValue, isLoading, isError };
};
