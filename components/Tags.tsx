'use client'
import React, { useContext } from 'react';
import { CardsArray, ViewContext } from './View';

const Tags: React.FC<{ tags: CardsArray['tags'] }> = ({ tags }) => {
  const context = useContext(ViewContext);
  if (!context) {
    return null;
  }
  const { handleViewChange } = context;

  return (
    <div className='join'>
      {tags && tags.map((tag, index) => {
        return tag ? (
          <span key={index} className="badge badge-ghost badge-sm mx-1 cursor-pointer" data-tag={tag} onClick={(e) => {
              const currTag = e.target as HTMLElement;
              if (currTag.dataset.tag) {
                handleViewChange(currTag.dataset.tag);
              }
            }
          }>{tag}
          </span>
        ) : null;
      })}
    </div>
  )
}

export default Tags
