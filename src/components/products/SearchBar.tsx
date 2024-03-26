import React, { useState, useCallback, ChangeEvent, useRef  } from 'react';

export default function SearchBar({ onSearch }: any) {
  const [query, setQuery] = useState('');
  const inputRef = useRef({} as HTMLInputElement);

  const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    setQuery(inputRef?.current?.value);
    onSearch(inputRef.current.value);
  }, [onSearch]);

  return (
    <input
      ref={inputRef} 
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      value={query} 
      onChange={handleQueryChange} 
      />
  );
}