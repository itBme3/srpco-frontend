/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */

import { ResourceType } from './entry.model'
import { EntryMedia } from './media.model'

export interface EntryBlock {
      __component: string;
      id?: number;
      title?: null | string;
      blockSettings?: Settings;
      gaskets?: EntryOnBlock[];
      materials?: EntryOnBlock[];
      datasheets?: EntryOnBlock[];
      resources?: EntryOnBlock[];
      content?: string | null;
      spacing?: number;
      cardStyle?: CardStyle;
      text?: string;
      media?: EntryMedia;
      groupStyle?: string;
      block?: ContentBlock[];
}

export interface EntryOnBlock {
      id: number;
      title: string;
      slug: string;
      description: string;
      content: string;
      type: string;
      collectionType: string;
      created_at: string;
      updated_at: string;
      file?: EntryMedia;
      publishedAt?: string | null;
      resourceType?: ResourceType;
      youtube?: null;
      featured?: boolean | null;
      order?: null;
}

export interface ContentBlock {
      id: number;
      title?: string;
      gaskets?: EntryOnBlock[];
      applications?: EntryOnBlock[];
      materials?: EntryOnBlock[];
      resources?: EntryOnBlock[];
      suppliers?: EntryOnBlock[];
      content?: string | null;
}

export enum CardStyle {
      OVERLAY = 'overlay',
      MEDIA_ABOVE = 'mediaAbove',
      MEDIA_LEFT = 'mediaLeft',
      MEDIA_RIGHT = 'mediaRight',
}

export interface Settings {
      id: number;
      placement: string;
      style: string;
      showTitle: boolean;
      classes: null;
      grouped: boolean;
      groupStyle: string;
}
