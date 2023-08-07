export enum ShowType { 
  comedy = "Standup Comedy", 
  dance = "Dance Show", 
  singing  = "Singing Show" 
} 


type SeatType = { 
  seat : string; 
  availability : number; 
  price : number; 
} 


export class Show { 
  name : string; 
  type : ShowType; 

  protected constructor(name:string, type: ShowType){ 
      this.name = name; 
      this.type = type; 
  } 

  book(){} 

  

} 



export class DanceShow extends Show { 
  seats: SeatType[]; 
  constructor(name: string){ 
      super(name,ShowType.dance) 
      this.seats = []; 
  } 

  addSeat(seat: SeatType){ 
      this.seats.push(seat) 
  } 

  bookShow(seat: string, money: number){ 
       
      for(let i=0;i<this.seats.length;i++){ 
          if (this.seats[i].seat === seat ){ 
              if(this.seats[i].availability >0 && money>= this.seats[i].price){ 
                  this.seats[i].availability-- 
              } 
          } 
           
      } 

  } 
} 


export class ComedyShow extends Show { 
  seats: number; 
  ticketPrice: number; 

  constructor(name:string, seats:number, ticketPrice:number){ 
      super(name,ShowType.comedy) 
      this.seats = seats; 
      this.ticketPrice = ticketPrice; 
  } 

  bookShow(money : number){ 
      if(this.seats > 0 && money >= this.ticketPrice){ 
          this.seats-- 
      } 
       
  } 
} 

export class SingingShow extends Show { 
  seats : SeatType[] 

  constructor(name:string, seats: SeatType[]){ 
      super(name,ShowType.singing) 
      this.seats= seats; 
  } 

  bookShow(seat: string, money: number){ 
       
      for(let i=0;i<this.seats.length;i++){ 
          if (this.seats[i].seat === seat ){ 
              if(this.seats[i].availability >0 && money>= this.seats[i].price){ 
                  this.seats[i].availability-- 
              } 
          } 
           
      } 

  } 
}