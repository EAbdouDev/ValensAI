"use client";

import React, { useEffect, useRef, useState } from "react";
import Wave from "./Wave";

const SoundReactiveAnimation: React.FC = () => {
  const [isSound, setIsSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const handleAudio = () => {
      const audioElement = audioRef.current;
      if (!audioElement) return;

      if (!audioContextRef.current) {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        analyserRef.current = analyser;
      }

      const bufferLength = analyserRef!.current!.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const detectSound = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
          setIsSound(average > 10); // Adjust threshold as needed
        }
        requestAnimationFrame(detectSound);
      };

      detectSound();
    };

    handleAudio();
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
      <audio ref={audioRef} src="/Final.m4a" controls autoPlay />
      <Wave color="rgba(34,193,195,0.5)" duration={4} delay={0} />
      <Wave color="rgba(253,187,45,0.5)" duration={5} delay={0.5} />
      <Wave color="rgba(255,0,150,0.5)" duration={6} delay={1} />
      <Wave color="rgba(0,255,200,0.5)" duration={7} delay={1.5} />
    </div>
  );
};

export default SoundReactiveAnimation;
