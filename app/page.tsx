import Image from "next/image";
import Header from "./header";
import { ReactElement } from "react";
import shoppingPic from "@/public/shopping.svg";
import cameraPic from "@/public/camera.svg";

function InfoItem({
  img,
  alt,
  title,
  children,
}: {
  img: string;
  alt: string;
  title: string;
  children: string;
}) {
  return (
    <div className="border-black border-[2px] p-4 rounded-xl flex gap-5 flex-col content-evenly">
      <div className="flex items-center bg-[#0c2340] rounded-lg p-2 max-w-10">
        <Image
          src={img}
          alt={alt}
          width={50}
          height={50}
          style={{
            filter:
              "invert(99%) sepia(31%) saturate(230%) hue-rotate(245deg) brightness(112%) contrast(100%)",
          }}
        />
      </div>
      <h1 className="text-sm lg:text-xl">{title}</h1>
      <p className="text-xs text-gray-500">{children}</p>
    </div>
  );
}

function InfoBox() {
  const elements: ReactElement[] = [];

  for (let i = 0; i < 6; i++) {
    elements.push(
      <InfoItem
        img={cameraPic}
        alt="An image of a camera."
        title="Placeholder Text"
        key={`element-${i}`}
      >
        For now this is placeholder. More will be adding to this as the team
        implements more site features.
      </InfoItem>,
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 w-4/5 h-4/6 grid-cols-1">
      {elements}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="bg-utsablue w-[100%] max-w-[100%] box-border h-[100%] py-16">
        <div className="grid md:grid-cols-2 gap-8 w-[100%] items-center justify-center h-[100%]">
          <div className="max-w-[70%] flex gap-3 lg:gap-8 flex-col justify-self-center">
            <h1 className="text-zinc-50 lg:text-4xl text-2xl text-center md:text-left">
              A Campus Hub For Your Personal Needs.
            </h1>
            <h2 className="md:text-left text-center text-md text-zinc-500 font-bold">
              From old furniture to used gaming systems, buy and sell goods with
              other UTSA students.
            </h2>
          </div>
          <div>
            <Image
              className="h-auto w-auto"
              src={shoppingPic}
              alt="People shopping"
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
      <div className="h-[100%] flex flex-col bg-[#f9f9f9] items-center justify-evenly py-16 gap-16">
        <div className="flex flex-col items-center lg:max-w-[50%] max-w-[80%] gap-2 text-center">
          <h3 className="text-xl text-gray-500">Features</h3>
          <h1 className="text-gray-950 lg:text-3xl text-2xl">
            Support The Local UTSA Economy.
          </h1>
          <h2>
            There are countless ways to buy and sell items that makes supporting
            the local campus ecosystem a breeze.
          </h2>
        </div>
        <InfoBox></InfoBox>
      </div>
    </>
  );
}
