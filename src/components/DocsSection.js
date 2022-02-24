import { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import SectionHeader from "./SectionHeader";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import DocsMenu from "./DocsMenu";
import DocsContent from "./DocsContent";
import SwaggerParser from "@apidevtools/swagger-parser";
import CONFIG from '../config';

function DocsSection(props) {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const baseUrl = CONFIG.baseUrl;

  const parserData = async (data) => {
    try {
      const schema = await SwaggerParser.dereference(data);
      return schema;

    } catch (error) {
      console.error('ERROR BODY', error);
    }
  }

  const getProperties = (properties) => {
    return Object.keys(properties).reduce((acc, key) => {
      const hasProp = properties[key].properties
      const hasItems = properties[key].items;

      if (hasItems) {
        return { ...acc, ...{ [key]: [getProperties(properties[key].items.properties)] } };
      }

      if (hasProp) {
        return { ...acc, ...{ [key]: getProperties(properties[key].properties) } };
      }

      return { ...acc, ...{ [key]: properties[key].example } };

    }, {})
  }

  const getObjectForRender = (data) => {
    if (!data || !data.content || !data.content['application/json']) return;
    const schema = data.content['application/json']?.schema;

    if (schema.properties) {
      const res = getProperties(schema.properties);
      return res;
    }
  }

  const fetchData = async () => {
    try {


      const parseData = await parserData(`${baseUrl}/docs/v1/public.yaml`);
      const { paths } = parseData;
      const items = Object.keys(paths);
      const docs = items.reduce((acc, i) => {
        const item = paths[i];
        const methods = Object.keys(item);

        for (let m = 0; m <= methods.length; m++) {
          const current = item[methods[m]];
          const name = current.summary || '';
          const method = methods[m];
          const description = current.description || '';
          const category = current.tags[0] || '';
          const endpoint = `${baseUrl}${i}`;
          const requestBody = getObjectForRender(current.requestBody);
          const parameters = current.parameters || null;
          const responses = Object.keys(current.responses).map(key => ({
            code: key,
            description: current.responses[key].description,
            response: getObjectForRender(current.responses[key])
          }));


          const result = { name, method, description, endpoint, requestBody, responses, parameters };
          return { ...acc, [category]: acc[category] ? [...acc[category], result] : [result] }
        }

      }, {});

      setDocs(docs);
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container>
      <SectionHeader
        title={props.title}
        size={4}
        textAlign="center"
      />
      {isLoading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>
          <CircularProgress />
        </Box> :

        isError ?
          <Grid container={true} justifyContent="center" spacing={4}>
            <Grid item xs={6}>
              <Alert severity="error">Documentation couldn't load. Please try again later.</Alert>
            </Grid>
          </Grid> :

          <Grid container={true} justifyContent="center" spacing={4}>
            <Grid item xs={4}>
              <DocsMenu
                items={docs}
              />
            </Grid>
            <Grid item xs={8}>
              <DocsContent
                items={docs}
              />
            </Grid>
          </Grid>}
    </Container>
  )
}

export default DocsSection;