import { IconType } from "react-icons";
import TextsVariants from "../texts/TextsVariants";

type IconWithTextBannersProps = {
  icon: IconType;
  title: string;
  description: string;
};

export type ThreeIconWithTextBannersProps = {
  topTitle: string;
  title: string;
  iconCardOne: IconWithTextBannersProps;
  iconCardTwo: IconWithTextBannersProps;
  iconCardThree: IconWithTextBannersProps;
};

export const ThreeIconWithTextsBanner: React.FC<ThreeIconWithTextBannersProps> = ({
  title,
  topTitle,
  iconCardOne,
  iconCardTwo,
  iconCardThree,
}) => {
  const iconsCards = [iconCardOne, iconCardTwo, iconCardThree];
  return (
    <div className="flex flex-col gap-12 text-center justify-center items-center px-4 sm:px-20">
      <TextsVariants textCenter={true} text={topTitle} variant={"topTitle"} showLine={true} subtitle={title} />
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-center gap-8 max-w-screen-xl">
        {iconsCards.map((iconCard) => (
          <IconWithTextBanner key={iconCard.title} {...iconCard} />
        ))}
      </div>
    </div>
  );
};

const IconWithTextBanner: React.FC<IconWithTextBannersProps> = ({ description, icon, title }) => {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Icon className="text-white w-8 h-8" />
      <div className="flex flex-col">
        <TextsVariants textCenter={true} text={title} variant={"titleBold"} showLine={true} subtitle={title} />
        <TextsVariants textCenter={true} text={description} variant={"bannerParagraph"} />
      </div>
    </div>
  );
};
