export type OnlinePaymentResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string;
    page_banner_title: string;
    page_banner_caption: string;
    page_banner_desktop: string;
    page_banner_mobile: string;
    page_title: string;
    page_caption: string;
    payment_heading: string;
  };
};

export const bannerData = {
    title: "Online Payment",
    description: "Your investment is protected with advanced security standards and reliable support. Take the next step toward owning your future with confidence.",
    image: "/images/pay-now/banner.jpg",
}