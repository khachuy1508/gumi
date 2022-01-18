import { IListImage } from "../../Interface/listImageData";

export interface actionCard {
  onClickActionDelete?: (idImage?: any) => void;
  onClickActionFavorite?: (idImage?: any) => void;
}
export interface ImageCardInterface extends IListImage, actionCard {}
