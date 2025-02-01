import React, { useState, useRef, useCallback } from 'react';
import { pdfjs } from 'react-pdf';
import { Header } from './components/Header';
import { PDFViewer } from './components/PDFViewer';
import { ChatInterface } from './components/ChatInterface';
import { ConfirmDialog } from './components/ConfirmDialog';
import { EmptyState } from './components/EmptyState';
import { Loader } from './components/Loader';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useDispatch, useSelector } from 'react-redux';
import UploadFile from './connections/uploadFile';
import { setLoading, setPdfId } from './features/uploadSlice';
import { RootState } from './app/store';
import Chat from './connections/chat';
import { setIsAnswerLoading } from './features/chatSlice';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  pageReference?: number[];
};

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const SUGGESTED_QUESTIONS = [
  "What are the main themes discussed in this document?",
  "Can you summarize the key findings?",
  "What methodology was used in this research?",
  "What are the limitations of this study?"
];

function App() {

  const dispatch = useDispatch();
  const { loading: isFileReading, pdfId } = useSelector((state: RootState) => state.UploadFile)
  const { isAnswerLoading } = useSelector((state: RootState) => state.Chat)

  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setFile(file);
      setShowSuggestions(true);
      setMessages([]);
      setCurrentPage(1);
      pageRefs.current = [];

      // Upload file to backend to parse PDF text
      dispatch(setLoading(true));
      UploadFile(file).then((response) => {
        dispatch(setPdfId(response?.pdf_id ?? ''))
        dispatch(setLoading(false));
      }).catch(() => {
        setFile(null);
        dispatch(setLoading(false));
      })

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleQuestionSubmit = (question: string) => {
    setShowSuggestions(false);
    setMessages(prev => [...prev,
    { role: 'user', content: question },
    ]);
    dispatch(setIsAnswerLoading(true));
    Chat({
      pdf_id: pdfId ?? '',
      message: question
    }).then((data) => {
      setMessages(prev => [...prev, {
        role: 'assistant', content: data.response, pageReference: data.source_pages
      }])
      dispatch(setIsAnswerLoading(false))
    }).catch((err) => {
      setMessages(prev => [...prev, {
        role: 'assistant', content: `Unable to fetch an answer at the moment, please try again later. ERROR: ${err}`
      }])
      dispatch(setIsAnswerLoading(false))
    })
    setInputValue('');
  };

  const navigateToPage = (pageNum: number) => {
    const pageElement = pageRefs.current[pageNum - 1];
    if (pageElement && pdfContainerRef.current) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    if (!pdfContainerRef.current) return;

    const container = pdfContainerRef.current;
    const containerHeight = container.clientHeight;

    for (let i = 0; i < pageRefs.current.length; i++) {
      const element = pageRefs.current[i];
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top - container.getBoundingClientRect().top;

      if (elementTop >= 0 && elementTop <= containerHeight / 2) {
        setCurrentPage(i + 1);
        break;
      }
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className='space-y-6'>
        <Header
          file={file}
          onFileChange={handleFileChange}
          onRemovePDF={() => setShowConfirmDialog(true)}
          fileInputRef={fileInputRef}
        />
      </div>
      <div className="container mx-auto p-4">
        <div className={file ? 'grid grid-cols-[1fr,auto] gap-6' : 'space-y-6'}>
          {isLoading ? (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
              <div className="text-center">
                <Loader size="lg" />
                <p className="mt-4 text-indigo-600 font-medium">Loading PDF...</p>
              </div>
            </div>
          ) : (
            <>
              {file ? (
                <div className="grid grid-cols-[1fr,auto] gap-6">
                  {isFileReading ? <Loader /> :
                    <ChatInterface
                      isAnswerLoading={isAnswerLoading}
                      showSuggestions={showSuggestions}
                      suggestions={SUGGESTED_QUESTIONS}
                      messages={messages}
                      inputValue={inputValue}
                      onSuggestionClick={handleQuestionSubmit}
                      onInputChange={setInputValue}
                      onSubmit={handleQuestionSubmit}
                      onPageNavigate={navigateToPage}
                    />}
                  <PDFViewer
                    file={file}
                    numPages={numPages}
                    currentPage={currentPage}
                    onLoadSuccess={({ numPages }) => {
                      setNumPages(numPages);
                      pageRefs.current = new Array(numPages).fill(null);
                    }}
                    onPageChange={navigateToPage}
                    containerRef={pdfContainerRef}
                    pageRefs={pageRefs}
                    onScroll={handleScroll}
                  />
                </div>
              ) : (
                <EmptyState onUploadClick={handleUploadClick} />
              )}
            </>
          )}
        </div>

        {showConfirmDialog && (
          <ConfirmDialog
            onConfirm={() => {
              setFile(null);
              setMessages([]);
              setShowSuggestions(true);
              setShowConfirmDialog(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            onCancel={() => setShowConfirmDialog(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;