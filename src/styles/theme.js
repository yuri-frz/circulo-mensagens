// Tons de referência do cartaz: ameixa, violeta, malva e lavanda.
export const palette = {
  plum: '#2A153C',
  grape: '#4D2765',
  violet: '#754D8D',
  mauve: '#AA90B8',
  lilac: '#C2B5D2',
  heather: '#CFC7DE',
  mist: '#DFDCEB',
  lavender: '#EBE9F4',
  pearl: '#FBFAFE',
  berry: '#842F55'
};

export const theme = {
  colors: {
    background: palette.lavender,
    surface: palette.pearl,
    ink: palette.plum,
    muted: '#54445E',
    primary: palette.grape,
    primarySoft: palette.mist,
    accent: palette.lilac,
    line: palette.heather,
    sent: palette.heather,
    received: palette.pearl,
    onPrimary: palette.pearl,
    control: '#796785',
    danger: palette.berry
  },
  spacing: { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 },
  radius: { sm: 12, md: 18, lg: 24, pill: 999 },
  text: { title: 29, heading: 20, body: 15, caption: 12 },
  shadow: { shadowColor: palette.plum, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 3 }
};
