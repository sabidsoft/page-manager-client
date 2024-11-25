export interface PostData {
    message: string;
    link?: string;
    mediaFile?: File | null;
    mediaType: 'text' | 'photo' | 'video';
}
