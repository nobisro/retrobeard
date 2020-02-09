import React from 'react';
import { RetroCardList } from './RetroCard.js'
import { HeaderButton } from './RetroButtons.js';
import { Typography } from '@material-ui/core';

const Category = (props) => {
    const { title, categoryId, categoryIndex, onClick, onDeleteRetro, onEditRetro, items = [] } = props

    return (
        <div className='header'>
            <div className="header-title-container">
                <span className="header-title">
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                </span>
                <HeaderButton
                    handleClick={onClick}
                    categoryId={categoryId}
                />
            </div>
            <RetroCardList
                items={items}
                onDeleteRetro={onDeleteRetro}
                onEditRetro={onEditRetro}
                categoryIndex={categoryIndex}
            />
        </div>
    )
}

export default Category;