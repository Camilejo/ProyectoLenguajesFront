// components/BackgroundWithContent.styles.js
import { alpha } from '@mui/material/styles';

export const backgroundStyles = (theme) => ({
  backgroundContainer: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 40%), 
        radial-gradient(circle at 90% 80%, ${alpha(theme.palette.secondary.light, 0.08)} 0%, transparent 40%)
      `,
      zIndex: 0
    }
  },
  contentContainer: {
    position: 'relative', 
    zIndex: 1,
    py: 3,
    px: 0,
    width: '100%'
  },
  headerSection: {
    textAlign: 'center', 
    mb: 4,
    mt: 2,
    px: { xs: 2, sm: 3, md: 4 }
  },
  mainTitle: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    mb: 2,
    fontSize: { xs: '1.75rem', md: '2.25rem' }
  },
  subtitle: {
    color: 'text.secondary',
    maxWidth: '600px', 
    mx: 'auto',
    fontSize: { xs: '0.9rem', md: '1.1rem' }
  },
  mainGrid: {
    minHeight: '70vh',
    px: { xs: 2, sm: 3, md: 4 },
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    gap: 3
  },
  leftColumn: {
    gridColumn: { xs: '1', md: '1' },
    gridRow: { xs: 'auto', md: '1 / 4' }
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    gridColumn: { xs: '1', md: '2' }
  }
});

export const cardStyles = (theme) => ({
  // Card principal (Inicio - izquierda)
  mainCard: {
    background: 'white',
    borderRadius: 2,
    height: '100%',
    minHeight: { xs: '300px', lg: '650px' },
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    }
  },

  mainCardContent: {
    padding: '24px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  // Cards laterales base
  sideCard: {
    background: 'white',
    borderRadius: 2,
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    }
  },

  // Diferentes altos para las cards derechas
  tallCard: {
    minHeight: { xs: '200px', lg: '250px' },
    height: { xs: '200px', lg: '250px' }
  },

  mediumCard: {
    minHeight: { xs: '180px', lg: '200px' },
    height: { xs: '180px', lg: '200px' }
  },

  shortCard: {
    minHeight: { xs: '160px', lg: '180px' },
    height: { xs: '160px', lg: '180px' }
  },

  sideCardContent: {
    padding: '16px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  cardHeader: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1.1rem',
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    paddingBottom: 1,
    marginBottom: 2
  },

  cardHeaderWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    paddingBottom: 1,
    marginBottom: 2
  },

  swapButton: {
    color: theme.palette.primary.main,
    background: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.2),
      transform: 'rotate(90deg)',
      transition: 'transform 0.3s ease-in-out'
    }
  },

  flipContainer: {
    position: 'relative',
    flex: 1,
    perspective: '1000px'
  },

  flipContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
    transition: 'all 0.6s ease-in-out',
    display: 'flex',
    flexDirection: 'column'
  },

  textField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      height: '100%',
      alignItems: 'flex-start',
      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: 1,
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '1px',
      },
    },
    '& .MuiInputBase-input': {
      resize: 'vertical',
      height: '100% !important'
    }
  },

  sideTextField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      height: '100%',
      alignItems: 'flex-start',
      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: 1,
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '1px',
      },
    },
    '& .MuiInputBase-input': {
      resize: 'vertical',
      height: '100% !important',
      fontSize: '0.9rem'
    }
  },

  tableContainer: {
    flex: 1,
    boxShadow: 'none',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 1,
    maxHeight: '100%',
    overflow: 'auto'
  },

  tableHeader: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    fontWeight: 600,
    fontSize: '0.7rem',
    padding: '6px 8px',
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
  },

  tableCell: {
    fontSize: '0.7rem',
    padding: '6px 8px',
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
  }
});