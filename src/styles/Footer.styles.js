// styles/Footer.styles.js
import { alpha } from '@mui/material/styles';

export const footerStyles = (theme) => ({
    footer: {
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)}, ${alpha(theme.palette.secondary.main, 0.95)})`,
        color: 'white',
        py: 2.5,
        mt: 4,
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
        radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.light, 0.3)} 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, ${alpha(theme.palette.secondary.light, 0.3)} 0%, transparent 50%)
      `,
            zIndex: 0,
        }
    },

    section: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        position: 'relative',
        zIndex: 1,
    },

    icon: {
        fontSize: '1.5rem',
        color: 'white',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    },

    universityName: {
        fontWeight: 800,
        fontSize: '1.2rem',
        letterSpacing: '0.1em',
        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1,
    },

    subject: {
        fontWeight: 600,
        fontSize: '0.95rem',
        color: alpha('#fff', 0.95),
        textShadow: '0 1px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1,
    },

    divider: {
        width: '80%',
        maxWidth: '400px',
        borderColor: alpha('#fff', 0.3),
        position: 'relative',
        zIndex: 1,
    },

    integratesTitle: {
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textShadow: '0 1px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1,
    },

    memberName: {
        fontSize: '1rem',
        fontWeight: 500,
        color: alpha('#fff', 0.9),
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 1,
        '&:hover': {
            color: '#fff',
            transform: 'translateX(5px)',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }
    },

    copyright: {
        fontSize: '0.85rem',
        color: alpha('#fff', 0.7),
        mt: 2,
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1,
    }
});
