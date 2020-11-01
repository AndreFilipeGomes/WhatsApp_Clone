import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuIMaterial from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import { MoreVert, Router } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../cssFiles/Menu.css'
import { useStateValue } from './StateProvider';
import { auth } from '../Services/firebase';
import { Link } from 'react-router-dom';

function Menu() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [{user}] = useStateValue();

    //#region Menu

    const StyledMenu = withStyles({
        paper:{
            borderBottom:'1px solid lightgrey'
        }
    })((props) => (
        <MenuIMaterial
            elevation = {0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            {...props}
        />
    ));

    const StyledMenuItem = withStyles((theme) => ({
        root: {
            "&:focus": {
                backgroundColor: "lightgrey",
                "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: theme.palette.common.black
                }
            }
        },
    }))(MenuItem);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    //#endregion

    const SignOut = () =>{
        if(user)
            auth.signOut();
    };

    return (
        <div className="menu">
           
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <MoreVert></MoreVert>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                
                <Link to="/Login">
                    <StyledMenuItem>
                        <div className="menu__styledMenuItem" onClick={SignOut}>
                            
                            <ListItemIcon className="menu__listItemIcon">
                            <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />

                        </div>
                    </StyledMenuItem>
                </Link>
                
            </StyledMenu>
        </div>
    )
}

export default Menu
