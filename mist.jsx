import React, { useState, useEffect, useMemo } from 'react';

// Main component that holds the application's styles.
const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Inter', sans-serif;
        }
        .quiz-card {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        .fade-out {
            animation: fadeOut 0.5s ease-in-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
        /* Custom radio button style */
        .has-[:checked]:border-cyan-500 .checkmark {
            display: block;
        }
    `}</style>
);

// Quiz data remains the same
const quizData = [
    { question: "In which year was MIST established?", options: ["1995", "1998", "2000", "2002"], answer: 1 },
    { question: "What is the motto of MIST?", options: ["Excellence Through Knowledge", "Knowledge is Power", "Technology for Advancement", "Innovate to Elevate"], answer: 2 },
    { question: "MIST is located in which Cantonment?", options: ["Dhaka Cantonment", "Savar Cantonment", "Mirpur Cantonment", "Gazipur Cantonment"], answer: 2 },
    { question: "MIST is affiliated with which university?", options: ["University of Dhaka", "BUET", "Dhaka University of Engineering & Technology", "Bangladesh University of Professionals (BUP)"], answer: 3 },
    { question: "How many undergraduate departments are currently at MIST?", options: ["8", "10", "12", "14"], answer: 2 },
    { question: "What does the 'M' in MIST stand for?", options: ["Modern", "Mirpur", "Military", "Metropolitan"], answer: 2 },
    { question: "Which department was among the first to be established at MIST?", options: ["Computer Science & Engineering", "Civil Engineering", "Mechanical Engineering", "Electrical & Electronic Engineering"], answer: 1 },
    { question: "What is the name of MIST's annual national tech festival?", options: ["TechFiesta", "Cognition", "Innovision", "MISTECH"], answer: 3 },
    { question: "Who is the head of the institution MIST?", options: ["Principal", "Director General", "Commandant", "Vice Chancellor"], answer: 2 },
    { question: "Which faculty does the Aeronautical Engineering (AE) department belong to?", options: ["Faculty of CE", "Faculty of ME", "Faculty of ECE", "Faculty of Science & Engineering"], answer: 1 }
];

// Component for the Start Screen
const StartScreen = ({ onStart }) => (
    <section className="text-center fade-in">
        <img src="https://placehold.co/600x400/000000/FFFFFF?text=MIST+Campus&font=inter" alt="MIST Campus" className="w-48 h-48 object-cover rounded-full mx-auto mb-6 border-4 border-gray-700 shadow-lg" />
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How well do you know MIST?</h2>
        <p className="max-w-xl mx-auto text-gray-300 mb-8">
            Take this short quiz to test your knowledge about the Military Institute of Science and Technology. Get a grade based on your score!
        </p>
        <button onClick={onStart} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            Start the Challenge
        </button>
    </section>
);

// Component for the Quiz Screen
const QuizScreen = ({ question, questionIndex, totalQuestions, onAnswer, onNext, onPrev, userAnswer }) => {
    const progressPercentage = ((questionIndex + 1) / totalQuestions) * 100;

    return (
        <section className="w-full max-w-2xl fade-in">
            <div className="bg-gray-800/50 quiz-card border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Question {questionIndex + 1} of {totalQuestions}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-6 min-h-[6rem]">{question.question}</h3>
                <div className="space-y-4 mb-8">
                    {question.options.map((option, index) => (
                        <label key={index} htmlFor={`option${index}`} className="flex items-center p-4 bg-gray-700/50 border-2 border-transparent rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300 has-[:checked]:border-cyan-500 has-[:checked]:bg-gray-700">
                            <input type="radio" id={`option${index}`} name="option" value={index} checked={userAnswer === index} onChange={() => onAnswer(index)} className="hidden" />
                            <span className="w-5 h-5 mr-4 border-2 border-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full hidden checkmark"></span>
                            </span>
                            <span className="text-gray-200">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <button onClick={onPrev} disabled={questionIndex === 0} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <button onClick={onNext} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105">
                        {questionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </section>
    );
};

// Component for the Result Screen
const ResultScreen = ({ score, totalQuestions, time, onRestart }) => {
    const percentage = useMemo(() => Math.round((score / totalQuestions) * 100), [score, totalQuestions]);
    const [displayPercentage, setDisplayPercentage] = useState(0);

    const { title, subtitle } = useMemo(() => {
        if (percentage >= 90) return { title: "Certified MISTIAN!", subtitle: "Your knowledge is unparalleled. True expert!" };
        if (percentage >= 70) return { title: "Excellent Score!", subtitle: "You know MIST very well. Great job!" };
        if (percentage >= 50) return { title: "Good Effort!", subtitle: "A solid performance. You're familiar with MIST." };
        return { title: "Room to Grow!", subtitle: "A good start, but there's more to learn about MIST." };
    }, [percentage]);

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    
    useEffect(() => {
        let currentPercent = 0;
        const interval = setInterval(() => {
            if (currentPercent >= percentage) {
                clearInterval(interval);
                setDisplayPercentage(percentage);
            } else {
                currentPercent++;
                setDisplayPercentage(currentPercent);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [percentage]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <section className="text-center fade-in">
            <div className="bg-gray-800/50 quiz-card border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-2 text-cyan-400">{title}</h2>
                <p className="text-gray-300 mb-6">{subtitle}</p>
                <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                        <circle className="text-cyan-500 transition-all duration-1000" strokeWidth="8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
                    </svg>
                    <span className="absolute text-4xl font-extrabold">{displayPercentage}%</span>
                </div>
                <p className="text-lg text-gray-200">You answered <span className="font-bold text-white">{score}</span> out of <span className="font-bold text-white">{totalQuestions}</span> questions correctly.</p>
                <p className="text-gray-400 text-sm mb-8">Quiz completed in <span className="font-bold text-white">{formatTime(time)}</span>.</p>
                <button onClick={onRestart} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    Try Again
                </button>
            </div>
        </section>
    );
};


// Main App component
export default function App() {
    const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(new Array(quizData.length).fill(null));
    const [time, setTime] = useState(0);
    const [showTransition, setShowTransition] = useState(false);

    useEffect(() => {
        let timer;
        if (gameState === 'quiz') {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    const handleStateChange = (newState) => {
        setShowTransition(true);
        setTimeout(() => {
            setGameState(newState);
            setShowTransition(false);
        }, 500);
    };

    const handleStartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(quizData.length).fill(null));
        setTime(0);
        handleStateChange('quiz');
    };

    const handleRestartQuiz = () => {
        handleStateChange('start');
    };

    const handleAnswerSelect = (answerIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleStateChange('result');
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const score = useMemo(() => userAnswers.filter((answer, index) => answer === quizData[index].answer).length, [userAnswers]);

    const renderContent = () => {
        switch (gameState) {
            case 'quiz':
                return <QuizScreen
                    question={quizData[currentQuestionIndex]}
                    questionIndex={currentQuestionIndex}
                    totalQuestions={quizData.length}
                    onAnswer={handleAnswerSelect}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    userAnswer={userAnswers[currentQuestionIndex]}
                />;
            case 'result':
                return <ResultScreen
                    score={score}
                    totalQuestions={quizData.length}
                    time={time}
                    onRestart={handleRestartQuiz}
                />;
            default: // 'start'
                return <StartScreen onStart={handleStartQuiz} />;
        }
    };

    return (
        <>
            <GlobalStyles />
            <div className="bg-gray-900 text-white selection:bg-cyan-500 selection:text-white">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black z-0"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-cyan-900/30 via-transparent to-transparent z-0"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-indigo-900/30 via-transparent to-transparent z-0"></div>

                <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10">
                    <header className="w-full max-w-5xl mx-auto py-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
                            M<span className="text-cyan-400">I</span>ST<span className="text-cyan-400">I</span>AN
                        </h1>
                        <p className="text-center text-gray-400 mt-1">The MIST Knowledge Challenge</p>
                    </header>

                    <main className={`w-full flex-grow flex items-center justify-center ${showTransition ? 'fade-out' : ''}`}>
                        {renderContent()}
                    </main>

                    <footer className="w-full max-w-5xl mx-auto py-6 text-center text-gray-500">
                        <p>&copy; 2024 MISTIAN. All Rights Reserved.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
