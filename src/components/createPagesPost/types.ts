export interface CreatePagesPostProps {
    fieldName: string;
    fieldValue: string;
    onClose: () => void;
}

export interface PostData {
    message: string;
    link?: string;
    mediaFile?: File | null;
    mediaType: 'text' | 'photo' | 'video';
    fieldName: string;
    fieldValue: string;
}
