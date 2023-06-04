import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Home() {
    const location = useLocation();
        // TODO: refresh reloads the deleted alert
    const [msg, setMsg] = useState<boolean | undefined>(
        location?.state.deleted
    );

    return (
        <Box sx={{ my: '20px' }}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    {msg && (
                        <Alert
                            severity="success"
                            sx={{ mb: '20px' }}
                            onClose={() => {
                                setMsg(false);
                            }}
                        >
                            Deleted product {location.state.productName}
                        </Alert>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
