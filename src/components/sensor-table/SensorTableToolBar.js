import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import Filter from '../filter/Filter'
import { getSensorTableFilterConfig } from '../filter/FilterConfigs';

export default function SensorTableToolbar(props) {
    const { numSensors } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Toolbar position="sticky">
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Sensors: {numSensors}
            </Typography>
            <Tooltip title="Filter list">
                <IconButton onClick={handleOpen}>
                    <FilterListIcon />
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
                <Filter filters={getSensorTableFilterConfig()} onFilterChange={() => { }} handleClose={handleClose} />
            </Popover>
        </Toolbar>
    );
};