import BallTriangleLoader from '@/src/assets/animation/BallTriangleLoader';

type Props = {
  className: 'light-loader-block' | 'main-combine-light-loader-block';
};

const LoaderBlock = ({ className }: Props) => {
  return (
    <div className={`loader-block ${className}`}>
      <div className="loader-block-content">
        <BallTriangleLoader />
      </div>
    </div>
  );
};

export default LoaderBlock;
