'use client';

import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { SignOut } from './sign-out';
import Link from 'next/link';

export default function AccountMenu({children} : {children: React.ReactNode})
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
            {children}
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