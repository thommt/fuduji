import React from 'react';

interface AudioUploaderProps {
    onFileSelect: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect }) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            onFileSelect(uploadedFile);
        }
    };

    return (
        <div>
            <label htmlFor="audio-upload" style={{marginRight: '10px'}}>
                Upload Audio File:
            </label>
            <input type="file" id="audio-upload" accept="audio/*" onChange={handleFileUpload}/>
        </div>
    );
};

export default AudioUploader;
