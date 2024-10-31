const getAudioDurationFromBlob = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const audioBlob = await response.blob();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(await audioBlob.arrayBuffer());
    return (audioBuffer.duration / 60).toFixed(2); // Duration in minutes
};

export default getAudioDurationFromBlob