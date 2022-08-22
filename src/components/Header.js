import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterList from '@mui/icons-material/FilterList';
import Add from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import AddComponent from './AddComponent'
import Filter from './filter/Filter'
import { styled } from '@mui/system';

const FilterDisplay = styled('div')({
    paddingRight: "24px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end"
});

const FilterWrapper = styled('div')({
    width: "60%",
    float: "right"
});

const StyledChip = styled(Chip)({
    marginLeft: "12px",
    marginBottom: "12px",
    color: "white"
});


export default function Header(props) {
    const { onAddComponent, onFilterChange, filters } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [type, setType] = useState(null)
    const handleClose = () => {
        setAnchorEl(null);
        setType(null);
    };
    const handleOpen = (type) => (event) => {
        setAnchorEl(event.currentTarget);
        setType(type);
    };
    const filterOpen = type === "filter"
    const addOpen = type === "add"
    const filterChipsOpen = filters.some(filter => filter.value !== '')

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
                        open={filterOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Filter onFilterChange={onFilterChange} filters={filters} handleClose={handleClose} />
                    </Popover>
                    <Popover
                        id={"simple-popover"}
                        open={addOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <AddComponent onSelect={onAddComponent} handleClose={handleClose} />
                    </Popover>
                </Toolbar>
                <Collapse in={filterChipsOpen} timeout="auto" unmountOnExit>
                    <FilterWrapper>
                        <FilterDisplay>
                            {filters.map(filter =>
                                filter.value && <StyledChip key={filter.id} variant="outlined" label={`${filter.label}: ${filter.value}`} />
                            )}
                        </FilterDisplay>
                    </FilterWrapper>
                </Collapse>
            </AppBar>
        </Box>
    );
}