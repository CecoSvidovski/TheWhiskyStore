import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";

const About = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
    agent.TestErrors
      .getValidationError()
      .then(() => console.log('shold not see this'))
      .catch(error => setValidationErrors(error))
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Typography gutterBottom variant='h2'>
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get400Error().catch(err => console.log(err))}
        >
          Test 400 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get401Error().catch(err => console.log(err))}
        >
          Test 401 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get404Error().catch(err => console.log(err))}
        >
          Test 404 Error
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get500Error().catch(error => {
            console.error(error)
            error.status === 500 && navigate('/server-error', {state: {error: error}});
          }
          )}
        >
          Test 500 Error
        </Button>
        <Button
          variant='contained'
          onClick={getValidationError}
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert severity='error'>
          <AlertTitle sx={{ mt: '1px' }}>Validation Errors</AlertTitle>
          {validationErrors.map(error => (
            <p key={error}>
              {`- ${error}`}
            </p>
          ))}
        </Alert>
      }
    </Container>
  )
}

export default About;