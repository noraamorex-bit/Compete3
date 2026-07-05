import { useEffect, useRef, useState } from "react";

// One shared IntersectionObserver for every revealed element — cheap even
// with many sections. Elements un-observe after their first reveal.
let sharedObserver = null;
const onReveal = new WeakMap();

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onReveal.get(entry.target)?.();
            sharedObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
  }
  return sharedObserver;
}

/** [ref, shown] — shown flips true once the element scrolls into view. */
export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    onReveal.set(el, () => setShown(true));
    const observer = getObserver();
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      onReveal.delete(el);
    };
  }, [shown]);

  return [ref, shown];
}
