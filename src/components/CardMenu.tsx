'use client';
import {  MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ListSelectionDialog from "./ListSelectionDialog";
import { Edition, List } from "@/app/lib/definitions";
import { removeEditionFromList } from "@/app/actions/list-actions";

export default function CardMenu(
    {lists, edition, currentList} : 
    {lists: List[], edition: Edition, currentList?: List}
) 
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
            <IconButton 
                className="bg-white" 
                onClick={handleClick} 
                sx={{backgroundColor: "#ffffff55"}}
            >
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
                {currentList && <MenuItem onClick={() => removeEditionFromList(edition.id, currentList.id)}>
                    Remove from list
                </MenuItem>}
            </Menu>
                <ListSelectionDialog 
                    lists={lists} 
                    edition={edition}
                    open={showListSelection}
                    setOpen={setShowListSelection}
                />
        </div>
    )
}