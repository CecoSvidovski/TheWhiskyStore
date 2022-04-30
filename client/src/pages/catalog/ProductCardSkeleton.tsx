import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { radiusShadow } from "../../layout/styles/muiStyles";

const ProductCardSkeleton = () => {
  return (
    <Card sx={{ ...radiusShadow, height: '100%', display: 'grid' }}>
      <Skeleton sx={{ height: 276 }} animation="wave" variant="rectangular" />
      <CardContent sx={{ alignSelf: 'flex-start' }}>
        <Grid container justifyContent='space-between' >
          <Skeleton animation="wave" height='24px' width='40%' sx={{ mb: '5.25px' }} />
          <Skeleton animation="wave" height='24px' width='20%' />
        </Grid>
        <Skeleton animation="wave" height='16.5px' width='60%' />
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <Grid container justifyContent='space-evenly' sx={{ mb: 1 }}>
          <Skeleton animation="wave" height='30px' width='110px' />
          <Skeleton animation="wave" height='30px' width='64px' />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ProductCardSkeleton;