import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Clock } from 'lucide-react';

const Quiz = ({ questions, studentName, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(11);
  const [answerTime, setAnswerTime] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer pour chaque question
  useEffect(() => {
    if (showFeedback || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showFeedback]);

  // Réinitialiser le timer quand on change de question
  useEffect(() => {
    setTimeLeft(11);
    setAnswerTime(0);
  }, [currentQuestionIndex]);

  // Timer pour mesurer le temps de réponse
  useEffect(() => {
    if (!currentQuestion || showFeedback) return;

    const answerTimer = setInterval(() => {
      setAnswerTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(answerTimer);
  }, [currentQuestionIndex, showFeedback]);

  const handleTimeUp = () => {
    if (!selectedAnswer) {
      const answerRecord = {
        question: currentQuestion.question,
        userAnswer: 'Aucune réponse',
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
        timeSpent: 11
      };
      
      setAnswers([...answers, answerRecord]);
      setShowFeedback(true);
      
      setTimeout(() => {
        moveToNextQuestion([...answers, answerRecord]);
      }, 1500);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (!showFeedback && timeLeft > 0) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const answerRecord = {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent: answerTime
    };

    setAnswers([...answers, answerRecord]);
    setShowFeedback(true);

    setTimeout(() => {
      moveToNextQuestion([...answers, answerRecord]);
    }, 1500);
  };

  const moveToNextQuestion = (updatedAnswers) => {
    if (isLastQuestion) {
      const score = updatedAnswers.filter(a => a.isCorrect).length;
      onComplete(score, updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-500 text-white p-6">
            <h2 className="text-2xl font-bold">Bonjour, {studentName} !</h2>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-100">
                Question {currentQuestionIndex + 1} sur {questions.length}
              </span>
              <div className="flex items-center gap-4">
                {/* Timer */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                  timeLeft < 10 ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="bg-blue-600 px-4 py-2 rounded-full">
                  <span className="font-semibold">
                    Score: {answers.filter(a => a.isCorrect).length}/{questions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback || timeLeft === 0}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? showFeedback
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : showFeedback && option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                  } ${(showFeedback || timeLeft === 0) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option}</span>
                    {showFeedback && selectedAnswer === option && (
                      isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )
                    )}
                    {showFeedback && option === currentQuestion.correctAnswer && selectedAnswer !== option && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showFeedback && (
              <div
                className={`p-4 rounded-lg mb-6 ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '✓ Correct !' : '✗ Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-gray-700 mt-1">
                    La bonne réponse est : <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                )}
                <p className="text-gray-600 mt-2 text-sm">
                  Temps de réponse : <strong>{answerTime}s</strong>
                </p>
              </div>
            )}

            {!showFeedback && timeLeft > 0 && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                {isLastQuestion ? 'Terminer le Quiz' : 'Question Suivante'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {timeLeft === 0 && !showFeedback && (
              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 shadow-lg"
              >
                Temps écoulé - Continuer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;