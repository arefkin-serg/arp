import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SectionHeader from "./SectionHeader";
import Grid from "@material-ui/core/Grid";
import DocsMenu from "./DocsMenu";
import { useHistory } from "react-router-dom";
import DocsContent from "./DocsContent";


function DocsSection(props) {
  const history = useHistory();

  const handleRoute = (path) => {
    history.push(`#${path}`)
  }

  return (
    <Container>
      <SectionHeader
        title={props.title}
        size={4}
        textAlign="center"
      />
      <Grid container={true} justifyContent="center" spacing={4}>
        <Grid item xs={4}>
          <DocsMenu
            onRoute={handleRoute}
          />
        </Grid>
        <Grid item xs={8}>
          <DocsContent />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DocsSection;