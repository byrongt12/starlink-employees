import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip(props) {
 
  const [personName, setPersonName] = React.useState([]);

  var fieldNames = props.allFields

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setSelectedFields(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl size="small" sx={{ width: 150 }}>
        <InputLabel id="fieldsForSort">Column</InputLabel>
        <Select
          labelId="selectForSort"
          id="selectForSort"
          multiple
          value={props.selectedFields}
          onChange={handleChange}
          input={<OutlinedInput id="selectMultiForSort" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {fieldNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              
            >
              {name.replaceAll('_', ' ')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}