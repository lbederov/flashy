
import { ViewContext } from './View';
import React, { useContext } from 'react';
import { CardHtml, bgColors } from './Card';
interface CodeSnippets {
  [key: string]: {
    scope: string;
    prefix: string;
    body: string[];
    description: string;
  };
}
import code from '../app/data/code-snippets';
const theCode = code as CodeSnippets;

const borderColors = {
  light: 'border-gray',
  dark: 'border-gray-800'
}

const Modal: React.FC<CardHtml> = ({ name, introHtml, defHtml, resourcesHtml, snippet, id }) => {

  const context = useContext(ViewContext);
  if (!context) {
    return null;
  }
  const { theme } = context;
  const codeSnippet = theCode && snippet && theCode[snippet] ? Array.from(theCode[snippet]?.body) ?? [] : [];

  return (
    name &&
    <dialog id={id ? id.toString() : ''} className="modal modal-bottom sm:modal-middle">
      <div className={`modal-box ${bgColors[theme]}`}>
        <h3 className="card-title mb-3">{name}</h3>
        <div className="text-sm  max-w-prose link-underline list-disc">
          <div className="mb-4 ">{introHtml}</div>
          <hr className={borderColors[theme]} />
          {(defHtml) && <div className="card-definition mt-2 ">{defHtml}</div>}
          {(resourcesHtml) && <div className="card-resources mt-2">
            <h3 className="font-bold">Resources:</h3>
            <div className="my-2">{resourcesHtml}</div>
          </div>
          }
          {codeSnippet.length > 0 && <div className="mockup-code mt-3">{
            codeSnippet.map((line: string, index: number) => {
              return <pre key={index}><code className="js">{line}</code></pre>;
            }
            )
          }
          </div>
          }
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Modal
