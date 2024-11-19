import WavEncoder from 'wav-encoder';
import fetchBlobFromUrl from './fetchBlobFromUrl';
import decodeBlobToChannelData from './decodeBloblToChannelData';


const mergeAudioBlobs = async (blobUrls: string[]): Promise<Blob> => {
    try {
        // Fetch actual Blob objects from the URLs
        const blobs = await Promise.all(blobUrls.map(fetchBlobFromUrl));

        // Decode each blob into channel data
        const allChannelData: Float32Array[][] = await Promise.all(
            blobs.map(decodeBlobToChannelData)
        );

        // Flatten and combine channel data
        const combinedChannelData: Float32Array[] = [];
        for (let i = 0; i < allChannelData.length; i++) {
            const blobChannels = allChannelData[i];
            blobChannels.forEach((channel, index) => {
                if (!combinedChannelData[index]) {
                    combinedChannelData[index] = new Float32Array(channel.length);
                }
                combinedChannelData[index] = Float32Array.from([
                    ...combinedChannelData[index],
                    ...channel,
                ]);
            });
        }

        // Encode the combined buffer as a .wav file
        const wavData = await WavEncoder.encode({
            sampleRate: 44100, // Adjust to match your recordings
            channelData: combinedChannelData,
        });

        // Create a .wav Blob
        const wavBlob = new Blob([wavData], { type: 'audio/wav' });

        return wavBlob;
    } catch (error) {
        console.error('Error merging audio blobs:', error);
        throw error;
    }
};

export default mergeAudioBlobs;