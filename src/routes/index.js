import Login from "../Pages/Login";
import Index from '../Pages/admin/dashboard/Index.jsx'
import List from '../Pages/admin/products/List.jsx'
import Edit from '../Pages/admin/products/Edit.jsx'
import  NotFound from '../Pages/NotFound.jsx'
import  Notices from '../Pages/admin/notice/Notice.jsx'
import { CoffeeOutlined,AreaChartOutlined} from '@ant-design/icons';
import App from "../App";
export const mainRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    }
]
export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: Index,
        isShow: true,
        title: 'dashboard',
        icon:<AreaChartOutlined />
    },
    {
        path: '/admin/products', //当访问admin/products时默认展示此页
        component: List,
        exact:true, //精确匹配
        isShow: true,
        title: 'commodity management',
        icon: <CoffeeOutlined />
    },
    {
        path: '/admin/products/edit/:id',
        component: Edit,
        isShow: false
    },
    {
        path: '/admin/notices',
        component: Notices,
        // exact:true,
        isShow: false
    }
]