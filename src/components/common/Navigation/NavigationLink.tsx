import { PropsWithChildren } from "react";
import { useNavigation } from "../../../contexts/useNavigation";
import Route from "../../../types/Route";

interface NavigationLinkProps {
  to: Route;
  className?: string;
}

function NavigationLink({
  to,
  className = "",
  children,
}: PropsWithChildren<NavigationLinkProps>) {
  const { navigateTo } = useNavigation();
  return (
    <button className={className} onClick={() => navigateTo(to)}>
      {children}
    </button>
  );
}
export default NavigationLink;
