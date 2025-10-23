"use client";

import { useState, useCallback, memo } from "react";
import Header from "@/components/ui/Header";
import ContactForm from "@/components/ui/ContactForm";
import AIAssistant from "@/components/ui/AIAssistant";
import { useScrollLock } from "@/hooks/use-scroll-lock";

function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleGetInTouchClick = useCallback(() => {
    setScrollPosition(window.scrollY);
    setShowContactForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleCloseContactForm = useCallback(() => {
    setShowContactForm(false);
  }, []);

  useScrollLock(showContactForm, { initialScroll: scrollPosition });

  return (
    <>
      <Header onGetInTouchClick={handleGetInTouchClick} />
      {showContactForm && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ContactForm onClose={handleCloseContactForm} />
        </div>
      )}
      {children}
      <AIAssistant />
    </>
  );
}

export default memo(ClientLayout);
