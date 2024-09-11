import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { paths } from '@/paths';
import { Columns } from '@phosphor-icons/react';

export const metadata = { title: `landing | Home | ${config.site.name}` } satisfies Metadata;

export default function landing(): React.JSX.Element {
  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="/assets/logo-emblem--dark2.png"
            sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '400px' }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Welcome to Mics
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
          if you call he/she will be there to listen.
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
          If you already Talked, Checkin and follow up.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={RouterLink}
            href={paths.auth.signIn}
            variant="text"
          >
            Login here.
          </Button>
          
          <Button disabled>
            Or</Button>

          <Button component={RouterLink} href={paths.auth.signUp} variant="outlined">
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
