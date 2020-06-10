export class PostponedEvent{
    finishingTime: number;

    compareWith(other: PostponedEvent){
        return this.finishingTime - other.finishingTime;
    }

}