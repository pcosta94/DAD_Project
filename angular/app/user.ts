export class User {
  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public totalVictories: number,
    public totalScore: number,
    public token: string,
    public password?: string, //optional field
    public cpassword?: string, //optional field
    public avatar?: string //optional field
  ) {  }
}