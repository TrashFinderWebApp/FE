import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
}

export default function useIntersectionObserver({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: useIntersectionObserverProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return () => {};

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, threshold, target]);

  return { setTarget };
}
