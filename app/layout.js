import './globals.css'
import { AuthProvider, ReduxProvider } from "../providers";


export default function RootLayout({ children }) {

  return (
      <html lang="en">
        <body className='bg-white'>
          <AuthProvider>
            <ReduxProvider>
                {children}
            </ReduxProvider>
          </AuthProvider>
        </body>
      </html>
  );
}
