import parse from 'html-react-parser';
import Modal from './Modal';
import Tags from './Tags';
import React, { useContext, useEffect, useState } from 'react';
import { ViewContext } from './Provider';
import { CardsArray } from './Provider';
export interface CardHtml extends CardsArray {
    id?: number | string | null;
    introHtml?: React.ReactNode | null;
    defHtml?: React.ReactNode | null;
    resourcesHtml?: React.ReactNode | null;
    tags?: string[] | null;
}
export const borderColors = {
    light: 'border-white',
    dark: 'border-gray-800'
}
export const bgColors = {
    light: 'bg-white',
    dark: 'bg-gray-700'
}
const Card: React.FC<CardHtml> = ({ name, intro, definition, resources, tags, snippet, id }) => {

    const context = useContext(ViewContext);
    const defHtml = definition ? parse(definition) : null;
    const introHtml = intro ? parse(intro) : null;
    const resourcesHtml = resources ? parse(resources) : null;
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    useEffect(() => {
        setIsFlipped(false);
    }, [context?.pageview]);

    useEffect(() => {
    }, [context?.theme]);

    if (!context) {
        return null;
    }

    const { theme, pageview } = context;
    
    return (
        name &&
        <>
            <div key={id} className={`card-container mb-4 md:mb-0 ${isFlipped ? " is-flipped" : ""}`}>
                <div className='card-inner'>
                    <div className={`card-teaser card drop-shadow-md hover:drop-shadow-xl border-2  cursor-pointer  ${bgColors[theme]} ${borderColors[theme]}`} onClick={() => setIsFlipped(true)}>
                        <div className="card-body  items-center text-center">
                            <h3 className="card-title md:text-3xl xl:text-4xl">{name}</h3>
                        </div>
                    </div>
                    <div className={`card-flipped card drop-shadow-md hover:drop-shadow-xl border-2  ${bgColors[theme]} ${borderColors[theme]}`} ><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsFlipped(false)}>✕</button>
                        <div className="card-body p-6">
                            <h3 className="card-title px-2 mb-3 md:text-xl xl:text-2xl">{name}</h3>
                             <Tags tags={ tags ?? [] } />
                            <div className={`text-sm  max-w-prose line-clamp-6 mb-2 bg-opacity-50 px-2 mt-3 md:text-base xl:text-lg  ${bgColors[theme]}`} >
                                {introHtml}
                            </div>
                            <div className="card-actions justify-start px-2">
                                <button className="btn btn-primary btn-sm" onClick={() => {
                                    const modal = document.getElementById(`modal-${id}`) as HTMLDialogElement | null;
                                    if (modal) {
                                        modal.showModal();
                                    }
                                }}>Read more</button>

                            </div>
                        </div>
                    </div>
                </div>
                <Modal id={`modal-${id}`} name={name} intro={intro} introHtml={introHtml} definition={definition} defHtml={defHtml} resources={resources} resourcesHtml={resourcesHtml} tags={tags} snippet={snippet} theme={theme} />
            </div>
        </>
    )
}
export default Card
