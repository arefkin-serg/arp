import React from 'react'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    // paddingLeft: 0
  },
  title: {
    paddingLeft: 8,
    marginBottom: 10,

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
    }
    ]
  }
];


function DocsMenu(props) {
  const { onRoute } = props;

  const classes = useStyles();

  const handleClick = (path) => {
    onRoute(path);
  }

  return (
    <div className={classes.menu}>
      {menu.map((category) => (
        <div className={classes.box} key={category.title}>
          <Typography component="h3" color="primary" className={classes.title}>
            {category.title}
          </Typography>
          {category.items.map(item => (
            <Button className={classes.item} onClick={() => handleClick(item.hash)} key={item.name}>
              <span className={`${classes.type} ${classes[item.method]}`}>{item.method}</span> {item.name}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DocsMenu;