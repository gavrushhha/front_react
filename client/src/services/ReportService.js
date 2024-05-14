import axios from 'axios';

const uploadReport = async (formData) => {
    try {
        const response = await axios.post('/api/report/upload-report', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { uploadReport };