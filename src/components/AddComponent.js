import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { getFlexComponents } from './flex/FlexConfigs'

export default function AddComponent(props) {
  const { onSelect, handleClose } = props
  const flexComponents = getFlexComponents()
  const handleSelection = (id, label) => () => {
    onSelect(id, label)
    handleClose()
  }
  return (
    <Box>
      <List>
        {flexComponents.map((component) => (
          <ListItem key={component.id} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={component.label}
                onClick={handleSelection(component.id, component.label)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
