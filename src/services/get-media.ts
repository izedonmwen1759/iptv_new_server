import parser from "iptv-playlist-parser";

export const getMediaItems = (playlist: parser.Playlist, group: string) => {
  switch (group) {
    case "others":
      return getMediaItemsDirect(playlist, group);

    default:
      return playlist.items.filter(
        (item) =>
          item.group.title.toLowerCase().trim().split(": ")[1] ===
          group.toLowerCase().trim()
      );
  }
};

const getMediaItemsDirect = (playlist: parser.Playlist, group: string) => {
  return playlist.items.filter(
    (item) =>
      item.group.title.toLowerCase().trim() === group.toLowerCase().trim()
  );
};
