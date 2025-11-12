import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Winners = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/winners')
            .then(res => res.json())
            .then(setRecords)
            .catch(err => console.error('우승자 목록 불러오기 실패:', err));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold text-gray-950 flex items-center justify-center gap-3 mb-8">
                    <span role="img" aria-label="trophy">🏆</span>
                    역대 우승자
                    <span role="img" aria-label="trophy">🏆</span>
                </h1>

                <div className="overflow-y-auto max-h-[500px]">
                    <ul className="divide-y divide-gray-200">
                        {records.length === 0
                            ? <li className="py-4 text-center text-gray-400">기록이 없습니다.</li>
                            : records.map((winners, idx) => (
                                <li key={idx} className="py-4 flex flex-row items-center">
                                    <span className="font-semibold text-orange-500 mr-4">제 {idx + 1}대 우승자:</span>
                                    <span className="text-gray-800">{winners.join(', ')}</span>
                                </li>
                            ))}
                    </ul>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg text-lg inline-flex items-center justify-center"
                >
                    <span role="img" aria-label="home">🏠</span>
                    홈으로
                </button>
            </div>
        </div>
    );
};

export default Winners;
