export interface Task {
  title: string;
  description: string;
  link: string;
  initiatedAt: Date | undefined;
  endedAt: Date | undefined;
}

export interface TitleInput {
  name: keyof Task;
  placeholder: string;
}

export interface AdditionalInput {
  name: keyof Task;
  placeholder: string;
  hasBorder: boolean;
}
