import * as icons from "lucide-react";
import React from "react"; // Import React to use its types

export const Icon = ({
  name,
  color = "currentColor",
  size = 24,
  className,
}: {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
}) => {
  const LucideIcon = icons[name] as React.ComponentType<{ color?: string; size?: number; className?: string }>;

  if (!LucideIcon) {
    console.error(`Icon "${name}" does not exist in lucide-react.`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
