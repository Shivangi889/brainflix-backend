const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { timeStamp } = require("console");



//function helps to read json file
const readJson = () => {
  const videoeString = fs.readFileSync("./data/video-details.json", "utf-8");
  return JSON.parse(videoeString);
};

//function helps to read json file
const writeIntoJson = (videos) => {
  const videoeString = fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(videos, null, 2)
  );
};

router.route("/videos").get((req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/video-details.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const result = jsonVideos.reduce((vidarr, video) => {
      vidarr.push({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      });
      return vidarr;
    }, []);

    res.send(result);
  } catch (error) {
    console.log("Error not getting video data", error);
    res.status(500).send("Error not getting video data");
  }
});

router.get("/videos/:videoId", (req, res) => {
  try {
    const stringVideos = fs.readFileSync("./data/video-details.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    const foundVideo = jsonVideos.find(
      (video) => video.id === req.params.videoId
    );

    foundVideo ? res.send(foundVideo) : res.status(404).send("No video found");
  } catch (error) {
    console.log("Error not getting video  details data", error);
    res.status(500).send("Error not getting video details data");
  }
});

//  video post
router.post("/videos", (req, res) => {
  const { title, channel } = req.body;



  const newVideo = {
    id: uuidv4(),
    title,
    channel,
    image:"./public/images/image4.jpg",
 
    };
  try {
    const stringVideos = fs.readFileSync("./data/video-details.json", "utf-8");
    const jsonVideos = JSON.parse(stringVideos);

    jsonVideos.push(newVideo);

    fs.writeFileSync("./data/video-details.json", JSON.stringify(jsonVideos, null, 2));

    res.status(201).send(newVideo);
  } catch (error) {
    console.error("Error adding video:", err);
    res.status(500).send("Error adding video.");
  }


  if (!title || !channel) {
    return res.status(400).send("Title and channel are required.");
  }
});

router.post("/videos/:videoId/Comments", (req, res) => {
  const jsonVideos = readJson();

  const foundVideo = jsonVideos.find(
    (video) => video.id === req.params.videoId
  );

  if (!foundVideo) {
    return res.status(404).send("No Video Found");
  }

  const newComment = {
    id: req.body.id || new Date().getTime().toString(),
    name: req.body.name,
    comment: req.body.comment,
    likes: req.body.likes || 0,
    timeStamp: req.body.timeStamp || Date.now(),
  };

  foundVideo.comments = foundVideo.comments || [];
  foundVideo.comments.push(newComment);

  writeIntoJson();
});

module.exports = router;
