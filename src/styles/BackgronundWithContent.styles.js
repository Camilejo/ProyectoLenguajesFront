// components/BackgroundWithContent.styles.js
import { alpha } from '@mui/material/styles';

export const backgroundStyles = (theme) => ({
  backgroundContainer: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.08)} 0%, 
      ${alpha(theme.palette.secondary.main, 0.05)} 50%,
      ${alpha(theme.palette.info.main, 0.08)} 100%)`,
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
        radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 50%), 
        radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.light, 0.15)} 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, ${alpha(theme.palette.info.light, 0.1)} 0%, transparent 60%)
      `,
      zIndex: 0,
      animation: 'gradientShift 15s ease infinite',
    },
    '@keyframes gradientShift': {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.8,
      },
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
    fontWeight: 800,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    mb: 2,
    fontSize: { xs: '2rem', md: '3rem' },
    letterSpacing: '-0.02em',
    textShadow: '0 2px 10px rgba(99, 102, 241, 0.1)'
  },
  subtitle: {
    color: 'text.secondary',
    maxWidth: '700px',
    mx: 'auto',
    fontSize: { xs: '1rem', md: '1.2rem' },
    fontWeight: 400,
    lineHeight: 1.6
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
    background: 'linear-gradient(to bottom right, #ffffff 0%, #fafafa 100%)',
    borderRadius: 3,
    height: '100%',
    minHeight: { xs: '300px', lg: '650px' },
    boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.12)}, 
                0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`,
    border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      borderRadius: '16px 16px 0 0'
    },
    '&:hover': {
      boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.18)}, 
                  0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
      transform: 'translateY(-4px)',
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
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    borderRadius: 3,
    width: '100%',
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}, 
                0 2px 8px ${alpha(theme.palette.primary.main, 0.06)}`,
    border: `2px solid ${alpha(theme.palette.primary.main, 0.12)}`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: `0 16px 48px ${alpha(theme.palette.primary.main, 0.15)}, 
                  0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
      transform: 'translateY(-3px)',
      borderColor: alpha(theme.palette.primary.main, 0.25),
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
    fontWeight: 700,
    fontSize: '1.2rem',
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingBottom: 1.5,
    paddingLeft: 2,
    marginBottom: 2,
    marginLeft: -2,
    marginRight: -2,
    paddingRight: 2
  },

  cardHeaderWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 100%)`,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingBottom: 1.5,
    paddingLeft: 2,
    marginBottom: 2,
    marginLeft: -2,
    marginRight: -2,
    paddingRight: 1.5
  },

  swapButton: {
    color: 'white',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
      transform: 'rotate(180deg) scale(1.05)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
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
      background: alpha(theme.palette.primary.main, 0.02),
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.25),
        borderWidth: '2px',
        borderRadius: 2,
      },
      '&:hover': {
        background: alpha(theme.palette.primary.main, 0.04),
        '& fieldset': {
          borderColor: alpha(theme.palette.primary.main, 0.4),
        }
      },
      '&.Mui-focused': {
        background: 'white',
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
        '& fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        }
      },
    },
    '& .MuiInputBase-input': {
      resize: 'vertical',
      height: '100% !important',
      fontFamily: '"Fira Code", "Consolas", monospace',
      fontSize: '0.95rem',
      lineHeight: 1.6
    }
  },

  sideTextField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      height: '100%',
      alignItems: 'flex-start',
      background: alpha(theme.palette.primary.main, 0.02),
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.25),
        borderWidth: '2px',
        borderRadius: 2,
      },
      '&:hover': {
        background: alpha(theme.palette.primary.main, 0.04),
        '& fieldset': {
          borderColor: alpha(theme.palette.primary.main, 0.4),
        }
      },
      '&.Mui-focused': {
        background: 'white',
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
        '& fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        }
      },
    },
    '& .MuiInputBase-input': {
      resize: 'vertical',
      height: '100% !important',
      fontSize: '0.9rem',
      fontFamily: '"Fira Code", "Consolas", monospace',
      lineHeight: 1.5
    }
  },

  tableContainer: {
    flex: 1,
    boxShadow: 'none',
    border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
    borderRadius: 2,
    maxHeight: '100%',
    overflow: 'auto',
    background: 'white'
  },

  tableHeader: {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
    fontWeight: 700,
    fontSize: '0.75rem',
    padding: '10px 12px',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.dark,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  tableCell: {
    fontSize: '0.8rem',
    padding: '10px 12px',
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    fontFamily: '"Fira Code", "Consolas", monospace',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.03)
    }
  }
});