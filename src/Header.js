import React from 'react';
import RetroCard from './RetroCard.js'
import { HeaderButton } from './RetroButtons.js';
import { Typography } from '@material-ui/core';

const Header = ({ title, catId, onClick, onDeleteRetro, onEditRetro, items = [] }) => {
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