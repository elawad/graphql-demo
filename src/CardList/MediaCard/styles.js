export default (theme) => ({
  card: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 1,
    justifyContent: 'space-between',
    position: 'relative',
    overflowX: 'hidden',

    [theme.breakpoints.down('sm')]: {
      width: '100%', // theme.typography.fontSize + 4,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    minWidth: '8em',
    // boxSizing: 'border-box',
  },
  coverButton: {
    padding: 0,
    margin: 0,
  },
  cover: {
    width: 225,
    minHeight: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  title: {
    maxWidth: '5.25em',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  creator: {
    position: 'absolute',
    right: theme.spacing.unit,
    bottom: theme.spacing.unit,
    color: 'white',
    textShadow: '1px 1px 1px rgb(1,1,1)',
    letterSpacing: '1px',
    backgroundColor: '#0000002e',
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
  },
  // playIcon: {
  //   height: 38,
  //   width: 38,
  // },
});
