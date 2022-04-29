import { Grid, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  const firstItemNumber = (currentPage - 1) * pageSize + 1;
  const lastItemNumber =
    (currentPage * pageSize) > totalCount
      ? totalCount
      : currentPage * pageSize;
  
  return (
    <Grid item xs={9} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}
    >
      <Typography sx={{ px: 4 }}>
        Displaying {firstItemNumber}-{lastItemNumber} of {totalCount} items
      </Typography>
      <Pagination 
        count={totalPages} 
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        size='large' 
        showFirstButton 
        showLastButton />
    </Grid>
  )
};

export default AppPagination;