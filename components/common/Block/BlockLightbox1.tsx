import _ from "lodash";
import React, { ReactElement } from "react";
import { useCounter, useToggle } from "react-use";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Plugin as YARLPlugin } from "yet-another-react-lightbox";
import { processCloudinaryImage } from "../engineBox/@/util/imageHelper";
import RenderAtom from "../Atom/RenderAtom";

export default function BlockLightbox1({
  title,
  isThumb = true,
  children = <></>,
}: {
  title?: string;
  isThumb?: boolean;
  children?: any;
}) {
  const myImageList = extractImgElements(children);
  const [isOpen, setIsOpen] = useToggle(false);
  const [current, { set: setNumber }] = useCounter(0);

  // console.log("🚀 ~ imgElements:", myImageList);

  //cloudinary зураг байвал w-250 болгож багасгана.
  const mySlideList: Array<any> = _.map(myImageList, (item) => {
    const originalSrc = item?.props?.item?.value || item?.props?.item;

    // const imgSrc250 = processCloudinaryImage(
    //   originalSrc,
    //   "fl_progressive,w_250" //w_200,h_150,c_scale гэх мэтээр өгч болно.
    // );

    return {
      src: originalSrc,
      title: title,
    };
  });

  const mappedChildren: any = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const myClassName = `cursor-zoom-in transform transition hover:scale-[1.01] overflow-hidden ${
        (child as ReactElement<any>).props.customClassName
      } ${(child as ReactElement<any>).props.class} ${
        (child as ReactElement<any>).props.className
      }`;

      return React.cloneElement(child as ReactElement<any>, {
        onClick: () => {
          //Энд custom үйлдлээ нэмж өгнө.
          // console.log("Child clicked! index", index);
          setIsOpen(true);
          setNumber(index);

          //Өөрт нь onClick хэрвээ байвал түүнийг нэмж өгнө.
          if (
            typeof (child as ReactElement<any>).props.onClick === "function"
          ) {
            (child as ReactElement<any>).props.onClick();
          }
        },
        className: myClassName,
        customClassName: undefined,
        class: undefined,
      });
    }
    return child;
  });
  // console.log(
  //   "🚀 ~ constmappedChildren:any=React.Children.map ~ mappedChildren:",
  //   mappedChildren
  // );

  const plugins: YARLPlugin[] = [
    Captions,
    Fullscreen,
    (isThumb && Thumbnails) as YARLPlugin,
    Zoom,
  ].filter(Boolean);

  return (
    <>
      {mappedChildren}

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={current}
        slides={mySlideList}
        carousel={{
          finite: false,
        }}
        animation={{ fade: 250, swipe: 500 }}
        render={{
          thumbnail: ({ slide, rect, render, imageFit }) => {
            // console.log("SSSSSSSS", { slide, rect, render, imageFit });
            return (
              <RenderAtom
                item={slide.src}
                renderType="image"
                customProps={{
                  cloudinaryParam: "w_250",
                }}
              />
            );
          },
        }}
        on={{
          view: (index) => console.log("View", index),
          entering: () => console.log("Entering"),
          entered: () => console.log("Entered"),
          exiting: () => console.log("Exiting"),
          exited: () => console.log("Exited"),
        }}
        plugins={plugins}
      />
    </>
  );
}

const extractImgElements = (children: any) => {
  if (!children) {
    return null;
  }
  // Бүх хүүхдээр гүйгээд renderType="image" гэснүүдийг ялгаж өгнө.
  return React.Children.map(children, (child: any) => {
    // console.log("DDDDDDDSS", child);

    if (child.type === "img" || child?.props?.renderType === "image") {
      return React.cloneElement(child);
    }

    if (child?.props?.children) {
      const nestedImgElements: any = extractImgElements(child?.props?.children);
      return nestedImgElements;
    }

    return null;
  });
};
