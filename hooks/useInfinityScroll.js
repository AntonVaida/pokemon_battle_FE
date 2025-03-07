import { useEffect, useState } from "react";

const PAGINATION_COUNT_STEP = 20;

export const useInfinityScroll = ({
  ref, 
  loading, 
  allItemsReached
}) => {
 const [paginationLimit, setPaginationLimit] = useState(PAGINATION_COUNT_STEP);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !allItemsReached) {
          setPaginationLimit(prev => prev + PAGINATION_COUNT_STEP)
        }
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [loading, allItemsReached]);

  return {
    paginationLimit
  }
}