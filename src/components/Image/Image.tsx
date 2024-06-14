import React, { FC, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import './Image.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
}

export const Image: FC<ImageProps> = ({
  className,
  src = '',
  alt,
  onLoad,
  skeleton = false,
  ...restProps
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

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
          src={src}
        />
      )}
    </div>
  );
};
