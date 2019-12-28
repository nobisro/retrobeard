import React from 'react';
import RetroCard from './RetroCard.js'
import { HeaderButton } from './RetroButtons.js';
import { Typography } from '@material-ui/core';

const Header = ({title, catId, onClick, items = []}) => {
    return (
        <div className='header'>
            {/* <Typography> */}
                {title}
            {/* </Typography> */}
            <HeaderButton
            onClick={onClick}
            catId={catId}
            />
            {items.map(item => {
                return (
                    <RetroCard
                    title={item.title}
                    description={item.description}
                />
                )
            })}
      </div>
    )
}

export default Header;