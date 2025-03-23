import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText, ListItemIcon, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { text: 'About' },
    { text: 'Skills' },
    { text: 'Projects' },
    { text: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              scrollToSection(item.text);
              setMobileOpen(false);
            }}
          >

            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Nafees Haider
          </Typography>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{
                mr: 1,
                bgcolor: isDarkMode ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary,
                '&:hover': {
                  bgcolor: isDarkMode ? alpha(theme.palette.common.white, 0.2) : alpha(theme.palette.primary.main, 0.2),
                  transform: 'scale(1.05)'
                }
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                color: theme.palette.text.primary,
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: 250,
                  background: theme.palette.background.paper,
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => (
              <motion.div
                key={item.text}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection(item.text)}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.text}
                </Button>
              </motion.div>
            ))}
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'scale(1.05)'
                }
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;