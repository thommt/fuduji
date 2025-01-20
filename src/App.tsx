import './App.css'
import {useEffect, useState} from 'react';

import AudioPlayerWithRegions from './components/AudioPlayerWithRegions.tsx';
import TextComparisonTool from "./components/TextComparisonTool.tsx";


const colorPalettes = [
    ['#7C444F', '#9F5255', '#E16A54', '#F39E60'],
    ['#123524', '#3E7B27', '#85A947', '#EFE3C2'],
    ['#441752', '#8174A0', '#A888B5', '#EFB6C8'],
    ['#FFFAEC', '#F5ECD5', '#578E7E', '#3D3D3D'],
    ['#727D73', '#AAB99A', '#D0DDD0', '#F0F0D7'],
    ['#FEF9E1', '#E5D0AC', '#A31D1D', '#6D2323'],
    ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
    ['#FF33A1', '#33FFA1', '#A133FF', '#FF8333'],
    ['#86A788', '#FFFDEC', '#FFE2E2', '#FFCFCF'],
    ['#4C585B', '#7E99A3', '#A5BFCC', '#F4EDD3'],
    ['#7C444F', '#9F5255', '#E16A54', '#F39E60'],
    ['#FFFAEC', '#F5ECD5', '#578E7E', '#3D3D3D'],
    ['#727D73', '#AAB99A', '#D0DDD0', '#F0F0D7'],
    ['#FEF9E1', '#E5D0AC', '#A31D1D', '#6D2323'],
];

/**
 * 将十六进制颜色转换为 RGB 格式，并计算亮度
 */
const getBrightness = (hexColor: string): number => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // 计算亮度
    return 0.299 * r + 0.587 * g + 0.114 * b;
};

/**
 * 根据背景颜色亮度选择文字颜色（黑或白）
 */
const getTextColor = (backgroundColor: string): string => {
    const brightness = getBrightness(backgroundColor);
    return brightness > 128 ? '#000000' : '#FFFFFF'; // 阈值为 128
};


function App() {
    const [selectedPalette, setSelectedPalette] = useState<string[]>([]);

    const applyColorPalette = (palette: string[]) => {
        setSelectedPalette(palette);

        document.documentElement.style.setProperty('--primary-color', palette[0]);
        document.documentElement.style.setProperty('--secondary-color', palette[1]);
        document.documentElement.style.setProperty('--accent-color', palette[2]);
        document.documentElement.style.setProperty('--background-color', palette[3]);
        // 根据背景色选择文字颜色
        const textColor = getTextColor(palette[3]);
        document.documentElement.style.setProperty('--text-color', textColor);
    };


    const handleRandomize = () => {
        const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        console.log("randomPalette", randomPalette);
        applyColorPalette(randomPalette);
    };


    return (
        <div className="app-container">

            <div className="left-part">
                <button onClick={handleRandomize} className="randomize-button" style={{}}>
                    Randomize Colors
                </button>
                <div className="section audio-section">

                    <AudioPlayerWithRegions waveColor={selectedPalette[0]}
                                            progressColor={selectedPalette[1]}
                                            regionColor={selectedPalette[2]}/>
                </div>
            </div>

            <div className="section text-section">
                <TextComparisonTool/>
            </div>
        </div>
    )
}

export default App
