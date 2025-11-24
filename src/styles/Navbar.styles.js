// components/Navbar.styles.js
export const navbarStyles = (theme) => ({
  appBar: {
    backgroundColor: 'white',
    color: 'text.primary',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    justifyContent: 'center',
    minHeight: '64px',
    gap: 6
  },
  logo: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: '1.25rem'
  },
  menuContainer: {
    display: 'flex',
    gap: 4
  },
  menuItem: {
    fontSize: '1rem',
    padding: '8px 0',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
});