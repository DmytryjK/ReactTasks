import {lazy, Suspense} from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader"
import {Page404} from '../pages';
import Spinner from '../spinner/Spinner';

const ComicsPageLazy = lazy(() => import ('../pages/ComicsPage'));
const MainPageLazy = lazy(() => import ('../pages/MainPage'));
const SingleComicPageLAzy = lazy(() => import ('../pages/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPageLazy/>} />
                            <Route path="/comics/*" element={<ComicsPageLazy/>} />
                            <Route path="/comics/:comicId" element={<SingleComicPageLAzy/>}/>
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
