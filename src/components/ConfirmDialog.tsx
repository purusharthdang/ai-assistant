import { AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Remove PDF</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to remove this PDF? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}