import React, {
  FC,
  ImgHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import './Image.css';
import { modifyUrl } from '@app/utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
  size?: string;
}

export const Image: FC<ImageProps> = ({
  className,
  src = '',
  size,
  alt,
  onLoad,
  skeleton = false,
  ...restProps
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const sourceList = useMemo(() => {
    return [
      modifyUrl(src, size),
      modifyUrl(src, 'xxl'),
      modifyUrl(src, 'xl'),
    ];
  }, [src, size]);
  const [currentSrc, setCurrentSrc] = useState<string | null>(
    sourceList[0]
  );

  const handleError = () => {
    if (currentSrc?.includes('/xxl/')) {
      setCurrentSrc(sourceList[2]);
    } else {
      setCurrentSrc(sourceList[1]);
    }
  };

  return (
    <div
      className={classNames(
        'image',
        {
          'image--loaded': loaded,
          'skeleton-gradient':
            skeleton || (src.length > 0 && !loaded),
        },
        className
      )}
    >
      {src.length > 0 && (
        <img
          {...restProps}
          className="image__element"
          onLoad={(e) => {
            setLoaded(true);
            onLoad && onLoad(e);
          }}
          alt={alt}
          src={currentSrc || undefined}
          onError={handleError}
        />
      )}
    </div>
  );
};
