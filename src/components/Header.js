import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterList from '@mui/icons-material/FilterList';
import Add from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getFlexComponents } from './FlexUtil';

const AddList = (props) => {
    const { onSelect, handleClose } = props
    const flexComponents = getFlexComponents()
    const handleSelection = (id, label) => () => {
        onSelect(id, label)
        handleClose()
    }
    return (
        <Box>
            <List >
                {flexComponents.map(component => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={component.label} onClick={handleSelection(component.id, component.label)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default function Header(props) {
    const { onAddComponent } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [type, setType] = React.useState(null);
    const handleOpen = (type) => (event) => {
        setAnchorEl(event.currentTarget);
        setType(type);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setType(null);
    };
    const open = Boolean(anchorEl);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Logo
                    </Typography>
                    <Tooltip title="Filter list">
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpen("filter")}
                        >
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add new component">
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpen("add")}
                        >
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={"simple-popover"}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        {type === "filter" ?
                            <Typography sx={{ p: 2 }}>The Filter content of the Popover.</Typography>
                            : <AddList onSelect={onAddComponent} handleClose={handleClose} />}
                    </Popover>
                </Toolbar>
            </AppBar>
        </Box>
    );
}