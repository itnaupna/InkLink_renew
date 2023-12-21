import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const TestPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // FormData 객체를 생성하여 파일 및 다른 데이터를 담음
            const formData = new FormData();
            if (file) {
                formData.append('img', file);
            }
            formData.append('title', title);

            // axios를 사용하여 POST 요청을 보냄
            const response = await axios.post('/api/b/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드 시에는 반드시 이 헤더를 설정해야 함
                },
            });

            // 서버의 응답에 대한 처리
            console.log(response.data);
        } catch (error) {
            // 에러 처리
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form>
                <input type="file" name="img" onChange={handleFileChange} />
                <input name="title" value={title} onChange={handleTitleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default TestPage;
