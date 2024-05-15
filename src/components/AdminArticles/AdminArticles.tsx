import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const AdminArticles: FC = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            Партнерские статьи
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/admin/create"
            >
              Добавить новую
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={3} key={item}>
            <Card>
              <CardActionArea component={Link} to={`/admin/edit/${item}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/200/200"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
