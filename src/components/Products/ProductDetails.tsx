import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import { Product } from '../../types/product.ts';
import { Loader } from '../Feedback/Loader.tsx';

async function getProduct<T>(
    endpoint: string,
    signal: AbortSignal
): Promise<T> {
    const response = await fetch(`/api/v1/${endpoint}`);

    return response.json();
}

async function deleteProduct(endpoint: string): Promise<Record<string, never>> {
    const response = await fetch(`/api/v1/${endpoint}`, {
        method: 'DELETE',
    });

    return response.json();
}

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        if (productId !== undefined) {
            getProduct(`products/${productId}`, controller.signal).then(
                setProduct
            );
        } else {
            //     TODO: create ErrorBoundary
            throw new Error(
                `Issue with routing: invalid query params' id ${productId}`
            );
        }

        return () => {
            controller.abort();
        };
    }, [productId]);

    async function handleDelete() {
        await deleteProduct(`products/${productId}`);
        navigate('/', {
            state: { productName: product?.name as string, deleted: true },
        });
    }

    if (!product) {
        return <Loader />;
    }

    return (
        <>
            <h1>{product.name}</h1>
            <Button variant="outlined" onClick={handleDelete}>
                Delete
            </Button>
        </>
    );
}

export default ProductDetails;
