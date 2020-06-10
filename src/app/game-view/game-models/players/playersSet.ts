export class PlayersSet{
    player1: string;
    player2: string;
    player3: string;
    player4: string;
    you: number;

    getMyLogin(): string{
        if (this.you == 1){
            return this.player1;
        } else if (this.you == 2){
            return this.player2;
        } else if (this.you == 3){
            return this.player3;
        } else if (this.you == 4){
            return this.player4;
        } else return "UNKNOWN PLAYER";
    }
}