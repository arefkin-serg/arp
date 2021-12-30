import React from 'react';
import DocsItem from './DocsItem';

function DocsContent({items}) {
  return (
    <div>
      {Object.keys(items).map(key => (
        items[key].map(el => (
          <DocsItem 
            key={el.name}
            content={el}
          />
        ))
      ))}
    </div>
  )
}

export default DocsContent;