import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
//import Homepage from './homepage';
function Layout(_children: any) {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
    
  );
}
export default Layout;