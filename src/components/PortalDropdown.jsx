import { createPortal } from "react-dom";

export default function PortalDropdown({ children }) {
  return createPortal(children, document.body);
}