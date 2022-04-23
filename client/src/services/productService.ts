const baseUrl = 'https://localhost:5001/api/products'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}`);
    return await response.json();
}

export const getOne = async (id: string | undefined) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}