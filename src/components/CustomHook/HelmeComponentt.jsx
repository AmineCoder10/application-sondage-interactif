import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function HelmetComponent({ title, children }) {
  useEffect(() => {
    document.title = 'POLLMASTER - ' + title;
  }, [title]);

  return <Helmet>{children}</Helmet>;
}
