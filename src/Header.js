import React from 'react';
import RetroCard from './RetroCard.js'
import { HeaderButton } from './RetroButtons.js';
import { Typography } from '@material-ui/core';

const Header = ({title, catId, onClick, onDeleteRetro, onEditRetro, items = []}) => {
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
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    catId={catId}
                    onDeleteRetro={onDeleteRetro}
                    onEditRetro={onEditRetro}
                />
                )
            })}
      </div>
    )
}

export default Header;