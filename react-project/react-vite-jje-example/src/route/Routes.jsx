import BoardPage from '../pages/BoardPage'
import HelloPage from '../pages/HelloPage'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import JSXPage from '../pages/JSXPage'
import ConditionalPage from '../pages/ConditionalPage'
import BootStrapPage from '../pages/BootStrapPage'
import PropsPage from '../pages/PropsPage'
import CounterPage from '../pages/CounterPage'
import UseEffectPage from '../pages/UseEffectPage'
import UseRef1Page from '../pages/UseRef1Page'
import UseRef2Page from '../pages/UseRef2Page'
import AxioGetPage from '../pages/AxiosGetPage'
import AxiosPostPage from '../pages/AxiosGetPage'
import AxiosClient from '../pages/AxiosClient'

const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    title: 'Profile',
  },
  {
    path: '/board',
    element: <BoardPage />,
    title: 'Board',
  },
  {
    path: '/hello',
    element: <HelloPage />,
    title: 'Hello',
  },
  {
    path: '/jsx',
    element: <JSXPage />,
    title: 'jsx문법',
  },
  {
    path: '/conditional',
    element: <ConditionalPage />,
    title: '조건부랜더링',
  },
  {
    path: '/bootstrap',
    element: <BootStrapPage />,
    title: '부트스트랩적용',
  },
  {
    path: '/props',
    element: <PropsPage />,
    title: '프롭스',
  },
  {
    path: '/usestate',
    element: <CounterPage />,
    title: 'useState-연습',
  },
  {
    path: '/useeffect',
    element: <UseEffectPage />,
    title: 'useEffect-연습',
  },
  {
    path: '/useRef1',
    element: <UseRef1Page />,
    title: 'useRef-1',
  },
  {
    path: '/useRef2',
    element: <UseRef2Page />,
    title: 'useRef-2',
  },
  {
    path: '/axiosget',
    element: <AxiosPostPage />,
    title: 'axios-get',
  },
  {
    path: '/axiosclient',
    element: <AxiosClient />,
    title: 'axios-client',
  },
];

export default routes
