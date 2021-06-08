import {useContext, useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'
import classes from './HeaderCardButton.module.css'

const HeaderCardButton = (props) => {
    const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0); 


    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
    );
};

export default HeaderCardButton
