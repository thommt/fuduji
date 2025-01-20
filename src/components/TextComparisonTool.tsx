import React, {useState} from 'react';
import TextUploader from './TextUploader.tsx';
import TextInput from './TextInput';
import FileContentViewer from './FileContentViewer';
import ComparisonResults from './ComparisonResults';

const TextComparisonTool: React.FC = () => {
    const [uploadedText, setUploadedText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [showFileContent, setShowFileContent] = useState<boolean>(false);
    const [showComparison, setShowComparison] = useState<boolean>(false);

    const handleFileUpload = (text: string) => {
        setUploadedText(text);
        setShowFileContent(false);
        setShowComparison(false);
    };

    const handleUserInputChange = (input: string) => {
        setUserInput(input);
    };

    const handleShowFileContent = () => {
        setShowFileContent(true);
        setShowComparison(false);
    };

    const handleHideFileContent = () => {
        setShowFileContent(false);
        setShowComparison(false);
    };

    const handleCompare = () => {
        setShowComparison(true);
        setShowFileContent(false);
    };

    return (
        <div style={{fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto'}}>
            <TextUploader onFileUpload={handleFileUpload}/>
            <div style={{marginTop: '20px'}}>
                <button onClick={handleShowFileContent} style={{marginRight: '10px'}}>
                    Show
                </button>
                <button onClick={handleHideFileContent} style={{marginRight: '10px'}}>
                    Hide
                </button>
                <button onClick={handleCompare}>Compare</button>
            </div>
            <TextInput value={userInput} onChange={handleUserInputChange}/>
            {showFileContent && <FileContentViewer content={uploadedText}/>}
            {showComparison && <ComparisonResults originalText={uploadedText} userInput={userInput}/>}
        </div>
    );
};

export default TextComparisonTool;
