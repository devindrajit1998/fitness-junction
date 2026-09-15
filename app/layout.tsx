import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'THE FITNESS JUNCTION | Premium Gym & Fitness Centre in Barasat',
  description: 'Join THE FITNESS JUNCTION in Barasat for Gym, CrossFit, Yoga, and Personal Training. Top-rated fitness centre (4.8⭐) located at Arabindrapally, Helabattala.',
  openGraph: {
    title: 'THE FITNESS JUNCTION - Gym & CrossFit in Barasat',
    description: 'Train Hard. Move Better. Become Stronger. Premium unisex fitness centre offering expert personal training and top-tier equipment in Barasat, West Bengal.',
    type: 'website',
    siteName: 'THE FITNESS JUNCTION',
    images: ['/images/hero-bg.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE FITNESS JUNCTION | Premium Gym in Barasat',
    description: 'Build muscle, lose fat, and improve strength at THE FITNESS JUNCTION. Rated 4.8/5 on Google & Justdial.',
    images: ['/images/hero-bg.jpg'],
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthClub',
              name: 'THE FITNESS JUNCTION',
              image: '/images/hero-bg.jpg',
              telephone: '+91 82408 55067',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Monorama Ultrascan Pvt. Ltd., C.B. Road, beside Monorama Ultrascan, Lalpur',
                addressLocality: 'Barasat',
                addressRegion: 'West Bengal',
                postalCode: '741222',
                addressCountry: 'IN',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: '90',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '06:00',
                  closes: '22:00',
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-[#FFFFFF] font-['Rubik',sans-serif] selection:bg-[#6EFF8F] selection:text-[#050505] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
