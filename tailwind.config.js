module.exports = {
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Disables global styles
  },
  future: {
    unstable_tailwindColors: false, // Forces RGB instead of OKLCH
  },
};
