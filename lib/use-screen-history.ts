'use client';
import {useEffect, useRef} from 'react';

/** Keep private screen drafts in memory; history.state contains only opaque IDs. */
export function useScreenHistory<T>(key: string, snapshot: T, restore: (value: T) => void, home: () => void) {
  const entries = useRef(new Map<string, {key: string; value: T; depth: number}>());
  const current = useRef('');
  const restoring = useRef(false);
  const callbacks = useRef({restore, home});
  callbacks.current = {restore, home};

  useEffect(() => {
    const previous = entries.current.get(current.current);
    if (restoring.current) {
      restoring.current = false;
      return;
    }
    if (previous?.key === key) {
      previous.value = snapshot;
      return;
    }
    const id = crypto.randomUUID();
    const depth = previous ? previous.depth + 1 : 0;
    entries.current.set(id, {key, value: snapshot, depth});
    current.current = id;
    const state = {...window.history.state, ssinggeutScreen: id};
    if (previous) window.history.pushState(state, '', window.location.href);
    else window.history.replaceState(state, '', window.location.href);
    window.scrollTo({top: 0, behavior: 'instant'});
  });

  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const id = event.state?.ssinggeutScreen;
      const entry = entries.current.get(id);
      if (!entry) {entries.current.clear();current.current='';restoring.current=false;callbacks.current.home();return;}
      current.current = id;
      restoring.current = true;
      callbacks.current.restore(entry.value);
      window.scrollTo({top: 0, behavior: 'instant'});
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goBack = () => {
    if ((entries.current.get(current.current)?.depth ?? 0) > 0) window.history.back();
    else callbacks.current.home();
  };
  // A successful membership change becomes a new navigation baseline.
  // Old join/leave dialogs must not be resurrected by browser history.
  const checkpoint = () => {entries.current.clear();current.current='';restoring.current=false;};
  return {goBack,checkpoint};
}
