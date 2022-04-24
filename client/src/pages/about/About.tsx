import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../api/agent";

const About = () => {

  return (
    <Container>
      <Typography gutterBottom variant='h2'>
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button 
          variant='contained' 
          onClick={() => agent.TestErrors.get400Error().catch(err => console.error(err.message, err.details))}
        >
          Test 400 Error
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.TestErrors.get401Error().catch(err => console.error(err.message, err.details))}
        >
          Test 401 Error
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.TestErrors.get404Error().catch(err => console.error(err.message, err.details))}
        >
          Test 404 Error
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.TestErrors.get500Error().catch(err => console.error(err.message, err.details))}
        >
          Test 500 Error
        </Button>
        <Button 
          variant='contained' 
          onClick={() => agent.TestErrors.getValidationError().catch(err => console.error(err.message, err.details))}
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default About;