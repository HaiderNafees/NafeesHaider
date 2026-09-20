import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  alpha,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

/**
 * NAVBAR — brand and nav items fade in on load with a subtle
 * stagger (load-time, not scroll-triggered). Theme toggle,
 * mobile drawer and smooth scrolling all preserved.
 */
const Navbar = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

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
            key={item}
            onClick={() => {
              scrollToSection(item);
              setMobileOpen(false);
            }}
          >
            <ListItemText primary={item} />
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
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            opacity: 0,
            animation: 'sr-hero-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
          }}
        >
          Nafees Haider
        </Typography>

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
                  transform: 'scale(1.05)',
                },
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
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
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
            {navItems.map((item, index) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                sx={{
                  color: theme.palette.text.primary,
                  opacity: 0,
                  animation: `sr-hero-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.08}s forwards`,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                {item}
              </Button>
            ))}
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'scale(1.05)',
                },
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
