export const DEPLOYER_ADDRESS = process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS;
export const EAS_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
export const SCHEMA_REGISTRY_ADDRESS =
  "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia

// Updated Schema to match the function parameters
export const SCHEMA = "uint256 requiredAmount, uint256 minInvestment, address[] tokens, uint64[] crossChainToken, uint256[] percentages, uint256 investmentTime, address creator";

export const SCHEMA_DETAILS = {
  schemaName: "Investment Pool",
  requiredAmount: "uint256 (the amount required to activate the pool)",
  minInvestment: "uint256 (the minimum investment amount per investor)",
  tokens: "address[] (list of token addresses to invest in)",
  crossChainToken: "uint64[] (list of cross-chain token identifiers corresponding to the tokens)",
  percentages: "uint256[] (corresponding investment percentages for each token)",
  investmentTime: "uint256 (duration of the investment period in seconds)",
  creator: "address (address of the pool creator)"
};
