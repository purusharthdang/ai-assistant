import React from 'react';
import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
  file: File;
  numPages: number;
  currentPage: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onPageChange: (pageNum: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onScroll: () => void;
}

export function PDFViewer({
  file,
  numPages,
  currentPage,
  onLoadSuccess,
  onPageChange,
  containerRef,
  pageRefs,
  onScroll,
}: PDFViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-indigo-100">
      {/* Paginator */}
      <div className="mb-4 flex justify-center items-center gap-4 bg-indigo-50 p-3 rounded-lg">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-indigo-900 font-medium">
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, numPages))}
          disabled={currentPage >= numPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          Next
        </button>
      </div>

      {/* PDF Viewer */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="h-[calc(100vh-13rem)] overflow-y-auto pdf-container"
      >
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page_${index + 1}`}
              ref={(el) => (pageRefs.current[index] = el)}
              className="mb-4"
            >
              <Page
                pageNumber={index + 1}
                width={550}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}