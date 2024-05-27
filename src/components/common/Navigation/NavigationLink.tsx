import { PropsWithChildren, ReactNode } from "react";
import { useNavigation } from "../../../contexts/useNavigation";

interface NavigationLinkProps {
  to: ReactNode;
}

function NavigationLink({
  to,
  children,
}: PropsWithChildren<NavigationLinkProps>) {
  const { navigateTo } = useNavigation();
  return <button onClick={() => navigateTo(to)}>{children}</button>;
}
export default NavigationLink;
