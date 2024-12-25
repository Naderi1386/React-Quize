import { ReactNode } from "react";

interface FooterProp {
 children:ReactNode
}


const Footer = ({children}:FooterProp) => {
  return (
    <footer>
      {children}
      
    </footer>
  );
}

export default Footer


