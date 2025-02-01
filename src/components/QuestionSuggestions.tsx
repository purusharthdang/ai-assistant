import React from 'react';
import { MessageCircle } from 'lucide-react';

interface QuestionSuggestionsProps {
  suggestions: string[];
  onSelectQuestion: (question: string) => void;
}

export const QuestionSuggestions: React.FC<QuestionSuggestionsProps> = ({
  suggestions,
  onSelectQuestion,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Suggested Questions
      </h3>
      <div className="space-y-2">
        {suggestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};