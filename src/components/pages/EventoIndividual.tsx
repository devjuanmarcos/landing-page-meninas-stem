"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { processParagraph } from "@/utils/processParagraph";
import { rectangle } from "@/utils/retangle";
import { useParams } from "next/navigation";
import { getEventById } from "@/app/actions/eventsActions";
import { EventType } from "@/@types/types";
import { formatDateWithHours } from "@/utils/formateDate";
import { formatEventMode } from "@/utils/formatEventMode";

export const EventoIndividual = () => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [noticia, setNoticia] = React.useState<EventType | undefined>(undefined);
  const params = useParams();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    async function fetch() {
      try {
        const res = await getEventById(params.eventId as string);
        setNoticia(res.event);
      } catch (error) {
        console.log(error);
      } finally {
        setIsMounted(true);
      }
    }
    fetch();
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[80vh] flex justify-center">
        <Loader2 className={cn("h-12 w-12  m-auto animate-spin")} />
      </div>
    );
  }

  if (noticia) {
    return (
      <React.Fragment>
        <div
          className={`bg-cover bg-center bg-no-repeat bg-primary h-[24rem] mt-32 `}
          style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(rectangle(`#e000b0`))}")` }}
        >
          <div className="py-7 container w-full mx-auto lg:px-24 px-10">
            <span className="title-card text-white">{formatEventMode(noticia.mode)}</span>
            <div className="flex flex-wrap sm:gap-4">
              <span className="title-card text-white">{formatDateWithHours(noticia.start_date)}</span>
              <span className="hidden sm:flex title-card text-white">-</span>
              <span className="title-card text-white">{formatDateWithHours(noticia.end_date)}</span>
            </div>
          </div>
        </div>

        <div className="container bg-[rgb(var(--var-background-principal))] mx-auto lg:px-24 md:px-10 px-4 pb-9  mt-[-16rem] sm:mt-[-18rem] rounded-lg">
          <div className="md:pt-6 pt-4 ">
            <div className="mt-4 mb-6">
              <div className="flex flex-col text-start">
                <h2 className="h2-semibold">{noticia.title}</h2>
                <p className="mt-2 paragraph-banner indent-4">{noticia.summary}</p>
              </div>
            </div>
            <div className="flex justify-center sm:justify-between flex-col sm:flex-row gap-2">
              {/* <span>{noticia.data ? `${formatDate(noticia.data as any)}` : ""}</span> */}
              <Link
                aria-label="Compartilhar a notícia no facebook"
                href={`https://www.facebook.com/sharer.php?u=https://meninastem.com.br/pt/noticias/${noticia.id}`}
                target="_blank"
                className=" cursor-pointer flex sm:justify-between items-center gap-2"
              >
                <p>Compartilhar:</p>
                <Image
                  src={"/noticias/facebook_compartilhar.svg"}
                  width={39}
                  height={39}
                  alt="Ícone do Facebook para compartilhar a matéria"
                  className="w-[39px] h-full"
                />
              </Link>
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${noticia.images[0]}`}
              width={1920}
              height={1080}
              sizes="100vw"
              quality={100}
              alt={noticia.title}
              className="w-full object-cover h-full max-h-[36.25rem] my-9 rounded-lg"
            />

            {noticia.paragraphs?.map((paragrafo: string) => (
              <div key={paragrafo} className="flex flex-col gap-5 mt-4">
                <p className="paragraph-banner text-justify">{processParagraph(paragrafo)}</p>
              </div>
            ))}
            {noticia.sources[0] && (
              <div className="mt-4">
                <Link
                  aria-label="Link referente à notícia"
                  href={noticia.sources[0]}
                  className="paragraph-banner text-[#8ab4f8] text-justify underline "
                >
                  {noticia.sources[0]}
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <MoreNewsSection moreNews={moreNews} /> */}
      </React.Fragment>
    );
  }
};
