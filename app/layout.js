import './globals.css'
import { AuthProvider, ReduxProvider } from "../providers";

export const metadata = {
  title: "Pokemon Battle",
  description: "Compete in Pokémon battles online with friends!",
  openGraph: {
    title: "Pokemon Battle",
    description: "Compete in Pokémon battles online with friends!",
    url: "https://pokemon-battle-fe-3i7e.vercel.app",
    siteName: "Pokemon Battle",
    images: [
      {
        url: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/001.png",
        width: 1200,
        height: 630,
        alt: "Compete in Pokémon battles online with friends!",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon Battle | Онлайн битви",
    description: "Compete in Pokémon battles online with friends!",
    images: ["https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/001.png"],
  },
};


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
