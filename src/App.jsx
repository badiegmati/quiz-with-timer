import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { supabase } from './lib/supabase';
import { getRandomQuestions } from './data/questions';

function App() {
  const [appState, setAppState] = useState('registration');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleRegister = async (firstName, lastName, age) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            age: age
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setStudentId(data.id);
        setStudentName(`${firstName} ${lastName}`);

        const randomQuestions = getRandomQuestions(5);
        setQuestions(randomQuestions);

        setAppState('quiz');
      }
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleQuizComplete = async (finalScore, quizAnswers) => {
    setScore(finalScore);
    setAnswers(quizAnswers);

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([
          {
            student_id: studentId,
            score: finalScore,
            total_questions: questions.length,
            answers: quizAnswers
          }
        ]);

      if (error) throw error;

      setAppState('results');
    } catch (error) {
      console.error('Error saving quiz results:', error);
      setAppState('results');
    }
  };

  const handleRestart = () => {
    setAppState('registration');
    setStudentId('');
    setStudentName('');
    setQuestions([]);
    setScore(0);
    setAnswers([]);
  };

  return (
    <>
      {appState === 'registration' && (
        <RegistrationForm onRegister={handleRegister} />
      )}
      {appState === 'quiz' && (
        <Quiz
          questions={questions}
          studentName={studentName}
          onComplete={handleQuizComplete}
        />
      )}
      {appState === 'results' && (
        <Results
          score={score}
          totalQuestions={questions.length}
          studentName={studentName}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;