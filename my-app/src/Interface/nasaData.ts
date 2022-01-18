export interface IData {
  center: string;
  date_created: Date;
  description: string;
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
  title: string;
}
export interface ILink {
  href: string;
  rel: string;
  render: string;
}

export interface IItemElements {
  data: IData[];
  href: string;
  links?: ILink[];
}
export interface ICollection {
  items: IItemElements[];
}
export interface INasaData {
  collection: ICollection;
}
