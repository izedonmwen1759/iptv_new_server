import fs from "fs";
import { parse } from "../utils/parser";

export const getLocalPlaylist = (target: string) => {
  const data = fs.readFileSync(target).toString();

  const playlist = parse(data);

  return playlist;
};
