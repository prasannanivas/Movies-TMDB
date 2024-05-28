import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showBackToTop && (
        <div
          className="fixed bottom-4 right-4 bg-black p-2 rounded-full cursor-pointer bg-gray-600"
          onClick={handleBackToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} size="2x" className="text-white" />
        </div>
      )}
    </>
  );
};

export default BackToTopButton;
