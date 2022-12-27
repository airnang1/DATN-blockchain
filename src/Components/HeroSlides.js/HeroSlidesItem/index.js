import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../Button';

function HeroSlidesItem(props) {
    const { item, active } = props;
    return (
        <div className={`hero-slides__item ${active ? 'active' : ''}`}>
            <div className="hero-slides__item__info">
                <div
                    className={`hero-slides__item__info__title color-${item.color}`}
                >
                    <span>{item.title}</span>
                </div>
                <div className="hero-slides__item__info__description">
                    <span>{item.description}</span>
                </div>
                <div className="hero-slides__item__info__btn">
                    <Link to={item.path}>
                        <Button
                            bgBtn={item.color}
                            icon="shopping-cart"
                            animate={true}
                        >
                            See details
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="hero-slides__item__image">
                <div className={`shape bg-${item.color}`}></div>
                <img alt={item.title} src={item.img} />
            </div>
        </div>
    );
}

HeroSlidesItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default HeroSlidesItem;
