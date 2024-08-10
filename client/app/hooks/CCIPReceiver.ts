import { CCIP_RECEIVER } from "@/constants";
import { ReceiverABI } from "@/contracts/ReceiverABI";
import { useReadContract } from "wagmi";

export const getCCIPPool = ({
  id,
  chainId,
}: {
  id: number;
  chainId: number;
}) => {
  const {
    data: pool,
    isLoading,
    isError,
  } = useReadContract({
    chainId: chainId,
    abi: ReceiverABI,
    address: CCIP_RECEIVER,
    functionName: "pools",
    args: [BigInt(id)],
  });
  return { pool, isLoading, isError };
};
