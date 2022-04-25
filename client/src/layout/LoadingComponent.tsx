import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

const LoadingComponent = ({message = 'Loading...'}: Props) => {
    return (
        <Backdrop open invisible sx={{minHeight: '400px'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={100} color='secondary' />
                <Typography variant='h4' sx={{justifyContent: 'center', position: 'fixed', mt: 20}}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}

export default LoadingComponent;