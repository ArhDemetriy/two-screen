import React from 'react';
import './Page.scss';

export interface PageProps {
  children?: any
}

function Page({ children }: PageProps) {
  return (
    <div className="Page">{children}</div>
  );
}

export default Page;
