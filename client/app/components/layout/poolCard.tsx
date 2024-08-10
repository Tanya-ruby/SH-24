import React from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";

export interface PoolCardProps {
  id: string;
  poolName: string;
  creatorAddress: string;
  attestationId: string;
  startTime: string;
  endTime: string;
  poolToken: string;
}

export const PoolCards: React.FC<PoolCardProps> = ({
  id,
  poolName,
  creatorAddress,
  attestationId,
  startTime,
  endTime,
  poolToken,
}) => {
  return (
    <Card className="w-full max-w-md bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            {id}
          </div>
          <div className="text-lg font-semibold">{poolName}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p><strong>Creator Address:</strong> {creatorAddress}</p>
        <p><strong>Attestation ID:</strong> {attestationId}</p>
        <div className="flex justify-between">
          <p><strong>Start Time:</strong> {startTime}</p>
          <p><strong>End Time:</strong> {endTime}</p>
        </div>
        <p><strong>Pool Token:</strong> {poolToken}</p>
      </CardContent>
    </Card>
  );
};
