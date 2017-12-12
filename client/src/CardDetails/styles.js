export default (/* theme */) => ({
  root: {
    cursor: 'pointer',

    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    alignItems: 'center',

    // TODO - fix stretching in ios
    // flexShrink: 'auto',

    width: '100%',
    height: '100%',
    boxSizing: 'border-box',

    padding: '4px',
    '&:first-child': {
      paddingTop: '4px',
    },

    // [theme.breakpoints.up('md')]: {
    //   padding: '4px', // theme.typography.fontSize + 4,
    //   '&:first-child': {
    //     paddingTop: '4px',
    //   },
    // },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },

  progress: {
    padding: '1em',
    borderRadius: '4px'
  },
});
