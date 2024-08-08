import React from "react";
import Proposal from "../Cards/Proposal";

const Proposals = () => {
  const proposal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col overflow-auto gap-y-4 w-[80%]">
      {proposal.map((pool, key) => {
        return (
          <p key={key}>
            <Proposal />
          </p>
        );
      })}
    </div>
  );
};

export default Proposals;
