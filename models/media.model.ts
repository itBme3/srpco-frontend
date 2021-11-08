/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export interface Media {
      id: number;
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: MediaFormats;
      hash: string;
      ext: MediaEXT;
      mime: MIME;
      size: number;
      url: string;
      previewUrl: null;
      provider: string;
      provider_metadata: null;
      created_at: string;
      updated_at: string;
}

export type EntryMedia = Media | number | null;

export interface MediaFormats {
      thumbnail: MediaFormat;
      medium?: MediaFormat;
      small: MediaFormat;
      large?: MediaFormat;
}

export enum MediaEXT {
      JPEG = '.jpeg',
      Jpg = '.jpg',
      PNG = '.png',
}

export enum MIME {
      ImageJPEG = 'image/jpeg',
      ImagePNG = 'image/png',
}

export interface MediaFormat {
      name: string;
      hash: string;
      ext: MediaEXT;
      mime: MIME;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
}
