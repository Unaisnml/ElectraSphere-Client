import {
  facebook,
  instagram,
  twitter,
  gitHub,
  Visa,
  MasterCard,
  PayPal,
  ApplePay,
  Gpay,
} from "../assets/icons";

export const navItems = [
  { name: "Shop", path: "/category" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Brands", path: "/brands" },
];

export const socialMedia = [
  { src: twitter, alt: "twitter logo" },
  { src: facebook, alt: "facebook logo" },
  { src: instagram, alt: "instagram logo" },
  { src: gitHub, alt: "github logo" },
];

export const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { name: "About", link: "/" },
      { name: "Features", link: "/" },
      { name: "Works", link: "/" },
      { name: "Career", link: "/" },
    ],
  },
  {
    title: "HELP",
    links: [
      { name: "Customer Support", link: "/" },
      { name: "Delivery Details", link: "/" },
      { name: "Terms & Conditions", link: "/" },
      { name: "Privacy policy", link: "/" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { name: "Account", link: "/account" },
      { name: "Manage deliveries", link: "/" },
      { name: "Orders", link: "/orders" },
      { name: "Payments", link: "/" },
    ],
  },
];

export const paymentMethods = [
  { src: Visa, alt: "visa logo" },
  { src: MasterCard, alt: "master logo" },
  { src: PayPal, alt: "paypal logo" },
  { src: ApplePay, alt: "apple logo" },
  { src: Gpay, alt: "gpay logo" },
];
