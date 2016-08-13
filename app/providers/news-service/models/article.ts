export class Article {
    aid: number; 
    label: string;
    title: string;
    author: string;
    date: string;
    body: Array<{ subTitle: string, content: any }>;
    footer: Array<{subTitle: string, content: any}>;
}