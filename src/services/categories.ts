import parser from "iptv-playlist-parser";

export const getCategory = (playlist: parser.Playlist) => {
  const groups: string[] = [];

  playlist.items.forEach((item) => {
    if (item.group.title.includes(":")) {
      const cat = item.group.title.toLowerCase().trim().split(":")[0];

      groups.push(cat);
    } else groups.push("others");
  });

  return Array.from(new Set(groups));
};

export const getSubCategory = (playlist: parser.Playlist, category: string) => {
  switch (category) {
    case "others":
      const otherItems = playlist.items.filter(
        (item) => !item.group.title.includes(":")
      );

      const otherSub: string[] = [];

      otherItems.forEach((item) => {
        if (item.group.title)
          otherSub.push(item.group.title.toLowerCase().trim());
        else otherSub.push("others");
      });

      return Array.from(new Set(otherSub));

    default:
      const items = playlist.items.filter(
        (item) =>
          item.group.title.toLowerCase().trim().split(": ")[0] ===
          category.toLowerCase().trim()
      );

      const sub: string[] = [];
      items.forEach((item) =>
        sub.push(item.group.title.toLowerCase().trim().split(": ")[1])
      );

      return Array.from(new Set(sub));
  }
};
