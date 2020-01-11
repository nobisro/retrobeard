import React from 'react';
import { RetroCardList } from './RetroCard.js'
import { HeaderButton } from './RetroButtons.js';
import { Typography } from '@material-ui/core';

const Header = (props) => {
    const { title, catId, catIndex, onClick, onDeleteRetro, onEditRetro, items = [] } = props
    return (
        <div className='header'>
            <div className="header-title-container">
                <span className="header-title">
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                </span>
                <HeaderButton
                    onClick={onClick}
                    catId={catId}
                />
            </div>
            <RetroCardList
                items={items}
                onDeleteRetro={onDeleteRetro}
                onEditRetro={onEditRetro}
                catIndex={catIndex}
            />
        </div>
    )
}

export default Header;