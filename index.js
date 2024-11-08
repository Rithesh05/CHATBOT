// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai"; 
// import bodyParser from "body-parser";

// const API_KEY = "AIzaSyARL2FaTPowsbTZ-C5NUvkn7wo6Pv-4NBA";
// const app = express();

// app.use(bodyParser.json());

// app.get("/", async (request, response) => {
//     const genAI = new GoogleGenerativeAI({ apiKey: API_KEY });
//     const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "Write a story about a magic backpack.";
    
//     // Make sure prompt is passed as an object if required by the library
//     const result = await model.generateContent({ input: prompt }); // Adjust `input` as per the required format

//     console.log(result.text); // Send generated text to the client
  
// });

// app.listen(3000, () => {
//   console.log("App is listening on port 3000");
// });






import { GoogleGenerativeAI } from "@google/generative-ai";
import { dirname } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import express from "express";
import path from "path";

const app = express();
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaPath = __dirname + "/media";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/get", async (req, res) => { // Marking as async
  try {
    let data = await textGenTextOnlyPrompt(req.body.text);
    res.json({ data: data });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function textGenTextOnlyPrompt(temporarytext) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "who is rithesh";
  const result = await model.generateContent(temporarytext);

  // Ensure the result is valid
  if (result && result.response && result.response.text) {
    return result.response.text();
  } else {
    throw new Error("Invalid response from the API");
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
