const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
// Increase the limit to handle base64 image data
app.use(express.json({ limit: '10mb' }));

// This is your SECURE VAULT
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const DETAILED_PROMPT = `
Role: You are an expert Indian Medical Pharmacist and Digital Health Architect for the 'Aushadh-AI' mission supporting PMBJP.
Task: Analyze the medical prescription image. Digitize data and map to Jan Aushadhi (PMBJP) equivalents.

Instructions:
1. Handwriting Analysis: Transcribe ALL Doctor names visible. Transcribe Date and Medications with dosages.
2. Generic Mapping: Identify the active chemical salt for every brand.
3. Jan Aushadhi Match: Match the salt to the standard Jan Aushadhi generic equivalent.
4. Financial Insight: Compare Branded vs. Jan Aushadhi prices (Estimate 80% saving if data missing). Use UTF-8 for ₹ (INR) symbols.
5. DPI Ready: Ensure output is compatible with ABDM (FHIR R4) structures.

Constraint: Your output MUST be a single, valid JSON object. Do not include any other text, conversation, or markdown formatting like '''json. Your entire response must be parsable by JSON.parse(). Mark illegible text as 'Not provided in image'.

The JSON object must follow this exact schema:
{
  "metadata": {
    "doctor": "string",
    "date": "string",
    "currency": "string"
  },
  "medications": [
    {
      "prescribed_brand": "string",
      "active_salt": "string",
      "jan_aushadhi_generic": "string",
      "brand_price_est": "string",
      "jan_aushadhi_price_est": "string",
      "savings_est": "string"
    }
  ],
  "bhashini_summary": {
    "en": "string",
    "hi": "string",
    "te": "string",
    "ta": "string",
    "kn": "string",
    "bn": "string",
    "mr": "string"
  },
  "disclaimer": "string"
}
`;


app.post('/api/process-prescription', async (req, res) => {
  try {
    // The frontend sends the image data as a base64 string
    const { image } = req.body; 
    if (!image) {
      return res.status(400).json({ error: "Image data is required." });
    }

    // The base64 string might include a data URI prefix (e.g., "data:image/jpeg;base64,").
    // The Gemini API needs just the raw base64 data, so we strip the prefix.
    const base64Data = image.split(',')[1] || image;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // We call Gemini here on the SERVER SIDE
    const result = await model.generateContent([
      DETAILED_PROMPT,
      { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
    ]);
    
    const response = await result.response;
    // Send the raw text back, let the frontend parse it.
    // This is safer in case the model response isn't perfect JSON.
    res.send(response.text()); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Processing failed on the server." });
  }
});

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Aushadh-AI Proxy is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
