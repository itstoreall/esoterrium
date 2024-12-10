import { useEffect, useState } from 'react';
import LoaderBlock from '../components/LoaderBlock';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoader: isLoading,
    Loader: LoaderBlock,
  };
};

export default useLoader;
