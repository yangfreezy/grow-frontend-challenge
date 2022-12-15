import React from 'react';
import { Typography } from '@mui/material';

const WikiPageHeader = () => (
    <Typography data-testid="WikiPageHeader" variant="h2" component="h2" sx={{ marginTop: 2.5, marginBottom: 2.5, flex: 1 }}>
        Top <b>Wiki</b> Articles
    </Typography>
);

export default WikiPageHeader;