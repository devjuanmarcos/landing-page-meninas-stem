import { NewsType } from "@/@types/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formateDate";

interface NewsCardProps extends NewsType {
  extraClassName?: string;
}

export const NewsCard = ({ extraClassName, ...props }: NewsCardProps) => {
  return (
    <div
      className={`flex flex-col gap-2 text-start justify-between border-b border-var-cinza-150 w-full ${extraClassName}`}
    >
      <div className="flex flex-col gap-2 text-start">
        <div className="flex gap-[.625rem] items-center">
          <span className="paragraph-1 p-1 rounded-[.25rem] border border-primary w-max">{props.categoryLabel}</span>
          <span className="max-md:hidden">- {formatDate(props.created_at)}</span>
        </div>
        {props.images && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${props.images[0]}`}
            alt={props.title}
            sizes="400px"
            width={400}
            height={235}
            className="w-full h-[14.6875rem] object-cover object-left rounded-lg"
          />
        )}

        <h2 className="title-card-medium">{props.title}</h2>
        <p className="paragraph-banner">{props.summary}</p>
      </div>

      <Link href={`/noticias/${props.id}`} className="cta text-primary mb-4">
        Continuar lendo
      </Link>
    </div>
  );
};
