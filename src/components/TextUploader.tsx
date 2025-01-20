import React, { ChangeEvent } from 'react';

interface FileUploaderProps {
    onFileUpload: (text: string) => void;
}

const TextUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                onFileUpload(text);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <label htmlFor="text-upload" style={{ marginRight: '10px' }}>
                Upload Text File:
            </label>
            <input type="file" id="text-upload" accept=".txt" onChange={handleFileChange} />
        </div>
    );
};

export default TextUploader;
