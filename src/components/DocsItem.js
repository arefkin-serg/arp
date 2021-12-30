import React, { useEffect } from 'react'; 
import "prismjs/themes/prism-twilight.css";
import Prism from 'prismjs';
import { makeStyles } from "@material-ui/core/styles";
import getHash from '../util/hash';

const useStyles = makeStyles((theme) => ({
  block: {
    marginBottom: 70,
  },
  console: {
    padding: '10px !important',
    display: 'block',
    whiteSpace: 'nowrap',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,

    '& span': {
      display: 'inline-flex',
      fontStyle: 'normal',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '2px 5px',
      fontSize: 16,
      borderRadius: 4,
      marginLeft: 20,
      textTransform: 'uppercase'
    },
  },
  get: {
    borderColor: '#2196f3',
    backgroundColor: '#2196f330'
  },

  post: {
    borderColor: '#4caf50',
    backgroundColor: '#4caf5030'
  },
  delete: {
    borderColor: '#e64a19',
    backgroundColor: '#e64a1930'
  },
  put: {
    borderColor: '#ffc107',
    backgroundColor: '#ffc10730'
  },
  required: {
    color: '#ff9800'
  }
}));

function DocsItem({content}) {
  const classes = useStyles();
  const { name, method, description, endpoint, requestBody, responses, parameters } = content;
  const hash = getHash(name);

  useEffect(() => {
    Prism.highlightAll();
  }, [])
  
  return (
    <div id={`${hash}`} className={classes.block}>
      <h2 className={classes.title}>{name} <span className={classes[method]}>{method}</span></h2>
      <p>{description}</p>
      <h4>Endpoint</h4>
      <code className={`language-shell ${classes.console}`}>{endpoint}</code>

      {parameters && parameters.map((item, index) => (
        <React.Fragment key={index}>
          <h4>Parameters</h4>

          <p><b>{item.name}</b> ({item.schema.type}) {item.required && <span className={classes.required}>required</span>}</p>
          {item.description && <p>{item.description}</p>}
        </React.Fragment>
      ))}

      {requestBody && 
        <div>
          <h4>Request Body</h4>
          <pre><code className={`language-javascript`}>{JSON.stringify(requestBody, null, 2)}</code></pre>
        </div>
      }

      {responses && responses.map((item, index) => (
        <React.Fragment key={`${item.code}-${index}`}>
          <h4>{item.code} ({item.description})</h4> 
          {item.response && <pre>
            <code className={`language-javascript`}>
              {JSON.stringify(item.response, null, 2)}
            </code>
          </pre>}
        </React.Fragment>
      ))}
    </div>
  )
}

export default DocsItem;