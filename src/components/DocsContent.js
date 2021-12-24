import React, { useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkHighlightjs from 'remark-highlight.js';
import remarkGfm from 'remark-gfm';
import remarkHeadingId from 'remark-heading-id'
import { makeStyles } from "@material-ui/core/styles";
import { login, token, signup, logout, asset, streamList, streamStart, streamStop, streamCreate, streamFind } from '../docs';

const useStyles = makeStyles((theme) => ({
  markdown: {
    '& .language-console': {
      backgroundColor: '#ffffff10',
      padding: 10,
      whiteSpace: 'nowrap',
      borderRadius: 4,
    },

    '& .language-json': {
      backgroundColor: '#ffffff10',
      display: 'block',
      padding: 10,
      overflow: 'hidden'
    },

    '& .hljs-attr': {
      color: '#7dbb5d',
    }, 

    '& h2': {
      display: 'flex',
      alignItems: 'center',
      marginTop: 0,
    },
    '& h2 em': {
      display: 'inline-flex',
      fontStyle: 'normal',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '2px 5px',
      fontSize: 16,
      borderRadius: 4,
      marginLeft: 20
    },
    '& #get em': {
      borderColor: '#2196f3',
      backgroundColor: '#2196f330'
    },
    '& #post em': {
      borderColor: '#4caf50',
      backgroundColor: '#4caf5030'
    },
    '& #delete em': {
      borderColor: '#e64a19',
      backgroundColor: '#e64a1930'
    },
    '& #put em': {
      borderColor: '#ffc107',
      backgroundColor: '#ffc10730'
    },
    '& table': {
      borderCollapse: 'collapse'
    },
    '& table th, & table td': {
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px 20px'
    }
  }
}));

function getCurrentDoc(doc) {
  switch (doc) {
    case 'login': return login;
    case 'token': return token;
    case 'signup': return signup;
    case 'logout': return logout;
    case 'asset': return asset;
    case 'streamList': return streamList;
    case 'streamStart': return streamStart;
    case 'streamStop': return streamStop;
    case 'streamCreate': return streamCreate;
    case 'streamFind': return streamFind;
    default:
      break;
  }
}

function DocsContent() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [docs, setDocs] = useState(null);

  const fetchData = (doc) => {
    const current = getCurrentDoc(doc);

    fetch(current)
      .then(resp => resp.text())
      .then(resp => setDocs(resp))
  }

  useEffect(() => {
    if (location.hash) {
      fetchData(location.hash.slice(1))
    } else {
      fetchData('token')
    }

    const listener = history.listen((loc) => {
      const name = loc.hash.slice(1);
      fetchData(name || 'token')
    })

    return listener;
  }, [])

  return (
    docs &&
    <div className={classes.markdown}>
      <ReactMarkdown children={docs} remarkPlugins={[remarkHighlightjs, remarkHeadingId, remarkGfm]} />
    </div>
  )
}

export default DocsContent;