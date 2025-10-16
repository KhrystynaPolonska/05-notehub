import { useState } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = () =>
    setValue((b) => {
      return !b;
    });
  return [value, toggle] as const;
}