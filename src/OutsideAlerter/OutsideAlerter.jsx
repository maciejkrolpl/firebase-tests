import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onOutsideClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ children, onOutsideClick, isActive }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onOutsideClick);

  if (isActive) {
    return <div ref={wrapperRef}>{children}</div>;
  }
  return <>{children}</>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default OutsideAlerter;
