// Prompt templates optimized for Google Gemini

export const COURSE_GENERATION_PROMPT = `
You are an expert educator and course creator.

Generate a structured learning course for the given topic.

Requirements:
- Create a clear course title
- Write a short course description
- Generate 5 to 8 chapters
- Each chapter must have a title and short description

IMPORTANT:
Return ONLY valid JSON. Do not include explanations or extra text.

JSON format:

{
  "title": "Course title",
  "description": "Course description",
  "chapters": [
    {
      "title": "Chapter title",
      "description": "Short explanation"
    }
  ]
}
`;

export const VIDEO_SCRIPT_PROMPT = `
You are a professional educational video creator.

Create a short learning video script for the given topic.

Requirements:
- Generate a clear video title
- Provide a short explanation
- Write a step-by-step teaching script

IMPORTANT:
Return ONLY valid JSON.

JSON format:

{
  "title": "Video title",
  "description": "Short explanation",
  "script": [
    "Step 1 explanation",
    "Step 2 explanation",
    "Step 3 explanation"
  ]
}
`;

export const QUIZ_GENERATION_PROMPT = `
Generate 5 multiple choice quiz questions for the given topic.

Requirements:
- Each question must have 4 options
- Provide the correct answer

IMPORTANT:
Return ONLY valid JSON.

JSON format:

{
  "quiz": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct answer"
    }
  ]
}
`;