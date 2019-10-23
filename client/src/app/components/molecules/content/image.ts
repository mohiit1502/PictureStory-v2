export class Image {
    imageTitle: string;
    imageUrl: string;
    imageDescription: string;

    constructor(imageTitle, imageUrl, imageDescription) {
        this.imageTitle = imageTitle;
        this.imageUrl = imageUrl;
        this.imageDescription = imageDescription;
    }
}