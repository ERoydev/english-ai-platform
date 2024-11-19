

const fetchBlobFromUrl = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch Blob from URL: ${url}`);
    }
    return await response.blob();
};

export default fetchBlobFromUrl