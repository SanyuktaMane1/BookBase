// import { useLocation } from "react-router-dom";
// import Navbar from "./NavBar";

// export default function Layout({ children }) {
//   const location = useLocation();
//   const isDetailPage = location.pathname.startsWith("/books/");

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       <Navbar isDetailPage={isDetailPage} />
//       <div className="container mx-auto px-4 py-8">{children}</div>
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";

export default function Layout({ children }) {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/books/");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar isDetailPage={isDetailPage} />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
