declare type ModalPromo = {
  title: string;
  subtitle: string;
  imageModal: {
    asset: {
      _ref: string;
      _type: string;
      url: string; // Ensure this matches your Sanity response
    };
  };
  details: Array<{
    detailTitle: string;
    detailDescription: string;
  }>;
  slug: {
    _type: "slug";
    current: string;
  };
};

declare type Gallery = {
  title: string;
  subtitle: string;
  galleryButton: string;
  galleryButtonUrl: string;
  galleryImages: Array<{
    title: string;
    mapUrl: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
  }>;
  slug: {
    _type: "slug";
    current: string;
  };
};

// button CTA component
interface ButtonProps {
  link: string;
  text: string;
  type: 'green' | 'white';
  iconType?: string; // Optional icon
  radius: 'full' | 'lg';
  width: 'full' | 'fit';
  displayMobile: boolean;
  displayDesktop: boolean;
}

// accordion component
interface AccordionRowProps {
  question: string;
  answer: string;
}

// booking section component
interface BookingSectionProps {
  price: string;
  cancellationPolicy: {
    freeCancellationText: string;
    cancellationDeadline: string;
  };
  guestsOptions: number[];
  nightsOptions: number[];
  totalPrice: string;
  limitedOfferText: string;
  bookingMethods: { platform: string; link: string }[];
}

// splide component
interface SplideComponentProps {
  data: any[]; // Expect galleryImage data
  autoScrollSpeed?: number; // Speed for auto-scroll
  reverse?: boolean; // Reverse scrolling direction
}

// modal component
declare type ModalPromo = {
  title: string;
  subtitle: string;
  imageModal: {
    asset: {
      _ref: string;
      _type: string;
      url: string; // Ensuring `url` is included
    };
  };
  details: Array<{
    detailTitle: string;
    detailDescription: string;
  }>;
  slug: {
    _type: 'slug';
    current: string;
  };
};

// room detail slider
interface RoomImageProps {
  image: any; // Main image for the room
  gallery: any[]; // List of other images for the room
}

// activities component
interface Activities {
  activitiesTitle: string;
  galleryImage: any;
  activitiesRange: string;
}

