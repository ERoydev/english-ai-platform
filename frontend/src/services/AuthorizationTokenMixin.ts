
export const checkIfTokenExist = () => {
    const token = localStorage.getItem('userToken');
        if (!token) {
            console.error("Authentication token not found");
            return { error: "Authentication token not found" };
        }

    return token
        
}