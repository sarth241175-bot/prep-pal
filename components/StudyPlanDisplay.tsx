
import React from 'react';
import type { StudyPlan } from '../types';
import { BookIcon, CalendarIcon, CheckCircleIcon, ClockIcon, LightbulbIcon, TargetIcon, TrophyIcon, CheckBadgeIcon } from './icons';

interface StudyPlanDisplayProps {
  plan: StudyPlan;
  onRestart: () => void;
  targetScore: string;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
    </div>
);

const PriorityBadge: React.FC<{ priority: 'High' | 'Medium' | 'Low' }> = ({ priority }) => {
    const colorClasses = {
      High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 ring-1 ring-inset ring-red-600/20',
      Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 ring-1 ring-inset ring-yellow-600/20',
      Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 ring-1 ring-inset ring-green-600/20',
    };
    const priorityClass = colorClasses[priority] || 'bg-gray-100 text-gray-800';
  
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityClass}`}>{priority} Priority</span>;
};


const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan, onRestart, targetScore }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{plan.title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.summary}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoCard icon={<CalendarIcon className="w-5 h-5 text-white" />} title="Days to Exam" value={`${plan.totalDays} Days`} color="bg-blue-500" />
          <InfoCard icon={<BookIcon className="w-5 h-5 text-white" />} title="Daily Study" value={plan.totalHours} color="bg-green-500" />
          <InfoCard icon={<TrophyIcon className="w-5 h-5 text-white" />} title="Your Target" value={targetScore} color="bg-yellow-500" />
      </div>

      <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">Your Strategic Study Phases</h3>
        <div className="space-y-6">
          {plan.studyPhases.map((phase, index) => (
            <div key={index} className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">{phase.phase}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{phase.focus}</p>
              
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {phase.chapters.map((chapter, chapterIdx) => (
                    <li key={chapter.chapterName}>
                      <div className="relative pb-8">
                        {chapterIdx !== phase.chapters.length - 1 ? (
                          <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3 items-start">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center ring-8 ring-gray-50 dark:ring-gray-700/50">
                                <TargetIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{chapter.chapterName}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                               <PriorityBadge priority={chapter.priority} />
                               <p><span className='font-medium text-gray-700 dark:text-gray-300'>Practice:</span> {chapter.questionsToSolve}</p>
                            </div>
                            <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Key Topics to Master:</p>
                                <ul className="space-y-1">
                                  {chapter.keyTopics.map((topic, topicIdx) => (
                                    <li key={topicIdx} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                      <LightbulbIcon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-yellow-500" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            <div className="mt-2 space-y-1">
                              {chapter.revisionPlan.map((rev, revIdx) => (
                                <div key={revIdx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  <ClockIcon className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span>{rev}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

       <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-purple-200 dark:border-purple-800 pb-2">Detailed Strategic Advice</h3>
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-200">Weekly Goals</h4>
              <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                {plan.detailedAdvice.weeklyGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
               <h4 className="font-semibold text-gray-700 dark:text-gray-200">Mock Test Strategy</h4>
               <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.detailedAdvice.mockTestStrategy}</p>
            </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-green-200 dark:border-green-800 pb-2">Recommended Resources</h3>
        <div className="space-y-3">
          {plan.recommendedSources.map((source, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex-shrink-0 mt-1 text-green-500">
                    <CheckCircleIcon />
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{source.name} <span className="text-xs font-normal bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">{source.type}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{source.reason}</p>
                </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center p-6 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
        <LightbulbIcon className="mx-auto w-8 h-8 text-indigo-500 mb-2"/>
        <p className="font-semibold text-gray-800 dark:text-white">A Final Word of Motivation</p>
        <p className="text-gray-600 dark:text-gray-300 italic">"{plan.finalWords}"</p>
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={onRestart}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Create a New Plan
        </button>
      </div>
    </div>
  );
};

export default StudyPlanDisplay;
