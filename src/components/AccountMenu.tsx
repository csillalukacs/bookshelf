'use client';

import { IconButton, Link, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { SignOut } from './sign-out';
import UserAvatar from './UserAvatar';

export default function AccountMenu() 
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => 
    {
        setAnchorEl(null);
    };

    return (<>
        <IconButton onClick={handleClick}>
            <UserAvatar />
        </IconButton>
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
        >
            <MenuItem>
                <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
                <SignOut />
            </MenuItem>
        </Menu>
    </>)
}