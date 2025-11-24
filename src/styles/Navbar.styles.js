// components/Navbar.styles.js
import { alpha } from '@mui/material/styles';

export const navbarStyles = (theme) => ({
  appBar: {
    background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
    backdropFilter: 'blur(20px)',
    color: 'text.primary',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`
  },
  toolbar: {
    justifyContent: 'center',
    minHeight: '72px',
    gap: 8,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
    }
  },
  logo: {
    fontWeight: 800,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase'
  },
  menuContainer: {
    display: 'flex',
    gap: 1,
    background: alpha(theme.palette.primary.main, 0.05),
    padding: '6px',
    borderRadius: '12px',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
  },
  menuItem: {
    fontSize: '0.95rem',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '8px',
    fontWeight: 500,
    position: 'relative',
    '&:hover': {
      color: theme.palette.primary.main,
      background: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateY(-2px)'
    }
  }
});