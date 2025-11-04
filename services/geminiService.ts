
import { GoogleGenAI, Type } from '@google/genai';
import type { FormData, StudyPlan } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function createPrompt(data: FormData): string {
  const { examName, chaptersRemaining, chaptersCompleted, examDate, studyStyle, targetScore } = data;

  const today = new Date();
  const exam = new Date(examDate);
  const daysRemaining = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  let studyStyleDescription = '';
  switch (studyStyle) {
    case 'QuestionSolving':
      studyStyleDescription = 'focuses heavily on solving a large number of practice questions and mock tests.';
      break;
    case 'RoteLearning':
      studyStyleDescription = 'prioritizes memorizing concepts, formulas, and textbook material through repeated revision.';
      break;
    case 'Balanced':
      studyStyleDescription = 'uses a balanced approach, combining conceptual understanding with a moderate amount of practice problems.';
      break;
  }

  return `
    You are an expert academic counselor for Indian students. A student needs a hyper-personalized and highly detailed study plan.
    Generate a detailed, realistic, and motivating study plan based on the following information:

    - Exam Name: ${examName} (This is a major competitive exam in India, so tailor your advice accordingly)
    - Chapters Remaining to Study: ${chaptersRemaining}
    - Chapters Already Completed: ${chaptersCompleted || 'None specified'}
    - Days Remaining Until Exam: ${daysRemaining}
    - Preferred Study Style: The student ${studyStyleDescription}
    - Target Score/Rank: The student is aiming for "${targetScore}". This is a crucial factor. The plan's intensity, question counts, and revision frequency should be tailored to be rigorous enough to achieve this ambitious goal.

    Based on this, create a JSON object for their study plan. The plan should be structured and practical, broken down into 20-day phases.
    The entire remaining syllabus of ${chaptersRemaining} chapters should be distributed across these phases.
    Prioritize chapters based on their typical weightage and importance for the '${examName}' exam. High-weightage chapters should come first.
    
    The JSON object must be extremely detailed and follow this exact schema. Do not add any extra text or markdown formatting before or after the JSON.
    - title: A catchy title for the study plan that references their goal.
    - totalDays: The number of days remaining.
    - totalHours: A string representing the recommended total study hours per day (e.g., "8-10 hours"). This should reflect the intensity needed for their target.
    - summary: A brief, encouraging summary of the plan.
    - studyPhases: An array of objects, where each object represents a study phase (roughly 20 days each).
        - phase: A string title for the phase (e.g., "Phase 1: Days 1-20").
        - focus: A brief summary of the goal for this phase (e.g., "Mastering High-Weightage Physics & Chemistry").
        - chapters: An array of chapter-specific plans for this phase.
            - chapterName: The name of the chapter.
            - priority: The priority of the chapter ('High', 'Medium', or 'Low') based on exam weightage.
            - questionsToSolve: A string recommending the number of questions to solve for that chapter based on the student's study style and target score (e.g., "150-200 MCQs").
            - keyTopics: An array of 3-4 strings listing the most important topics within that chapter to focus on.
            - revisionPlan: An array of 2-3 strings describing specific revision milestones for this chapter (e.g., ["First revision after 5 days", "Second revision on Day 15", "Final quick review before mock test"]).
    - recommendedSources: An array of 3 objects, each with:
        - name: Name of the resource (e.g., "NCERT Textbooks", "H.C. Verma for Physics").
        - type: e.g., "Book", "Online Platform", "Mock Tests".
        - reason: A short explanation of why this source is recommended for this specific exam and target score.
    - detailedAdvice: An object containing specific, actionable strategies.
        - weeklyGoals: An array of strings, with each string representing a goal for a specific week (e.g., "Week 1-2: Complete 3 high-priority chapters and attempt one sectional test.").
        - mockTestStrategy: A string detailing when to start mock tests, their frequency, and how to analyze performance (e.g., "Start full-length mock tests 60 days before the exam. Begin with one per week, increasing to three per week in the final month. Analyze each test for at least 3 hours...").
    - finalWords: A short, motivational closing message.
  `;
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        totalDays: { type: Type.INTEGER },
        totalHours: { type: Type.STRING },
        summary: { type: Type.STRING },
        studyPhases: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: { type: Type.STRING },
                    focus: { type: Type.STRING },
                    chapters: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                chapterName: { type: Type.STRING },
                                priority: { type: Type.STRING },
                                questionsToSolve: { type: Type.STRING },
                                keyTopics: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING }
                                },
                                revisionPlan: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING }
                                }
                            },
                            required: ["chapterName", "priority", "questionsToSolve", "keyTopics", "revisionPlan"]
                        }
                    }
                },
                required: ["phase", "focus", "chapters"]
            }
        },
        recommendedSources: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    reason: { type: Type.STRING }
                },
                required: ["name", "type", "reason"]
            }
        },
        detailedAdvice: {
            type: Type.OBJECT,
            properties: {
                weeklyGoals: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                mockTestStrategy: { type: Type.STRING }
            },
            required: ["weeklyGoals", "mockTestStrategy"]
        },
        finalWords: { type: Type.STRING }
    },
    required: ["title", "totalDays", "totalHours", "summary", "studyPhases", "recommendedSources", "detailedAdvice", "finalWords"]
};


export async function generateStudyPlan(formData: FormData): Promise<StudyPlan> {
  const prompt = createPrompt(formData);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as StudyPlan;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate study plan from the AI model.");
  }
}
