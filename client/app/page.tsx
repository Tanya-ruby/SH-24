import Proposals from "./components/Proposals";
import Web3Connect from "./components/Web3Connect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <p>CoInvest</p>
      <Proposals />
      <Web3Connect />
    </main>
  );
}
