import {Link} from "react-router-dom";

import { Card, CardActions, CardContent, CardMedia, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { faker } from '@faker-js/faker';

import { ProductWithCategories } from '../../types/product.ts';

type ProductItemProps = {
    product: ProductWithCategories;
};

function ProductItem({ product }: ProductItemProps) {
    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={faker.image.urlLoremFlickr({
                        category: 'technics',
                    })}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Chip label={`$${product.price}`} variant="filled" />
                </CardContent>
                <CardContent>
                    <Chip
                        label={product.category?.name}
                        variant="outlined"
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={product.subcategory?.name}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions>
                    <Link to={`/products/${product.id}`}>
                        <Button size="small">
                            More info
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default ProductItem;
