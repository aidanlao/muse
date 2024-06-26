import React from "react";
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
export default function ComposerImage({ url } : { url: string }) {
    return (
        <Image
            classNames={{
                wrapper: "h-full",
                img: "h-full w-full object-cover object-top",
            }}
          as={NextImage}
          width={300}
          height={500}
          src={url}
          alt="NextUI hero Image"
        />
      );
}