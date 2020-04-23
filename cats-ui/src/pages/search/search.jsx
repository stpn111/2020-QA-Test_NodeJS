import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { CatsList } from '../../common/components/cats-list';
import { useEffect } from 'react';

export function SearchPage() {
  const { query } = useParams();
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  return (
    <>
      <Header searchValue={searchValue} />
      <CatsList searchValue={searchValue} />
    </>
  );
}
