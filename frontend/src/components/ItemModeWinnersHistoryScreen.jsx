import { useState, useEffect } from 'react';
import { getItemWinnersHistory } from '../services/racingApi';

const ItemModeWinnersHistoryScreen = ({ onBack }) => {
    const [winnersHistory, setWinnersHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemWinnersHistory = async () => {
            try {
                setLoading(true);
                const history = await getItemWinnersHistory();
                setWinnersHistory(history);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItemWinnersHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-spin">🏆</div>
                    <p className="text-gray-600">역대 우승자 기록을 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">오류 발생</h2>
                        <p className="text-red-600 mb-6">{error}</p>
                        <button
                            onClick={onBack}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        // <div className="min-h-screen flex items-center justify-center p-4">
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">역대 우승자 기록</h2>
                    <p className="text-gray-600">지금까지의 모든 우승자들을 확인하세요</p>
                </div>

                {winnersHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎮</div>
                        <p className="text-gray-600 text-lg">아직 기록된 우승자가 없습니다.</p>
                        <p className="text-gray-500 mt-2">첫 번째 경주를 시작해보세요!</p>
                    </div>
                ) : (
                    <div className="space-y-4 mb-8 max-h-[500px] overflow-y-auto">
                        {winnersHistory.map((winners, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-5 hover:shadow-lg transition duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        #{winnersHistory.length - index}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-1">우승자</p>
                                        <div className="flex flex-wrap gap-2">
                                            {winners.map((winner, winnerIndex) => (
                                                <span
                                                    key={winnerIndex}
                                                    className="bg-white px-4 py-2 rounded-full text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 shadow-md border-2 border-yellow-300"
                                                >
                          👑 {winner}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={onBack}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
                    >
                        🔙 돌아가기
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>총 {winnersHistory.length}회의 경주 기록</p>
                </div>
            </div>
        </div>
    );
};

export default ItemModeWinnersHistoryScreen;
