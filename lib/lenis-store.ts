import type Lenis from "lenis";

let _lenis: Lenis | null = null;
let _pendingHash: string | null = null;

export const lenisStore = {
  set(l: Lenis)  { _lenis = l; },
  clear()        { _lenis = null; },

  scrollTo(target: string, duration = 1.6) {
    _lenis?.scrollTo(target, { duration });
  },

  /** Store a hash to be consumed by the destination page on mount. */
  setPending(hash: string) { _pendingHash = hash; },

  /** Read and clear the pending hash (call once from useEffect). */
  consumePending(): string | null {
    const h = _pendingHash;
    _pendingHash = null;
    return h;
  },
};
