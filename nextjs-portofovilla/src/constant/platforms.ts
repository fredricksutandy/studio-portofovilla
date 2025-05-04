// lib/constants/platformData.ts
import WaLogo from '../../public/colored-ico/WhatsApp-logo.svg';
import airbnbLogo from '../../public/colored-ico/Airbnb-Logo.wine.svg';
import tiketComLogo from '../../public/colored-ico/Tiket.com_logo.svg';
import bookingComLogo from '../../public/colored-ico/Booking.com-Logo.wine.svg';
import agodaLogo from '../../public/colored-ico/Agoda_transparent_logo.svg';
import tripComLogo from '../../public/colored-ico/Trip.com_logo.svg.svg';
import travelokaLogo from '../../public/colored-ico/traveloka-logo-brandlogo.net.svg';
import googleLogo from '../../public/colored-ico/devicon_google.svg';

export const platformData: Record<string, {
  logo: string;
  bgColor: string;
  textColor: string;
  border?: string;
}> = {
  Whatsapp: {
    logo: WaLogo,
    bgColor: 'white',
    textColor: '#25d366',
  },
  Airbnb: {
    logo: airbnbLogo,
    bgColor: 'white',
    textColor: '#ff5A60',
  },
  'Tiket.com': {
    logo: tiketComLogo,
    bgColor: 'white',
    textColor: '#0064D3',
  },
  'Booking.com': {
    logo: bookingComLogo,
    bgColor: 'white',
    textColor: '#003580',
  },
  Agoda: {
    logo: agodaLogo,
    bgColor: 'white',
    textColor: 'black',
  },
  'Trip.com': {
    logo: tripComLogo,
    bgColor: 'white',
    textColor: 'black',
  },
  Traveloka: {
    logo: travelokaLogo,
    bgColor: 'white',
    textColor: '#0A9AF2',
  },
  Google: {
    logo: googleLogo,
    bgColor: 'white',
    textColor: 'black',
  },
};
