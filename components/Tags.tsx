import React, { useContext } from 'react';
import { ViewContext } from './Provider';

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  const context = useContext(ViewContext);
  if (!context) {
    return null;
  }
  const { getCurrentDeck } = context;
  return (
    <>
    <div className='join'>
      {tags.map((tag, index) => {
        return tag ? (
          <span key={index} className="badge badge-ghost badge-sm mx-1 cursor-pointer" data-tag={tag} onClick={(e) => {
              const currTag = e.target as HTMLElement;
              if (currTag.dataset.tag) {
                getCurrentDeck(currTag.dataset.tag);
              }
            }
          }>{tag}
          </span>
        ) : null;
      })}
    </div>
    </>
  )
}

export default React.memo(Tags)
