import React, { useEffect, useRef } from "react";

import "./growl.css";

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
);

export function useGrowl({ isSelfClosing = false, selfClosingPeriod = 3000 }) {
  // state of the growl
  const [growlActive, setGrowlActive] = React.useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isSelfClosing && growlActive) {
      timeoutRef.current = setTimeout(() => {
        setGrowlActive(false);
      }, [selfClosingPeriod]);
    } else {
      clearTimeout(timeoutRef.current);
    }
  }, [growlActive]);

  return [
    // the first arg is the state
    growlActive,

    // the second arg is a fn that allows you to safely set its state
    (active) => {
      setGrowlActive(active);
    },
  ];
}
