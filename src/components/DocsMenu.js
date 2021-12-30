import React, { useState } from 'react'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import getHash from '../util/hash';
import { HashLink as Link } from 'react-router-hash-link';

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    position: 'sticky',
    top: 15,
    marginBottom: 13
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    display: 'flex',
    color: "#fff",
    textDecoration: 'none',
    marginBottom: 15
  },
  title: {
    paddingLeft: 8,
    marginBottom: 10,
    marginTop: 10
  },
  type: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 60,
    height: 26,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    textTransform: 'uppercase',
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
  }
}));

function DocsMenu(props) {
  const { items } = props;
  const classes = useStyles();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -20; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  }

  return (
    <div className={classes.menu}>
      {Object.keys(items).map((category, index) => (
        <div className={classes.box} key={`${category.title}--${index}`}>
          <Typography component="h3" color="primary" className={classes.title}>
            {category}
          </Typography>
          {items[category].map(item => (
            <Link smooth 
              to={`#${getHash(item.name)}`} 
              className={`${classes.item}`} 
              scroll={el => scrollWithOffset(el)}
              key={item.name}>
              <span className={`${classes.type} ${classes[item.method]}`}>{item.method}</span> {item.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DocsMenu;