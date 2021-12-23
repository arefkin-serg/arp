import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// import remarkPrism from 'remark-prism'
import remarkHighlightjs from 'remark-highlight.js'
import { makeStyles } from "@material-ui/core/styles";
import { login, token, signup, logout } from '../docs';

const useStyles = makeStyles((theme) => ({
  markdown: {
    // backgroundColor: '#000',

    '& .language-console': {
      backgroundColor: '#ffffff10',
      padding: 10,
      whiteSpace: 'nowrap',
      borderRadius: 4,
    },

    '& .language-json': {
      backgroundColor: '#ffffff10',
      display: 'block',
      padding: 10
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
      border: '1px solid #2196f3',
      padding: '2px 5px',
      fontSize: 16,
      borderRadius: 4,
      marginLeft: 20
    }
  }
}));

function getCurrentDoc(doc) {
  switch (doc) {
    case 'login': return login;
    case 'token': return token;
    case 'signup': return signup;
    case 'logout': return logout;
    default:
      break;
  }
}

function DocsContent() {
  const classes = useStyles();
  const history = useHistory();
  const [docs, setDocs] = useState(null);

  const fetchData = (doc) => {
    const current = getCurrentDoc(doc);

    fetch(current)
      .then(resp => resp.text())
      .then(resp => setDocs(resp))
  }

  useEffect(() => {
    fetchData('token')

    const listener = history.listen((loc) => {
      const name = loc.hash.slice(1);
      fetchData(name || 'token')
    })

    return listener;
  }, [])

  return (
    docs &&
    <div className={classes.markdown}>
      <ReactMarkdown children={docs} remarkPlugins={[remarkHighlightjs]} />
    </div>
  )
}

export default DocsContent;