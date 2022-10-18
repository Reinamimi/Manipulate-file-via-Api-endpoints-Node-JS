const express = require("express");
const fs = require("fs/promises");

const app = express();
app.use(express.json());

const port = 3000;

const campaign = require("./campaign.json");

// get route to get all campaigns from campaign file
app.get("/campaigns", async (req, res) => {
  try {
    let campFile = await fs.readFile("./campaign.json", "utf8");

    res.status(200).json({ campaign: JSON.parse(campFile) });
  } catch (err) {
    console.log(err.message);
  }
});


// post route to create a campaign in the campaign file
app.post("/campaigns", async (req, res) => {
  try {
    const {title, category, location} = req.body
    let newobject = {title,category,location};
    let campFile = JSON.parse(await fs.readFile("./campaign.json", "utf8"));

    //  JSON.stringify()
    console.log(typeof campFile);
    console.log(typeof campFile);

    campFile.push(newobject);

    console.log(campFile);

    // return
    await fs.writeFile("./campaign.json", JSON.stringify(campFile), "utf8");

    res.status(200).json({ campaign: campFile });
  } catch (err) {
    console.log(err.message);
  }
});




app.post("/reina", (req, res) => {
  try {
    let campaigndeets = [];
    campaigndeets.push(req.body);
    res.status(200).send(campaigndeets);
  } catch (err) {
    console.log(err);
    res.send(err);
    return;
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
