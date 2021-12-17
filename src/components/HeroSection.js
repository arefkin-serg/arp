import React, { useRef, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Link } from "./../util/router";
import Typed from 'typed.js';

const useStyles = makeStyles((theme) => ({
  // Increase <Container> padding so it's
  // at least half of <Grid> spacing to
  // avoid horizontal scroll on mobile.
  // See https://material-ui.com/components/grid/#negative-margin
  container: {
    padding: `0 ${theme.spacing(3)}px`,
  },
  image: {
    margin: "0 auto",
    maxWidth: 570,
    display: "block",
    height: "auto",
    width: "100%",
  },
  terminal: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    overflow: 'hidden',
    height: 440,
    boxShadow: '0 10px 20px #0000004a'
  },
  terminalHead: {
    height: 30,
    backgroundColor: '#cacaca',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,

    '&::before': {
      content: '""',
      display: 'block',
      width: 12,
      height: 12,
      borderRadius: 20,
      backgroundColor: 'rgb(253, 70, 70)',
      boxShadow: '17px 0 0 rgb(255, 177, 37), 34px 0 0 rgb(42, 195, 41)'
    }
  },

  terminalBody: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    flex: 1,
    padding: 15
  },
  name: {
    color: 'red'
  }
}));

function HeroSection(props) {
  const classes = useStyles();
  const el = useRef(null);
  const typed = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const options = {
      strings: [
        '>  HTTP POST^1000 https://api.streamgorilla.com/v1/streams',
      ],
      typeSpeed: 40,
      backSpeed: 0,
      loop: false,
      onComplete: (self) => {
        setTimeout(() => {
          setIsShow(true)
        }, 1000)
      },
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
      setIsShow(false)
    }
  }, [])

  const getResponse = () => {
    return {
      __html: `{<br>
      <span class="name">"title"</span>: "Calm ocean waves",<br>
      <span class="name">"endpoint"</span>: "rtmp://a.rtmp.youtube.com/live2",<br>
      <span class="name">"stream_key"</span>: "ubjm-3fcc-47fc-2jio-73ac",<br>
      <span class="name">"assets"</span>: {<br>
        <span class="name pl-2">"video"</span>: [<br>
          <span class="pl-2">{</span><br>
            <span class="name pl-3">"filename"</span>: "waves.mp4",<br>
            <span class="name pl-3">"url"</span>: "https://gorilla.s3.amazonaws.com/wave.mp4"<br>
            <span class="pl-2">}</span><br>
        <span class="pl">]</span>,<br>
        <span class="name">"audio"</span>: [<br>
          <span class="pl-2">{</span><br>
            <span class="name pl-3">"filename"</span>: "lofi-beats.mp3",<br>
            <span class="name pl-3">"url"</span>: "https://gorilla.s3.amazonaws.com/lofi-beats.mp3"<br>
            <span class="pl-2">}</span><br>
          <span class="pl">]</span><br>
      }
    }<style>
      .name {
        color: rgb(125, 187, 93);
        padding-left: 20px
      }
      .pl {
        padding-left: 20px;
      }
      .pl-2 {
        padding-left: 40px;
      }
      .pl-3 {
        padding-left: 60px;
      }
    </style>` };
  }

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container className={classes.container}>
        <Grid container={true} alignItems="center" spacing={6}>
          <Grid container={true} item={true} direction="column" xs={12} md={6}>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <SectionHeader
                title={props.title}
                subtitle={props.subtitle}
                size={3}
              />
              <Button
                component={Link}
                to={props.buttonPath}
                variant="contained"
                size="large"
                color={props.buttonColor}
              >
                {props.buttonText}
              </Button>
            </Box>
          </Grid>
          <Grid item={true} xs={12} md={true}>
            <div className={classes.terminal}>
              <div className={classes.terminalHead}></div>
              <div className={classes.terminalBody}>
                <span style={{ whiteSpace: 'pre' }} className="code" ref={el}></span>
                {isShow && <div dangerouslySetInnerHTML={getResponse()}></div>}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default HeroSection;
