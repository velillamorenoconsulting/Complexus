// @flow
import Link from "next/link";
import Image from "next/image";

type Props = {
  style: "dark" | "light";
};
export default function SocialMedia({ style }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-row gap-2 justify-center">
        <Link
          href="https://www.youtube.com/@corporacioncomplexus5557"
          target="_blank"
        >
          <Image
            src={`/icons/social/${
              style === "dark" ? "youtube_dark.svg" : "youtube.svg"
            }`}
            alt="youtube"
            width={50}
            height={50}
            className="w-10 opacity-70 hover:cursor-pointer"
          />
        </Link>
        <Link
          href="https://www.facebook.com/corporacioncomplexus"
          target="_blank"
          className="flex items-center"
        >
          <Image
            src={`/icons/social/${
              style === "dark" ? "facebookw.svg" : "facebookb.svg"
            }`}
            alt="facebook"
            width={50}
            height={50}
            className="w-7 opacity-70"
          />
        </Link>
        <Image
          src={`/icons/social/${
            style === "dark" ? "linkedinw.svg" : "linkedinb.svg"
          }`}
          alt="linkedin"
          width={50}
          height={50}
          className="w-7 opacity-70"
        />
        <Link
          href="https://twitter.com/corpocomplexus"
          target="_blank"
          className="flex items-center"
        >
          <Image
            src={`/icons/social/${style === "dark" ? "xw.svg" : "xb.svg"}`}
            alt="x"
            width={50}
            height={50}
            className="w-8 opacity-70"
          />
        </Link>
      </div>
    </div>
  );
}
