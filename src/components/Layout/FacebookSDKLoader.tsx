'use client';

import { useEffect } from 'react';

export default function FacebookSDKLoader() {
  useEffect(() => {
    const fbRoot = document.createElement('div');
    fbRoot.id = 'fb-root';
    document.body.prepend(fbRoot);

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src =
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0&appId=1368134841043313';
    document.body.appendChild(script);
  }, []);

  return null;
}
