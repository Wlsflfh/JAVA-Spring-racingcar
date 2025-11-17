import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import ClassicModePage from './pages/ClassicModePage';
import ItemModePage from './pages/ItemModePage';

/**
 * 메인 App 컴포넌트 (React Router 적용)
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 홈 - 모드 선택 화면 */}
          <Route path="/" element={<ModeSelectionScreen />} />
          
          {/* 클래식 모드 라우트 */}
          <Route path="/classic/*" element={<ClassicModePage />} />
          
          {/* 아이템 모드 라우트 */}
          <Route path="/item/*" element={<ItemModePage />} />
          
          {/* 404 처리 - 홈으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

