import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import colors from '../colors';

const drawerWidth = 240;
const navItems = [{ text: "Home", link: "/" }];

export function NavBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2, color: colors.textPrimary }}>
                Learning through gaming
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            component={Link}
                            to={item.link}
                        >
                            <ListItemText primary={item.text} sx={{ color: colors.textPrimary }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                component="nav"
                sx={{ background: colors.navbar, lineHeight: "5.5" , color:colors.textSecondary }}
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                            textAlign: "left",
                            fontWeight: "bold",
                        }}
                    >
                        Learning through gaming 
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "none", sm: "block" },
                            flexGrow: 0,
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                component={Link}
                                to={item.link}
                                sx={{
                                    color: colors.buttonText,
                                    fontSize: "18px",
                                    padding: "6px 10px",
                                    "&:focus": {
                                        outline: "none",
                                        background: colors.divider,
                                    },
                                    "&:hover": {
                                        color: colors.buttonHover,
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}
