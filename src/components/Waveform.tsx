import React, {useEffect, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

interface WaveformProps {
    file: File;
    loop: boolean;
}

const colorPalettes = [
    ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
    ['#FF33A1', '#33FFA1', '#A133FF', '#FF8333'],
    ['#86A788', '#FFFDEC', '#FFE2E2', '#FFCFCF'],
    ['#4C585B', '#7E99A3', '#A5BFCC', '#F4EDD3'],
    ['#7C444F', '#9F5255', '#E16A54', '#F39E60'],
    ['#123524', '#3E7B27', '#85A947', '#EFE3C2'],
    ['#441752', '#8174A0', '#A888B5', '#EFB6C8'],
    ['#FFFAEC', '#F5ECD5', '#578E7E', '#3D3D3D'],
    ['#727D73', '#AAB99A', '#D0DDD0', '#F0F0D7'],
    ['#FEF9E1', '#E5D0AC', '#A31D1D', '#6D2323'],
];


const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

const waveColor = randomPalette[0];
const progressColor = randomPalette[1];
const regionColor = randomPalette[2];

const Waveform: React.FC<WaveformProps> = ({file, loop}) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const activeRegionRef = useRef<any>(null); // 当前活动区域引用
    const loopRef = useRef<boolean>(loop); // 用于追踪最新的 loop 状态


    useEffect(() => {
        // 每次 loop 状态变化时更新 loopRef 的值
        loopRef.current = loop;
    }, [loop]);

    useEffect(() => {
        if (waveformRef.current && file) {
            const regionsPlugin = RegionsPlugin.create();

            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor,
                progressColor,
                plugins: [regionsPlugin],
                mediaControls: true,
                barWidth: 2,
                barGap: 0.5,
            });

            const fileUrl = URL.createObjectURL(file);
            wavesurfer.current.load(fileUrl);

            // 添加区域
            wavesurfer.current.on('decode', () => {
                const region = regionsPlugin.addRegion({
                    start: 0,
                    end: 8,
                    content: 'loop',
                    color: regionColor,
                    drag: true,
                    resize: true,
                });
                activeRegionRef.current = region;
            });

            regionsPlugin.on('region-in', (region) => {
                activeRegionRef.current = region;
            });

            regionsPlugin.on('region-out', (region) => {
                // 使用最新的 loop 值
                if (activeRegionRef.current === region && loopRef.current) {
                    region.play();
                }
            });

            // 清理资源
            return () => {
                wavesurfer.current?.destroy();
            };
        }
    }, [file]); // 这里只依赖 file

    return <div id="waveform" ref={waveformRef} style={{width: '100%', margin: '20px 0'}}/>;
};

export default Waveform;
