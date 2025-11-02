import { Trophy, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const Results = ({ score, totalQuestions, studentName, answers, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'Excellent !', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 75) return { grade: 'Très bien !', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'Bien', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage >= 50) return { grade: 'Passable', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { grade: 'À améliorer', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const { grade, color, bg } = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-4">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Terminé !</h1>
            <p className="text-blue-100 text-lg">Félicitations, {studentName} !</p>
          </div>

          <div className="p-8">
            <div className={`${bg} rounded-xl p-6 mb-8 text-center`}>
              <p className={`text-6xl font-bold ${color} mb-2`}>
                {score}/{totalQuestions}
              </p>
              <p className="text-gray-700 text-lg mb-1">Score: {percentage}%</p>
              <p className={`text-2xl font-semibold ${color}`}>{grade}</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Détails des réponses</h2>

            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl border-2 ${
                    answer.isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        Question {index + 1}: {answer.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                          <span className="font-medium">Votre réponse :</span> {answer.userAnswer}
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-green-700">
                            <span className="font-medium">Bonne réponse :</span> {answer.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onRestart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Recommencer le Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;