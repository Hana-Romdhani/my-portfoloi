import { useState, useEffect } from 'react';

let toastId = 0;

export interface Toast {
  id: number;
  message: string;
}

let listeners: Array<(toasts: Toast[]) => void> = [];
let toastsState: Toast[] = [];

function notifyListeners() {
  listeners.forEach((l) => l([...toastsState]));
}

export function toast(message: string) {
  const id = ++toastId;
  toastsState = [...toastsState, { id, message }];
  notifyListeners();
  setTimeout(() => {
    toastsState = toastsState.filter((t) => t.id !== id);
    notifyListeners();
  }, 2500);
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>(toastsState);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return toasts;
}
