'use client';
import { Add, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ListSelectionDialog from "./ListSelectionDialog";
import { Edition, List } from "@/app/lib/definitions";
import AddToList from "./AddToList";

export default function CardMenu({list, edition} : {list: List[], edition: Edition}) 
{
    const [showListSelection, setShowListSelection] = useState(false);
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

    return (
        <div className="absolute top-0 right-0">
            <IconButton onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={() => setShowListSelection(true)}>
                    Add to list
                </MenuItem>
            </Menu>
                <ListSelectionDialog 
                    lists={list} 
                    edition={edition}
                    open={showListSelection}
                    setOpen={setShowListSelection}
                />
        </div>
    )
}