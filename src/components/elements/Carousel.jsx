import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import Image from './Image';

const { REACT_APP_AWS_S3_ENDPOINT, REACT_APP_AWS_BUCKET_NAME } = process.env;

export default ({ images, imageClassName }) => {
    return (
        <Carousel
            showIndicators={images.length > 1}
            showStatus={false}
            showThumbs={false}
            swipeable={false}
            statusFormatter={(current, total) => `${current} / ${total}`}
        >
            {images.map(({ key }) => (
                <div key={key} className={imageClassName}>
                    <Image
                        url={`${REACT_APP_AWS_S3_ENDPOINT}${REACT_APP_AWS_BUCKET_NAME}/${key}`}
                    />
                </div>
            ))}
        </Carousel>
    );
};
