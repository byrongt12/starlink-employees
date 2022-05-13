import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';


export default function FieldSelector(props) {

    var fieldNames = props.data 

    const handleChange = (event) => {
        props.setSelectedField(event.target.value);
    };


    return (
        
        <div> 
        <FormControl size="small" sx={{minWidth: 150}}>
            <InputLabel id="demo-simple-select-helper-label">{props.initialText}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                defaultValue=''
                value={props.selectedFilterFields}
                label="Column"
                onChange={handleChange}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {fieldNames.map((name) => (
                <MenuItem
                key={name}
                value={name}
               
                >
                {name}
                </MenuItem>
            ))}
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
        
        </div>
    );
    }