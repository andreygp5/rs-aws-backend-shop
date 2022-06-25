import { EntityMetadata } from '../model/entity-metadata.model'

export interface Product {
  id: string;

  title: string;
  description?: string;

  price: number;
  count: number;

  metadata: EntityMetadata
}
