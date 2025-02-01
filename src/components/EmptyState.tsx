import { Upload } from 'lucide-react';

interface EmptyStateProps {
    onUploadClick: () => void;
}

export function EmptyState({ onUploadClick }: EmptyStateProps) {
    return (
        <div
            onClick={onUploadClick}
            className="flex items-center justify-center h-[calc(100vh-8rem)] bg-white rounded-lg shadow-md border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors cursor-pointer group"
        >
            <div className="text-center transform group-hover:scale-105 transition-transform duration-200">
                <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4 group-hover:text-indigo-600 transition-colors" />
                <p className="text-indigo-900 text-lg font-medium">Click or drag PDF to upload</p>
                <p className="text-indigo-600 mt-2">Learn, Analyse, Research and Develop using AI</p>
            </div>
        </div>
    );
}