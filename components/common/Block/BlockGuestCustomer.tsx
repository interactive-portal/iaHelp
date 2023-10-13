import { useCloud } from "hooks/use-cloud";
import React from "react";

export default function BlockGuestCustomer({ children }: { children: any }) {
  const cloudContext = useCloud();
  const customerReady2 = cloudContext?.customerReady2;

  if (customerReady2?.guest) return React.Children.toArray(children)[0];
  return React.Children.toArray(children)[1];
}
