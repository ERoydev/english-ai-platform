

const decodeBlobToChannelData = async (blob: Blob): Promise<Float32Array[]> => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Extract channel data
    const channelData: Float32Array[] = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        channelData.push(audioBuffer.getChannelData(i));
    }

    return channelData;
};

export default decodeBlobToChannelData;