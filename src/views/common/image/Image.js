import React from 'react';
import PropTypes from 'prop-types';
import styles from './Image.scss';

export default function Image(props) {
    const { src, width, height } = props;
    const style = {
        width,
        height,
        maxWidth: width,
    };

    if (!src) {
        return <div className={styles.placeholder} style={style} />;
    }

    const imgSrc = `./assets/textures/${src}`;

    return <img className={styles.image} src={imgSrc} style={style} alt="" />;
}

Image.propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

Image.defaultProps = {
    src: null,
    width: '100%',
    height: 'auto',
};
