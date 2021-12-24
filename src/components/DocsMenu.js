import React, { useState} from 'react'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

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
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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

const menu = [
  {
    title: 'Registration and Authentication',
    items: [{
      name: 'Token',
      method: 'get',
      hash: 'token'
    }, {
      name: 'Authenticates user',
      method: 'post',
      hash: 'login'
    }, {
      name: 'Logout',
      method: 'delete',
      hash: 'logout'
    }, {
      name: 'Creates new user',
      method: 'post',
      hash: 'signup'
    }]
  }, {
    title: 'Assets',
    items: [
      {
        name: 'Find asset by ID',
        method: 'get',
        hash: 'asset'
      }
    ]
  }, {
    title: 'Streams',
    items: [
      {
        name: 'List streams',
        method: 'get',
        hash: 'streamList'
      }, {
        name: 'Create stream',
        method: 'post',
        hash: 'streamCreate',
      }, {
        name: 'Start stream',
        method: 'put',
        hash: 'streamStart'
      }, {
        name: 'Stop stream',
        method: 'put',
        hash: 'streamStop',
      }, {
        name: 'Find stream by ID',
        method: 'get',
        hash: 'streamFind'
      }
    ]
  }
];


function DocsMenu(props) {
  const { onRoute } = props;
  const [active, setActive] = useState('token');
  const classes = useStyles();

  const handleClick = (path) => {
    onRoute(path);
    setActive(path);

    window.scrollBy({
      top: -10000,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className={classes.menu}>
      {menu.map((category) => (
        <div className={classes.box} key={category.title}>
          <Typography component="h3" color="primary" className={classes.title}>
            {category.title}
          </Typography>
          {category.items.map(item => (
            <Button className={`${classes.item} ${active === item.hash ? classes.active : ''}`} onClick={() => handleClick(item.hash)} key={item.name}>
              <span className={`${classes.type} ${classes[item.method]}`}>{item.method}</span> {item.name}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DocsMenu;