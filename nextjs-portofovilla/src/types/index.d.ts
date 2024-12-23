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
  galleryUrl: string;
  galleryImage: Array<{
    attractionTitle: string;
    attractionURL: string;
    galleryImage: {
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

