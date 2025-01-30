import { IconType } from "react-icons";
import { ElementType } from "react";

type NextImageType = {
  imageUrl: string;
  imageDarkUrl?: string;
  altImage: string;
  extraClassName?: string;
  className?: string;
  ariaLabel: string;
  sizes: string;
  fill?: boolean;
  draggable?: boolean;
  priority?: boolean;
  blurDataURL?: string;
};

type IconProps = {
  Icon: IconType;
  url: string;
  size?: string;
  color?: string;
  alt: string;
};

type TitleDefaultType = {
  title: string;
  subtitle?: string;
  description?: string;
  extraClassName?: string;
  textColor: "text-cinza-800" | "text-branco-100";
};

type ItemCarouselType = {
  image: NextImageType;
  texts: TitleDefaultType;
};

type InnovationInMovieSectionType = {
  texts: TitleDefaultType;
  images: ItemCarouselType[];
  link: string;
};

type IconTextCardType = {
  title: string;
  description: string;
  icon: IconType | ElementType;
};

type MetaPagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

type Pagination<T> = {
  items?: T[];
  pagination: MetaPagination;
};

type NewsType = {
  id: string;
  title: string;
  paragraphs: string[];
  sources: string[];
  category: string;
  summary: string;
  images: string[];
  image_alt: string[];
  approved: boolean;
  archived: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  views: number;
  author_name: string;
  author_email: string;
  categoryLabel: string;
};

type SearchParamsType = {
  page: number;
  size: number;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
};

type GetState = {
  message: string;
  success: boolean;
  total?: number;
  items?: NewsType[];
};

export type {
  NextImageType,
  IconProps,
  TitleDefaultType,
  InnovationInMovieSectionType,
  ItemCarouselType,
  IconTextCardType,
  NewsType,
  SearchParamsType,
  GetState,
  Pagination,
  MetaPagination,
};
