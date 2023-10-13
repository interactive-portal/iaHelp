import { useContext, useEffect, useRef, useState } from "react";
import BlockDiv from "./BlockDiv";
import WidgetWrapperContext from "../engineBox/Wrapper/WidgetUniversalWrapper";

export default function BlockInfinite({
  children,
}: {
  children: any;
}) {
  const { paging, infinite, isDataLoading } = useContext(WidgetWrapperContext);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      console.log("The div is now visible on the screen.");
      console.log("Scrolled to the bottom!", infinite?.size);
      infinite?.setSize(infinite?.size + 1);
    } else {
      console.log("The div is no longer visible on the screen.");
    }
  }, [isVisible]);

  const handleVisibilityChange = (isVisible: any) => {
    setIsVisible(isVisible);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // The percentage of the target's visibility needed to trigger the callback
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        handleVisibilityChange(entry.isIntersecting);
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <BlockDiv
      className=""
      divNumber="BlockScrollOuter"
    >
      {children}
      <div ref={targetRef} className="invisible">
        {isVisible ? (
          <p>The div is visible on the screen.</p>
        ) : (
          <p>The div is not visible on the screen.</p>
        )}
      </div>

      {isDataLoading && (
        <div>Ачаалж байна.</div>
      )}
      {/* {isDataLoading ? (<>hahahaha killer</>) : (<>hahahaha isDataLoading is false</>)} */}
    </BlockDiv>
  );
}
