import { Send, User, Bot } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  pageReference?: number[];
};

type SuggestedQuestion = string;

interface ChatInterfaceProps {
  isAnswerLoading: boolean;
  showSuggestions: boolean;
  suggestions: SuggestedQuestion[];
  messages: Message[];
  inputValue: string;
  onSuggestionClick: (suggestion: string) => void;
  onInputChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onPageNavigate: (pageNum: number) => void;
}

export function ChatInterface({
  isAnswerLoading,
  showSuggestions,
  suggestions,
  messages,
  inputValue,
  onSuggestionClick,
  onInputChange,
  onSubmit,
  onPageNavigate,
}: ChatInterfaceProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-indigo-100 p-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {showSuggestions ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4">Suggested Questions</h2>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.role === 'user' ? (
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className={`flex-1 p-4 rounded-lg ${message.role === 'user'
                  ? 'bg-indigo-50 rounded-tr-none'
                  : 'bg-white border border-indigo-100 rounded-tl-none shadow-sm'
                  } max-w-[80%]`}
                >
                  {message.role === 'user' ? message.content : <TypewriterComponent
                    options={{
                      strings: message.content,
                      autoStart: true,
                      delay: 10
                    }}
                  />
                  }
                  {message?.pageReference?.[0] && message.pageReference.map(((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => onPageNavigate(item)}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium p-2 border border-indigo-600 rounded-md mr-2"
                      >
                        Page {item}
                      </button>
                    )
                  }))}
                </div>
              </div>
            ))}
            {isAnswerLoading ?
              <div
                className="flex gap-3 flex-row"
              >
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 p-4 rounded-lg
                  bg-white border border-indigo-100 rounded-tl-none shadow-sm w-fit text-gray-800"
                >
                  <TypewriterComponent
                    options={{
                      strings: 'Generating answers...',
                      autoStart: true,
                      delay: 10
                    }}
                  />
                </div>
              </div> : null}
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputValue.trim()) {
              onSubmit(inputValue.trim());
            }
          }}
          placeholder="Ask a question about the document..."
          className="w-full p-4 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        />
        <button
          onClick={() => inputValue.trim() && onSubmit(inputValue.trim())}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}