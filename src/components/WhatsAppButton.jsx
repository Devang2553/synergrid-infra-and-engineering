import { useLocation } from "react-router-dom";
import { hasWhatsApp, pageDraft, waLink } from "../lib/whatsapp.js";

/* Floating WhatsApp button on every page. It opens WhatsApp with a drafted
   message that names the service of the page the visitor is on.
   Hidden until MOBILE_NUMBER is set in src/config.js. */
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  if (!hasWhatsApp()) return null;
  return (
    <a className="wa" href={waLink(pageDraft(pathname))} target="_blank" rel="noopener noreferrer" aria-label="Message Synergrid Infra LLP on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.5L3.3 28.8l6.5-1.7A12.7 12.7 0 1 0 16 3.2Zm0 23.2a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.5 10.5 0 1 1 16 26.4Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1a8.6 8.6 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z" fill="currentColor" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
