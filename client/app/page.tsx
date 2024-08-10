import Web3Connect from "./components/Web3Connect";
import { HeroSection } from "./components/layout/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <p>CoInvest</p>
      <HeroSection />

      <Web3Connect />
    </main>
  );
}
