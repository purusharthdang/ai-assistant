import React from 'react';
import { BookOpen, Upload, X } from 'lucide-react';

interface HeaderProps {
    file: File | null;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemovePDF: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

export function Header({ file, onFileChange, onRemovePDF, fileInputRef }: HeaderProps) {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md border border-indigo-100">
            <h1 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                PowerPlay AI Research Assistant
            </h1>
            {!file ? (
                <label className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg">
                    <Upload className="w-4 h-4" />
                    Upload PDF
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        accept=".pdf"
                        className="hidden"
                    />
                </label>
            ) : (
                <button
                    onClick={onRemovePDF}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <X className="w-4 h-4" />
                    Remove PDF
                </button>
            )}
        </div>
    );
}