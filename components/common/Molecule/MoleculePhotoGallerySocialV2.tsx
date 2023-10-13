import { useState } from "react";
import _ from "lodash";
import PhotoAlbum, { RenderPhoto } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculePhotoGallerySocialV2({
  item,
  type = "normal",
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item?: any;
  type?: "normal" | "social";
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  if (_.isEmpty(item)) return null;

  const optionConfig = [
    {
      aspect: [{ width: 2, height: 1 }],
      photoAlbumProps: {
        layout: "rows",
        rowConstraints: { minPhotos: 1, maxPhotos: 1 },
      },
    }, // 1 зурагтай
    {
      aspect: [
        { width: 1, height: 1 }, // 2 зурагтай
        { width: 1, height: 1 },
      ],
      photoAlbumProps: {
        layout: "rows",
        rowConstraints: { minPhotos: 1, maxPhotos: 2 },
      },
    },
    {
      aspect: [
        { width: 1, height: 2 }, // 3 зурагтай
        { width: 1, height: 1 },
        { width: 1, height: 1 },
      ],
      photoAlbumProps: {
        layout: "columns",
        columns: "2",
        // rowConstraints: { minPhotos: 1, maxPhotos: 1 },
      },
    },
    {
      aspect: [
        { width: 1, height: 1 }, // 4 зурагтай
        { width: 1, height: 1 },
        { width: 1, height: 1 },
        { width: 1, height: 1 },
      ],
      photoAlbumProps: {
        layout: "rows",
        rowConstraints: { minPhotos: 2, maxPhotos: 2 },
      },
    },
    {
      aspect: [
        { width: 2, height: 1 }, // 5 зурагтай
        { width: 2, height: 1 },
        { width: 1, height: 1 },
        { width: 1, height: 1 },
        { width: 1, height: 1 },
      ],
      photoAlbumProps: {
        layout: "rows",
        rowConstraints: { minPhotos: 2, maxPhotos: 3 },
      },
    },
  ];

  const myOptionConfig = optionConfig[_.size(item) - 1] || optionConfig[4];

  const [slideIndex, setSlideIndex] = useState(-1);

  const photos = item.map((obj: any, index: number) => {
    return {
      src: obj?.filepath,
      // width: _.random(1, 3),
      // height: _.random(1, 3),
      width: myOptionConfig?.aspect[index]?.width || 1,
      height: myOptionConfig?.aspect[index]?.height || 1,
    };
  });

  const renderPhoto: RenderPhoto = ({
    layout,
    layoutOptions,
    imageProps: { alt, style, src, className, ...restImageProps },
  }) => {
    // console.log("🚀 ~ restImageProps", restImageProps);
    // console.log("🚀 ~ layout", layout);
    return (
      <RenderAtom
        item={{ value: src }}
        renderType="image"
        customClassName={`object-cover w-full cursor-pointer rounded-lg ${className}`}
        customStyle={style}
        onClick={() => {
          // console.log("Энд даржээ", layout);
          setSlideIndex(layout?.index);
        }}
      />
    );
  };

  const slides = photos.map(
    ({ src, width, height, images }: any, index: number) => ({
      src,
      width,
      height,
      srcSet: (images || []).map((image: any) => ({
        src: image.src,
        width: image.width,
        height: image.height,
      })),
    })
  );

  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculePhotoGallerySocialV2Outer`}
    >
      <PhotoAlbum
        layout="rows"
        photos={_.size(photos) <= 5 ? photos : _.slice(photos, 0, 5)}
        targetRowHeight={100}
        rowConstraints={{ minPhotos: 1, maxPhotos: 3 }}
        // columns={3}
        renderPhoto={renderPhoto}
        spacing={7}
        {...myOptionConfig?.photoAlbumProps}
      />

      <Lightbox
        slides={slides}
        open={slideIndex >= 0}
        index={slideIndex}
        close={() => setSlideIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        render={{
          slide: (slide: any) => {
            // console.log("SSSS slide", slide);
            return (
              <RenderAtom item={{ value: slide?.src }} renderType="image" />
            );
          },

          thumbnail: (thumbnail: any) => {
            // console.log("thumbnailthumbnail", thumbnail);
            return (
              <RenderAtom
                item={{ value: thumbnail?.slide?.src }}
                renderType="image"
              />
            );
          },
        }}
        thumbnails={{
          position: "bottom",
          imageFit: "cover",
          width: 50,
          height: 50,
          vignette: true,
          // border?: number;
          // borderRadius?: number;
          // padding?: number;
          // gap?: number;
        }}
        carousel={{
          finite: true,
        }}
      />
    </BlockDiv>
  );
}
