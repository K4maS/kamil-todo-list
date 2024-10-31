import { useState } from "react";

export const useInput = () => {
    const [value, setValue] = useState<string>('');

    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (e) setValue(target.value);
    };

    return { value, onInput, setValue };
  };
