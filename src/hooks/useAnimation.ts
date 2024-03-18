import { useEffect, useState } from "react";

export default function useAnimation(status: boolean) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (status) {
      setIsComplete(true);
    }
  }, [status]);

  const render = status || isComplete;
  const animation = status && isComplete;

  const handleAnimationEnd = () => {
    if (!status) {
      setIsComplete(false);
    }
  };

  return { render, animation, handleAnimationEnd };
}
