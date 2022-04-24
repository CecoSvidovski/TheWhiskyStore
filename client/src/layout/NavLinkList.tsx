import { List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { link, nav } from "./styles/muiStyles";

interface Props {
  links: {
    title: string,
    path: string,
  }[];
}

const NavLinkList = ({ links }: Props) => (
  <List sx={{ display: 'flex' }}>
    {links.map(({ title, path }) => (
      <ListItem
        component={NavLink}
        to={path}
        key={title}
        sx={{ ...link, ...nav }}
      >
        {title}
      </ListItem>
    ))}
  </List>
);

export default NavLinkList;