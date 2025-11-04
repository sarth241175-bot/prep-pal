
import React, { useState, useCallback } from 'react';
import { generateStudyPlan } from './services/geminiService';
import type { FormData, StudyPlan } from './types';
import { StudyStyle } from './types';
import StepIndicator from './components/StepIndicator';
import QuestionCard from './components/QuestionCard';
import StudyPlanDisplay from './components/StudyPlanDisplay';
import { BookIcon, CalendarIcon, BrainIcon, TargetIcon, TrophyIcon, CheckBadgeIcon } from './components/icons';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    examName: '',
    chaptersRemaining: '',
    chaptersCompleted: '',
    examDate: '',
    studyStyle: StudyStyle.QuestionSolving,
    targetScore: '',
  });
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 6;

  const handleNext = useCallback(() => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  }, [step, totalSteps]);

  const handlePrev = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);
    try {
      const plan = await generateStudyPlan(formData);
      setStudyPlan(plan);
      setStep(totalSteps + 1); // Move to the results view
    } catch (err) {
      setError('Failed to generate study plan. Please check your inputs and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <QuestionCard
            title="Exam Details"
            icon={<TargetIcon />}
            onNext={handleNext}
            isFirst={true}
          >
            <label htmlFor="examName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">What exam are you preparing for? (e.g., JEE Mains, NEET, CBSE Class 12 Boards)</label>
            <input
              type="text"
              name="examName"
              id="examName"
              value={formData.examName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
              placeholder="e.g., NEET UG"
            />
          </QuestionCard>
        );
      case 2:
        return (
          <QuestionCard
            title="Syllabus Status"
            icon={<BookIcon />}
            onNext={handleNext}
            onPrev={handlePrev}
          >
            <label htmlFor="chaptersRemaining" className="block text-sm font-medium text-gray-700 dark:text-gray-300">How many chapters are remaining to be studied?</label>
            <input
              type="number"
              name="chaptersRemaining"
              id="chaptersRemaining"
              value={formData.chaptersRemaining}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
              placeholder="e.g., 15"
            />
          </QuestionCard>
        );
      case 3:
        return (
          <QuestionCard
            title="Syllabus Progress"
            icon={<CheckBadgeIcon />}
            onNext={handleNext}
            onPrev={handlePrev}
          >
            <label htmlFor="chaptersCompleted" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Which chapters have you already completed? (optional)</label>
            <textarea
              name="chaptersCompleted"
              id="chaptersCompleted"
              value={formData.chaptersCompleted}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
              placeholder="e.g., Kinematics, Chemical Bonding, Cell Structure..."
            />
          </QuestionCard>
        );
      case 4:
        return (
          <QuestionCard
            title="Exam Timeline"
            icon={<CalendarIcon />}
            onNext={handleNext}
            onPrev={handlePrev}
          >
            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">When is your exam?</label>
            <input
              type="date"
              name="examDate"
              id="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
              min={new Date().toISOString().split("T")[0]}
            />
          </QuestionCard>
        );
      case 5:
        return (
          <QuestionCard
            title="Study Preference"
            icon={<BrainIcon />}
            onNext={handleNext}
            onPrev={handlePrev}
          >
            <label htmlFor="studyStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">How do you prefer to study?</label>
            <select
              name="studyStyle"
              id="studyStyle"
              value={formData.studyStyle}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            >
              <option value={StudyStyle.QuestionSolving}>By solving questions</option>
              <option value={StudyStyle.RoteLearning}>By rote learning & revision</option>
              <option value={StudyStyle.Balanced}>A balanced mix of both</option>
            </select>
          </QuestionCard>
        );
      case 6:
        return (
          <QuestionCard
            title="Your Goal"
            icon={<TrophyIcon />}
            isLast={true}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          >
            <label htmlFor="targetScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300">What is your target score or rank?</label>
            <input
              type="text"
              name="targetScore"
              id="targetScore"
              value={formData.targetScore}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
              placeholder="e.g., 650+ in NEET, Under 1000 rank in JEE"
            />
          </QuestionCard>
        );
      default:
        return null;
    }
  };
  
  const restart = () => {
    setStep(1);
    setFormData({
      examName: '',
      chaptersRemaining: '',
      chaptersCompleted: '',
      examDate: '',
      studyStyle: StudyStyle.QuestionSolving,
      targetScore: '',
    });
    setStudyPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
            Exam Prep Pal 🇮🇳
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Your AI-powered guide to acing your exams.
          </p>
        </header>
        
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all duration-500">
          {step <= totalSteps && (
            <div className="p-6 sm:p-8">
              <StepIndicator currentStep={step} totalSteps={totalSteps} />
              <div className="mt-8">
                {renderStepContent()}
              </div>
            </div>
          )}

          {step > totalSteps && (
            <div className="p-6 sm:p-8">
              {isLoading && (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">Generating your personalized plan...</p>
                </div>
              )}
              {error && (
                <div className="text-center text-red-500 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <p className="font-semibold">Oops! Something went wrong.</p>
                  <p>{error}</p>
                   <button onClick={restart} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    Try Again
                  </button>
                </div>
              )}
              {studyPlan && <StudyPlanDisplay plan={studyPlan} onRestart={restart} targetScore={formData.targetScore} />}
            </div>
          )}
        </main>
      </div>
       <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by Gemini. Built for the students of India.</p>
      </footer>
    </div>
  );
};

export default App;
