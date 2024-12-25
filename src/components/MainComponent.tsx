import { ReactNode } from "react";

interface MainComponentProp{
    children:ReactNode
}

const MainComponent = ({children}:MainComponentProp) => {
  return (
    <main className="main">
      {children}
    </main>
  );
}

export default MainComponent