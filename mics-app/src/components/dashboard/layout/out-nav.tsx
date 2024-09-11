'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import RouterLink from 'next/link';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { loginPopover } from '@/hooks/login-popover';

import { paths } from '@/paths';
import { Config } from '@/config';
import { MobileNav } from './mobile-nav';
import { LoginPopover } from './login-popover';
import { UserPopover } from './user-popover';
import { Typography } from '@mui/material';

export function OutNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const loginsPopover = loginPopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>

            <Typography>
              <Button 
               component={RouterLink}
               href={paths.home}
              >
               Home
               </Button>
               </Typography>


            <Typography> 
              <Button
              component={RouterLink}
              href={paths.dashboard.overview}
              >
              Dashboard </Button>
              </Typography>
            
            <Typography>
              <Button
              
              >
              About
              </Button>
              </Typography>
          </Stack>

          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
          
            <Avatar
              onClick={loginsPopover.handleOpen}
              ref={loginsPopover.anchorRef}
              src="User"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>
      <LoginPopover anchorEl={loginsPopover.anchorRef.current} onClose={loginsPopover.handleClose} open={loginsPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
