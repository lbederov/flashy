import React, { useContext, useEffect } from 'react';
import { ViewContext } from './View';
import { CardsArray } from './View';
import Card from './Card';

const Cards: React.FC<CardsArray[]> = () => {
  
  const context = useContext(ViewContext);
  useEffect(() => {
  }, [context?.pageview]);
  if (!context) {
    return null;
  }

  const { pageview } = context;
  return (
    <div className="container max-w-full">
      <section className='md:grid auto-cols-max gap-5 max-w-full lg:grid-cols-3 md:grid-cols-2 block'>
        {pageview && pageview.map((card: CardsArray, index: number) => {
          return <Card key={index} id={index} {...card} />;
        })}
      </section>
    </div>
  )
}

export default Cards
