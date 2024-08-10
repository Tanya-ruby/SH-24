"use client";
import React, { useState } from 'react';
import Web3Connect from "../components/Web3Connect"; // Import Web3Connect
import { PoolCards, PoolCardProps } from "@/app/components/layout/poolCard";
import { Modal } from "@/app/components/ui/modal";
import { Button } from "@/app/components/ui/button";
import Link from "next/link"; // Import Link from Next.js

const Page: React.FC = () => {
  const [pools, setPools] = useState<PoolCardProps[]>([
    {
      id: '1',
      poolName: 'First Pool',
      creatorAddress: '0x123...abc',
      attestationId: 'att-001',
      startTime: '2024-08-10 10:00',
      endTime: '2024-08-10 12:00',
      poolToken: 'TOKEN1',
    },
    {
      id: '2',
      poolName: 'Second Pool',
      creatorAddress: '0x456...def',
      attestationId: 'att-002',
      startTime: '2024-08-10 14:00',
      endTime: '2024-08-10 16:00',
      poolToken: 'TOKEN2',
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewPool = (newPool: PoolCardProps) => {
    setPools([...pools, newPool]);
    setIsModalOpen(false); // Close the modal after adding the pool
  };

  return (
    <div className="container py-24 sm:py-32">
      {/* Web3Connect Button */}
      <Web3Connect />
      
      <div className="text-center text-4xl md:text-6xl font-bold mb-8">
        <h1>
          <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            CoInvest Pools
          </span>
          - Create/Browse Your Pools
        </h1>
      </div>

      <div className="text-center mb-8">
        <Button onClick={() => setIsModalOpen(true)}>Create New Pool</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-full">
        {pools.map((pool) => (
          <Link href={`/SecondPage/${pool.id}`} key={pool.id}>
            <PoolCards
              id={pool.id}
              poolName={pool.poolName}
              creatorAddress={pool.creatorAddress}
              attestationId={pool.attestationId}
              startTime={pool.startTime}
              endTime={pool.endTime}
              poolToken={pool.poolToken}
            />
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addNewPool}
          // Additional props for your Modal can go here
        />
      )}
    </div>
  );
};

export default Page;
