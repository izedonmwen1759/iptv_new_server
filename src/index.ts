import path from "path"
import express from "express"
import cors from "cors"
import multer from "multer"


import { getLocalPlaylist } from "./services/get-playlist";
import { getCategory, getSubCategory } from "./services/categories";
import { getMediaItems } from "./services/get-media";
import { getSeries, getSeriesItems } from "./services/get-series";

const app = express()

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const port = process.env.PORT || 6533;

const root = path.resolve("./");

app.get("/",(req, res)=>{
  
    res.sendFile(path.join(root, "/pages/index.html"));
});
  
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, "playlist.m3u");
    },
  });
  
  const upload = multer({ storage });

  app.post("/upload", upload.single("single"), async (req, res) => {
    res.sendFile(path.join(root, "/pages/success.html"));
  });
  
  const targetFile = path.join(root, "uploads/playlist.m3u");
  
  app.get("/m3u", async (req, res) => { 
    try {
        const playlist = await getLocalPlaylist(targetFile);
    
        const results = playlist && getCategory(playlist);
    
        res.status(200).send(results);
      } catch (error: any) {
        res.status(error.statusCode).send(error.message);
      }
  });
  app.get("/sub/:category", async (req, res) => {
    try {
      const { category } = req.params;
  
      const playlist = await getLocalPlaylist(targetFile);
  
      const cat = getSubCategory(playlist, category);
  
      if (!cat) return res.status(404).send("Subcategory not Found");
  
      res.status(200).send(cat);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  app.get("/media/:group", async (req, res) => {
    try {
      const { group } = req.params;
  
      const playlist = await getLocalPlaylist(targetFile);
  
      const media = getMediaItems(playlist, group);
  
      res.status(200).send(media);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  
  app.get("/series/:channel", async (req, res) => {
    try {
      const { channel } = req.params;
      const playlist = await getLocalPlaylist(targetFile);
  
      const seriesTitles = getSeries(channel, playlist);
  
      res.status(200).send(seriesTitles);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
  
  app.get("/current-series/:series", async (req, res) => {
    try {
      const { series } = req.params;
  
      const playlist = await getLocalPlaylist(targetFile);
  
      const seriesItems = getSeriesItems(series, playlist);
  
      res.status(200).send(seriesItems);
    } catch (error: any) {
      res.status(error.statusCode).send(error.message);
    }
  });
app.listen(port, () => console.log(`server is listening on port: ${port}`));
