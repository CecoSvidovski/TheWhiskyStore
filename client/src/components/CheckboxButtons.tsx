import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  label?: string;
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

const CheckboxButtons = ({ label, items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || [])

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex(item => item === value);
    let newChecked: string[] = [];

    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter(item => item !== value);

    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <FormControl variant='outlined'>
      {label
        ? <FormLabel>{label}</FormLabel>
        : ''
      }
      <FormGroup>
        {items.map(item => item && (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handleChecked(item)}
              />
            }
            label={item}
            key={item}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
};

export default CheckboxButtons;