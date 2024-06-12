import React, { PropsWithChildren, cloneElement } from "react";
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

  //만약 자식이 버튼이라면 onClick 속성만 추가함
  if (React.isValidElement(children) && children.type === "button") {
    const childWithOnClick = cloneElement(children, {
      onClick: () => navigateTo(to),
    } as React.HTMLProps<HTMLButtonElement>);
    return childWithOnClick;
  }

  return (
    <button className={className} onClick={() => navigateTo(to)}>
      {children}
    </button>
  );
}
export default NavigationLink;
