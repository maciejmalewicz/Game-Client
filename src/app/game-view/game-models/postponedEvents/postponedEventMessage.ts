export class PostponedEventMessage{
    finishingTime: number;
    label: string;

    compareWith(other: PostponedEventMessage){
        return this.finishingTime - other.finishingTime;
    }

}