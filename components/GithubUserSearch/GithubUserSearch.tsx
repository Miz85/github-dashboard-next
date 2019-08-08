import * as React from 'react';

interface GithubUserSearchProps {}

export const GithubUserSearch: React.FunctionComponent<
  GithubUserSearchProps
> = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <input
        value={searchTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div>{searchTerm}</div>
    </>
  );
};
