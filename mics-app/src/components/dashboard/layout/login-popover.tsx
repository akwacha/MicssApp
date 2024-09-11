import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignIn as SignInIcon } from '@phosphor-icons/react/dist/ssr/SignIn';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface LoginPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function LoginPopover({ anchorEl, onClose, open }: LoginPopoverProps): React.JSX.Element {
  const { checkSession } = useUser();

  const router = useRouter();

  

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
       <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
              
        <MenuItem component = {RouterLink} 
        href={paths.auth.signIn}>
          <ListItemIcon>
            <SignInIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          login
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
