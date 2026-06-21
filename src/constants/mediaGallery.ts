export type GalleryMediaItem = {
    id: string;
    title: string;
    caption?: string;
    src: string;
    type: 'image' | 'video';
    poster?: string;
    size?: 'default' | 'compact' | 'mobile';
};
