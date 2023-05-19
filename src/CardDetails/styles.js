export default (theme) => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    minWidth: theme.spacing.unit * 16,
    minHeight: theme.spacing.unit * 16,

    cursor: 'pointer',
    backgroundColor: '#222',

    padding: '4px',
    '&:first-child': {
      paddingTop: '4px',
    },

    [theme.breakpoints.up('md')]: {
      padding: 0, // theme.typography.fontSize + 4,
      '&:first-child': {
        paddingTop: 0,
      },
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',

    transition: 'opacity 500ms',
  },

  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-20px', // half of size
    marginLeft: '-20px', //

    transition: 'opacity 200ms',
  },
});
