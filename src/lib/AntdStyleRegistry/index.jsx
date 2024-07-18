// 'use client';

// import React from 'react';
// import { useServerInsertedHTML } from 'next/navigation';
// import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';


// export default function AntdStyledComponentsRegistry({ children } = {children: React.ReactNode }) {
//     const [cache] = React.useState(() => createCache()); // gets antd cached styles

//     // innsert cache style on the server
//     useServerInsertedHTML(() => (
//         <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}></style>
//     ));

//     return <StyleProvider cache={cache}>{children}</StyleProvider>;
// }

'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useMemo } from 'react';
import { useRef } from 'react';

const StyledComponentsRegistry = ({ children }) => {
  const cache = useMemo(() => createCache(), []);
  const isServerInserted = useRef(false);
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />;
  });
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;