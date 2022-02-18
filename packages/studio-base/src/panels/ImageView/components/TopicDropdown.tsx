// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { MenuItem, Select, Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";
import { useMemo } from "react";

type TopicDropdownItem = {
  name: string;
  selected: boolean;
};

type Props = {
  title: string;
  items: TopicDropdownItem[];
  multiple: boolean;

  onChange: (activeTopics: string[]) => void;
};

export function TopicDropdown(props: Props): JSX.Element {
  const { items, onChange, title, multiple } = props;

  const selectedTopics = useMemo<string[]>(() => {
    return items.filter((item) => item.selected).map((item) => item.name);
  }, [items]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? [value] : value);
  };

  return (
    <>
      <Select
        multiple={multiple}
        value={selectedTopics}
        disabled={items.length === 0}
        onChange={handleChange}
        displayEmpty
        renderValue={(_selected) => title}
        size="small"
        MenuProps={{ disablePortal: true }}
        variant="outlined"
      >
        {items.length === 0 && (
          <MenuItem disabled value="" dense>
            <em>No topics</em>
          </MenuItem>
        )}
        {items.map((item) => (
          <MenuItem key={item.name} value={item.name} dense>
            <Checkbox checked={selectedTopics.includes(item.name)} size="small" />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
