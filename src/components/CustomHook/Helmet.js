import React, { useEffect } from 'react';

export default function Helmet({ title, children }) {
  useEffect(() => {
    document.title = 'POLLMASTER - ' + title;
  }, [title]);

  return <div>{children}</div>;
}