interface IEmailFromDetail {
  email: string;
  name: string;
}

export interface IEmailData {
  id: string;
  from: IEmailFromDetail;
  date: number;
  subject: string;
  short_description: string;
}

export interface IEmailBodyData {
  id: string;
  body: string;
}

export type SelectedFilterTypes = "Read" | "UnRead" | "Favorite";
