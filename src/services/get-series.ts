import parser from "iptv-playlist-parser";

const splitTitle = (spliter: string, seriesTitle: string) =>
  seriesTitle.split(spliter)[0];

export const getSeries = (channel: string, playlist: parser.Playlist) => {
  const seriesTitles: string[] = [];

  playlist.items.forEach((item) => {
    if (item.group.title.toLowerCase().trim().split(": ")[1] === channel) {
      const title = item.name;

      if (title.includes(" S1")) {
        const newTitle = splitTitle(" S1", title);

        seriesTitles.push(newTitle.toLowerCase());
      } else if (title.includes(" S0")) {
        const newTitle = splitTitle(" S0", title);

        seriesTitles.push(newTitle.toLowerCase());
      } else {
        seriesTitles.push(title.toLowerCase());
      }
    }
  });

  return Array.from(new Set(seriesTitles));
};

export const getSeriesItems = (
  selectedSeries: string,
  playlist: parser.Playlist
) => {
  const playlistItem: parser.PlaylistItem[] = [];

  playlist.items.forEach((item) => {
    if (item.group.title.toLowerCase().trim().split(": ")[0] === "series") {
      if (
        item.name.toLowerCase().trim().split(" s1")[0] ===
        selectedSeries.toLowerCase().trim()
      ) {
        playlistItem.push(item);
      } else if (
        item.name.toLowerCase().trim().split(" s0")[0] ===
        selectedSeries.toLowerCase().trim()
      ) {
        playlistItem.push(item);
      }
    }
  });

  return playlistItem;
};
