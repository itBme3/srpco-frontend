/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */

import { EntryBlock } from './blocks.model'
import { EntryMedia } from './media.model'

export enum ResourceType {
      ARTICLE = 'article',
      VIDEO = 'video',
      INFO_GRAPHIC = 'info_graphic',
}

export enum EntryType {
      GASKET = 'gasket',
      APPLICATION = 'application',
      MATERIAL = 'material',
      SUPPLIER = 'supplier',
      RESOURCE = 'resource',
      TAG = 'tag',
      SERVICE = 'service',
      DATASHEET = 'datasheet',
      SOLUTION = 'solution',
      PAGE = 'page',
}

export enum CollectionType {
      GASKETS = 'gaskets',
      APPLICATIONS = 'applications',
      MATERIALS = 'materials',
      SUPPLIERS = 'suppliers',
      RESOURCES = 'resources',
      SERVICES = 'services',
      DATASHEETS = 'datasheets',
      SOLUTIONS = 'solutions',
      PAGES = 'pages',
}

export const entryTypes = Object.values(EntryType);
export const collectionTypes = Object.values(CollectionType);

export enum StrapiCollectionType {
      USERS = 'users',
      WRITERS = 'writers',
      TAGS = 'tags',
      GASKETS = 'gaskets',
      APPLICATIONS = 'applications',
      MATERIALS = 'materials',
      SUPPLIERS = 'suppliers',
      RESOURCES = 'resources',
      SERVICES = 'services',
      DATASHEETS = 'datasheets',
      SOLUTIONS = 'solutions',
}

export interface EntrySEO {
      id?: number;
      title?: string;
      description?: string | null;
      image?: EntryMedia | null;
}

export interface EntryTag {
      id?: number;
      title?: string;
      slug?: string;
      publishedAt?: string;
      created_at?: string;
      updated_at?: string;
}

export interface EntryItem {
      id?: number | string;
      slug?: string;
      title?: string;
      created_at?: string;
      updated_at?: string;
      publishedAt?: string | null;
      type?: EntryType;
      collectionType?: CollectionType;
      name?: string;
      description?: string | null;
      content?: string | null;
      order?: number;
      seo?: EntrySEO | null;
      blocks?: EntryBlock[];
      media?: EntryMedia | null;
      file?: EntryMedia | null;
      tags?: EntryTag[];
      suppliers?: EntryItem[];
      materials?: EntryItem[];
      applications?: EntryItem[];
      datasheets?: EntryItem[];
}
