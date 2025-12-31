const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenAI } = require('@google/genai');

admin.initializeApp();

const genAI = new GoogleGenAI(functions.config().gemini.key);

exports.analyzePrescription = functions.https.onCall(async (data, context) => {
  const { base64Image, mimeType } = data;

  if (!base64Image || !mimeType) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with "base64Image" and "mimeType" arguments.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt = "Analyze this medical prescription..."; // A more detailed prompt will be added later

  try {
    const result = await model.generateContent([prompt, { inlineData: { data: base64Image, mimeType } }]);
    const response = await result.response;
    const text = response.text();
    return { analysis: text };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new functions.https.HttpsError('internal', 'Unable to analyze prescription.');
  }
});
