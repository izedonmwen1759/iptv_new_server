import parser from "iptv-playlist-parser";

export const parse = (m3u: string) => {
  return parser.parse(m3u);
};
