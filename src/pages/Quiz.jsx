import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import questionnaire from '../content/questionnaire_ar.json';

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;
  const shuffledItems = useMemo(() => shuffleArray(questionnaire.items), []);
  const totalPages = Math.ceil(shuffledItems.length / itemsPerPage);
  const currentItems = shuffledItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleAnswer = (itemId, value) => {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  };

  const canGoNext = currentItems.every((item) => answers[item.id] != null);
  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    if (isLastPage) {
      // Store answers and navigate to results
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      navigate('/results');
    } else {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h1>اختبار الميول المهنية</h1>
        <p>
          أجب بصدق عن مدى إعجابك بكل نشاط. لا توجد إجابات صحيحة أو خاطئة.
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          الصفحة {currentPage + 1} من {totalPages}
        </span>
      </div>

      <div className="quiz-items">
        {currentItems.map((item) => (
          <div key={item.id} className="quiz-item">
            <p className="quiz-item-text">{item.text}</p>
            <div className="quiz-scale">
              {questionnaire.scale.map((option) => (
                <button
                  key={option.value}
                  className={`scale-btn ${
                    answers[item.id] === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswer(item.id, option.value)}
                  title={option.label}
                >
                  {option.value}
                </button>
              ))}
            </div>
            <div className="scale-labels">
              <span>لا يعجبني إطلاقًا</span>
              <span>يعجبني كثيرًا</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quiz-nav">
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          السابق
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          {isLastPage ? 'عرض النتائج' : 'التالي'}
        </button>
      </div>
    </div>
  );
}
